import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  forumList: AngularFireList<any>;

  constructor(private db: AngularFirestore) {}

  createPost(title, des, dateTime, postUserId, postUserName) {
    return this.db
      .collection('forum')
      .add({
        title: title,
        description: des,
        date: dateTime,
        userID: postUserId,
        userName: postUserName
      });
  }

  getAll() {
    return this.db.collection('forum').valueChanges();
  }
}
