import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  forumList: AngularFireList<any>;
  commentList: AngularFireList<any>;

  constructor(private db: AngularFirestore) {}

  createPost(title, des, dateTime, postUserId, postUserName, showFarmer, showBuyer) {
    return this.db.collection('forum')
      .add({
        title: title,
        description: des,
        date: dateTime,
        userID: postUserId,
        userName: postUserName,
        showFarmer: showFarmer,
        showBuyer: showBuyer,
      });
  }

  createComment(comm, dateTime, postID, commentUserId, commentUserName) {
    return this.db.collection('comment')
    .add({
      comment: comm,
      date: dateTime,
      id: postID,
      userID: commentUserId,
      userName: commentUserName,
    });
  }

  getPost() {
    return this.db.collection('forum').snapshotChanges().pipe(
      map(postItems => postItems.map(postItem => {
        const data = postItem.payload.doc.data();
        const id = postItem.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  getComment(commentID) {
    return this.db.collection('comment', ref => ref.where('id', '==', commentID)).snapshotChanges().pipe(
      map(comments => comments.map(comment => {
        const data = comment.payload.doc.data();
        const id = comment.payload.doc;
        return {id, ...data};
      }))
    );
  }




}
