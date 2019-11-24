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

  constructor(private db: AngularFirestore) {}

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
    postID,
    commentUserId,
    commentUserName,
    commentUserImage,
    isEnd,
  ) {
    return this.db.collection('comment').add({
      comment: comm,
      date: dateTime,
      id: postID,
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
    replyUserId,
    replyUserName,
    replyUserImage
  ) {
    return this.db.collection('reply').add({
      reply: rpl,
      date: dateTime,
      commentID: commentId,
      userID: replyUserId,
      userName: replyUserName,
      userImage: replyUserImage
    });
  }

  getPost() {
    return this.db
      .collection('forum', ref => ref.orderBy('date' , 'desc'))
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

  getPostByID(userId) {
    return this.db
      .collection('forum', ref => ref.where('userID', '==', userId).orderBy('date' , 'desc'))
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

  getComment(postID) {
    return this.db
      .collection('comment', ref => ref.where('id', '==', postID).orderBy('date' , 'desc'))
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

  getReply(commentID) {
    return this.db
      .collection('reply', ref => ref.where('commentID', '==', commentID).orderBy('date' , 'desc'))
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

  getCount(collectionName) {
    this.db.collection(collectionName).get().subscribe(doc => {
      console.log(doc.size);
      });
  }
}
