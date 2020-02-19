import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList } from '@angular/fire/database';
import { map, finalize } from 'rxjs/operators';
import {
  AngularFireUploadTask,
  AngularFireStorageReference,
  AngularFireStorage
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  forumList: AngularFireList<any>;
  commentList: AngularFireList<any>;
  tasks: AngularFireUploadTask;
  snapshot: Observable<any>;
  fileRef: AngularFireStorageReference;
  downUrl;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  getPostId() {
    return this.afs.createId();
  }

  createPost(
    key,
    postTitle,
    des,
    dateTime,
    postUserId,
    imageList,
    postUserName,
    postUserImage,
    showFarmers,
    showBuyers,
    isEnd,
    postState
  ) {
    return this.afs
      .collection('post')
      .doc(key)
      .set({
        title: postTitle,
        description: des,
        date: dateTime,
        userID: postUserId,
        images: imageList,
        userName: postUserName,
        userImage: postUserImage,
        showFarmer: showFarmers,
        showBuyer: showBuyers,
        endThread: isEnd,
        isAdminNote: postState,
      });
  }

  createComment(
    comm,
    dateTime,
    postId,
    commentUser,
    postUser,
    commentUserName,
    commentUserImage,
    isEnd,
    bestOrNot,
    votes,
    count
  ) {
    return this.afs.collection('comment').add({
      comment: comm,
      date: dateTime,
      postID: postId,
      commentUserID: commentUser,
      postUserID: postUser,
      userName: commentUserName,
      userImage: commentUserImage,
      endThread: isEnd,
      isBest: bestOrNot,
      voteList: votes,
      voteCount: count
    });
  }

  createReply(
    rpl,
    dateTime,
    commentId,
    postId,
    replyUserId,
    replyUserName,
    replyUserImage
  ) {
    return this.afs.collection('reply').add({
      reply: rpl,
      date: dateTime,
      commentID: commentId,
      postID: postId,
      userID: replyUserId,
      userName: replyUserName,
      userImage: replyUserImage
    });
  }

  changeReact(
    // change current reacts (react -> not react, not react -> react)
    current: boolean,
    userId,
    postId
  ) {
    if (current) {
      // if true (currently true)
      return this.afs
        .collection('react')
        .ref.where('userID', '==', userId)
        .where('postID', '==', postId)
        .get()
        .then(r => {
          return r.docs[0].ref.delete().then(_ => true);
        });
    } else {
      // if false (currently false)
      return this.afs
        .collection('react')
        .add({
          userID: userId,
          postID: postId
        })
        .then(_ => true);
    }
  }

  checkReact(userId, postId) {
    // check if user react or not
    return this.afs
      .collection('react', ref =>
        ref.where('userID', '==', userId).where('postID', '==', postId)
      )
      .get()
      .pipe(map(coll => coll.size));
  }

  countReacts(postId) {
    // get react count
    return this.afs
      .collection('react', ref => ref.where('postID', '==', postId))
      .get()
      .pipe(map(coll => coll.size));
  }

  markAsBest(current: boolean, key) {
    // mark as best (if alredy marked chahge to unmark)
    this.afs
      .collection('comment')
      .doc(key)
      .update({ isBest: !current });
  }

  changeVoteState(key, increment, user) {
    // vote for comments
    if (increment === 1) {
      // if currently vote-up, change to vote-down
      this.afs
        .collection('comment')
        .doc(key)
        .update({
          voteCount: firestore.FieldValue.increment(1),
          voteList: firestore.FieldValue.arrayUnion({
            userId: user,
            state: 'up'
          })
        });
    } else {
      // if currently vote-down, change to vote-up
      this.afs
        .collection('comment')
        .doc(key)
        .update({
          voteCount: firestore.FieldValue.increment(-1),
          voteList: firestore.FieldValue.arrayUnion({
            userId: user,
            state: 'down'
          })
        });
    }
  }

  updateVote(key, user, current) {
    // update votes(remove votes)
    if (current === 'up') {
      // currently vote-up
      this.afs
        .collection('comment')
        .doc(key)
        .update({
          voteCount: firestore.FieldValue.increment(-1),
          voteList: firestore.FieldValue.arrayRemove({
            userId: user,
            state: 'up'
          })
        });
    } else {
      // currently vote-down
      this.afs
        .collection('comment')
        .doc(key)
        .update({
          voteCount: firestore.FieldValue.increment(1),
          voteList: firestore.FieldValue.arrayRemove({
            userId: user,
            state: 'down'
          })
        });
    }
  }

  uploadImg(files: File[], colName, key) {
    // upload images to fireastore storage
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      const path = `forum/` + colName + `/${Date.now()}_${files[i].name}`;
      const fileRef = this.storage.ref(path);
      this.tasks = this.storage.upload(path, files[i]);
      this.tasks
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            this.downUrl = await fileRef.getDownloadURL().toPromise();
            await this.afs
              .collection(colName)
              .doc(key)
              .set(
                { images: firestore.FieldValue.arrayUnion(this.downUrl) },
                { merge: true }
              );
          })
        )
        .subscribe();
    }
  }

  updatePost(
    // update post
    key,
    postTitle,
    des,
    imageList,
    showFarmers,
    showBuyers
  ) {
    this.afs
      .collection('post')
      .doc(key)
      .update({
        title: postTitle,
        description: des,
        images: imageList,
        showFarmer: showFarmers,
        showBuyer: showBuyers
      });
  }

  updateComment(
    // update comment
    key,
    comm
  ) {
    this.afs
      .collection('comment')
      .doc(key)
      .update({
        comment: comm
      });
  }

  updateReply(
    // update replies
    key,
    rep
  ) {
    this.afs
      .collection('reply')
      .doc(key)
      .update({
        reply: rep
      });
  }

  getPost(userType) {
    // get all
    if (userType === 'admin') {
      return this.afs
      .collection('post', ref => ref.orderBy('date', 'desc'))
      .snapshotChanges()
      .pipe(
        map(postItems =>
          postItems.map(postItem => {
            const data = postItem.payload.doc.data();
            const key = postItem.payload.doc.id;
            return { key, ...data };
          })
        )
      );
    } else {
      return this.afs
        .collection('post', ref => ref.where(userType, '==', true).orderBy('date', 'desc'))
        .snapshotChanges()
        .pipe(
          map(postItems =>
            postItems.map(postItem => {
              const data = postItem.payload.doc.data();
              const key = postItem.payload.doc.id;
              return { key, ...data };
            })
          )
        );
    }
  }

  getPostByID(userId) {
    // get post by user id
    return this.afs
      .collection('post', ref =>
        ref.where('userID', '==', userId).orderBy('date', 'desc')
      )
      .snapshotChanges()
      .pipe(
        map(postItems =>
          postItems.map(postItem => {
            const data = postItem.payload.doc.data();
            const key = postItem.payload.doc.id;
            return { key, ...data };
          })
        )
      );
  }

  getAdminNotes() {
    // get posts which post by admin
    return this.afs
      .collection('post', ref =>
        ref.where('isAdminNote', '==', true).orderBy('date', 'desc')
      )
      .snapshotChanges()
      .pipe(
        map(postItems =>
          postItems.map(postItem => {
            const data = postItem.payload.doc.data();
            const key = postItem.payload.doc.id;
            return { key, ...data };
          })
        )
      );
  }

  getPostForUpdate(postId) {
    // get post data for update
    return this.afs
      .collection('post')
      .doc(postId)
      .get()
      .pipe();
  }

  getComment(postKey) {
    // get comments
    return this.afs
      .collection('comment', ref =>
        ref.where('postID', '==', postKey).orderBy('voteCount', 'desc').orderBy('date', 'desc')
      )
      .snapshotChanges()
      .pipe(
        map(comments =>
          comments.map(comment => {
            const data = comment.payload.doc.data();
            const key = comment.payload.doc.id;
            return { key, ...data };
          })
        )
      );
  }

  getCommentForUpdate(commentId) {
    // get comment data for update
    return this.afs
      .collection('comment')
      .doc(commentId)
      .get()
      .pipe();
  }

  getReply(commentId) {
    // get replies
    return this.afs
      .collection('reply', ref =>
        ref.where('commentID', '==', commentId).orderBy('date', 'desc')
      )
      .snapshotChanges()
      .pipe(
        map(replies =>
          replies.map(reply => {
            const data = reply.payload.doc.data();
            const key = reply.payload.doc.id;
            return { key, ...data };
          })
        )
      );
  }

  getReplyForUpdate(replyId) {
    // get reply data for update
    return this.afs
      .collection('reply')
      .doc(replyId)
      .get()
      .pipe();
  }

  getCount(collection, field, key) {
    // get counts(coments/replies)
    return this.afs
      .collection(collection, ref => ref.where(field, '==', key))
      .get()
      .pipe(map(coll => coll.size));
  }

  changeEndProperty(collection, key, value) {
    // change end or start thread
    this.afs
      .collection(collection)
      .doc(key)
      .update({ endThread: value });
  }

  deleteDocment(collection, key) {
    // delete document by key
    this.afs
      .collection(collection)
      .doc(key)
      .delete();
  }

  deleteReplyList(field, id) {
    // delete replies by feild
    return this.afs
      .collection('reply', ref => ref.where(field, '==', id))
      .snapshotChanges()
      .pipe(
        map(replies =>
          replies.map(reply => {
            const key = reply.payload.doc.id;
            this.afs
              .collection('reply')
              .doc(key)
              .delete();
          })
        )
      );
  }

  deleteCommentList(field, id) {
    // delte comments by field
    return this.afs
      .collection('comment', ref => ref.where(field, '==', id))
      .snapshotChanges()
      .pipe(
        map(comments =>
          comments.map(comment => {
            const key = comment.payload.doc.id;
            this.afs
              .collection('comment')
              .doc(key)
              .delete();
          })
        )
      );
  }

  deleteImage(urlList: any[]) {
    // not delete mulitple images
    for (let i = 0; i < urlList.length; i++) {
      this.storage.storage.refFromURL(urlList[i]).delete();
    }
  }
}
