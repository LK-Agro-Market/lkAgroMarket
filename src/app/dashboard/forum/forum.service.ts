import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList, snapshotChanges } from '@angular/fire/database';
import { map, finalize } from 'rxjs/operators';
import { AngularFireUploadTask, AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';
import { Observable, pipe } from 'rxjs';
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
    private storage: AngularFireStorage,
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
    postUserName,
    postUserImage,
    showFarmers,
    showBuyers,
    isEnd,
  ) {
    return this.afs.collection('post').doc(key).set({
      title: postTitle,
      description: des,
      date: dateTime,
      userID: postUserId,
      userName: postUserName,
      userImage: postUserImage,
      showFarmer: showFarmers,
      showBuyer: showBuyers,
      endThread: isEnd,
    });
  }

  createComment(
    comm,
    dateTime,
    postId,
    commentUserId,
    commentUserName,
    commentUserImage,
    isEnd,
  ) {
    return this.afs.collection('comment').add({
      comment: comm,
      date: dateTime,
      postID: postId,
      userID: commentUserId,
      userName: commentUserName,
      userImage: commentUserImage,
      endThread: isEnd,
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

  uploadImg(files: File[], colName, key) {
    for (let i = 0; i < files.length; i++) {
      const path = `forum/` + colName + `/${Date.now()}_${files[i].name}`;
      const fileRef = this.storage.ref(path);
      this.tasks = this.storage.upload(path, files[i]);
      this.tasks.snapshotChanges().pipe(
        finalize(async () => {
          this.downUrl = await fileRef.getDownloadURL().toPromise();
          await this.afs.collection(colName)
            .doc(key)
            .set(
              { images: firestore.FieldValue.arrayUnion(this.downUrl) },
              { merge: true }
            );
        }),
      ).subscribe();
    }
  }

  updatePost(
    key,
    postTitle,
    des,
    dateTime,
    postUserId,
    postUserName,
    postUserImage,
    showFarmers,
    showBuyers,
    isEnd,
  ) {
    this.afs.collection('post').doc(key).update({
      title: postTitle,
      description: des,
      date: dateTime,
      userID: postUserId,
      userName: postUserName,
      userImage: postUserImage,
      showFarmer: showFarmers,
      showBuyer: showBuyers,
      endThread: isEnd,
    });
  }

  getPost() { // get all
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
  }

  getPostByID(userId) { // get post by user id
    return this.afs
      .collection('post', ref => ref.where('userID', '==', userId).orderBy('date', 'desc'))
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
    return this.afs
      .collection('post')
      .doc(postId)
      .get()
      .pipe();
  }

  getComment(postKey) { // get comments
    return this.afs
      .collection('comment', ref => ref.where('postID', '==', postKey).orderBy('date', 'desc'))
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

  getReply(commentId) { // get replies
    return this.afs
      .collection('reply', ref => ref.where('commentID', '==', commentId).orderBy('date', 'desc'))
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

  getCount(collection, field, key) {  // get counts(coments/replies)
    return this.afs.collection(collection, ref => ref.where(field, '==', key)).get().pipe(
      map(coll => coll.size)
    );
  }

  changeEndProperty(collection, key, value) { // change end or start thread
    this.afs.collection(collection).doc(key).update({ endThread: value });
  }

  deleteDocment(collection, key) { // delete document by key
    this.afs.collection(collection).doc(key).delete();
  }

  deleteReplyList(field, id) {  // delete replies by feild
    return this.afs
      .collection('reply', ref => ref.where(field, '==', id))
      .snapshotChanges()
      .pipe(
        map(replies =>
          replies.map(reply => {
            const key = reply.payload.doc.id;
            this.afs.collection('reply').doc(key).delete();
          })
        )
      );
  }

  deleteCommentList(field, id) {  // delte comments by field
    return this.afs
      .collection('comment', ref => ref.where(field, '==', id))
      .snapshotChanges()
      .pipe(
        map(comments =>
          comments.map(comment => {
            const key = comment.payload.doc.id;
            this.afs.collection('comment').doc(key).delete();
          })
        )
      );
  }


}
