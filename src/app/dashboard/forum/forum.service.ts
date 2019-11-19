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
    title,
    des,
    dateTime,
    postUserId,
    postUserName,
    postUserImage,
    showFarmer,
    showBuyer
  ) {
    return this.db.collection('forum').add({
      title: title,
      description: des,
      date: dateTime,
      userID: postUserId,
      userName: postUserName,
      userImage: postUserImage,
      showFarmer: showFarmer,
      showBuyer: showBuyer
    });
  }

  createComment(
    comm,
    dateTime,
    postID,
    commentUserId,
    commentUserName,
    commentUserImage
  ) {
    return this.db.collection('comment').add({
      comment: comm,
      date: dateTime,
      id: postID,
      userID: commentUserId,
      userName: commentUserName,
      userImage: commentUserImage
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
      .collection('forum')
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
      .collection('forum', ref => ref.where('userID', '==', userId))
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
      .collection('comment', ref => ref.where('id', '==', postID))
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
      .collection('reply', ref => ref.where('commentID', '==', commentID))
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
}
