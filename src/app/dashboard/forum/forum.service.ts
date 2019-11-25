import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList, snapshotChanges } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  forumList: AngularFireList<any>;
  commentList: AngularFireList<any>;

  constructor(private db: AngularFirestore) { }

  createPost( 
    postTitle,
    des,
    dateTime,
    postUserId,
    postUserName,
    postUserImage,
    showFarmers,
    showBuyers,
    isEnd
  ) {
    return this.db.collection('forum').add({
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
    return this.db.collection('comment').add({
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
    return this.db.collection('reply').add({
      reply: rpl,
      date: dateTime,
      commentID: commentId,
      postID: postId,
      userID: replyUserId,
      userName: replyUserName,
      userImage: replyUserImage
    });
    console.log('done');
  }

  getPost() { // get all
    return this.db
      .collection('forum', ref => ref.orderBy('date', 'desc'))
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
    return this.db
      .collection('forum', ref => ref.where('userID', '==', userId).orderBy('date', 'desc'))
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

  getComment(postKey) { // get comments
    return this.db
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
    return this.db
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
    return this.db.collection(collection, ref => ref.where(field, '==', key)).get().pipe(
      map(coll => coll.size)
    );
  }

  changeEndProperty(collection, key, value) { // change end or start thread
    this.db.collection(collection).doc(key).update({ endThread: value });
  }

  deleteDocment(collection, key) { // delete document by key
    this.db.collection(collection).doc(key).delete();
  }

  deleteReplyList(field, id) {  // delete replies by feild
    return this.db
      .collection('reply', ref => ref.where(field, '==', id))
      .snapshotChanges()
      .pipe(
        map(replies =>
          replies.map(reply => {
            const key = reply.payload.doc.id;
            this.db.collection('reply').doc(key).delete();
          })
        )
      );
  }

  deleteCommentList(field, id) {  // delte comments by field
    return this.db
      .collection('comment', ref => ref.where(field, '==', id))
      .snapshotChanges()
      .pipe(
        map(comments =>
          comments.map(comment => {
            const key = comment.payload.doc.id;
            this.db.collection('comment').doc(key).delete();
          })
        )
      );
  }
}
