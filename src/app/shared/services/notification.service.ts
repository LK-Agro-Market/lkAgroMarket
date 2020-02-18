import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Notification } from '../models/notification';
import { User } from '../models/user';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public afs: AngularFirestore) { }

  createNotification(content: string, url: string, receiverId: string, relatedUser: User, ) {
    const notificationId = this.afs.createId();
    const notification: Notification = {
      notificationId: notificationId,
      content: content,
      url: url,
      receiverId: receiverId,
      relatedUser: relatedUser
    }
    this.afs.collection('notifications').doc(notificationId).set(notification);
  }

  getNotifications(receiverId: string) {
    return this.afs.collection<Notification>('notifications', ref=> ref.where('receiverId','==',receiverId)).valueChanges();
  }

  deleteNotification(notificationId: string) {
    return from(this.afs.collection<Notification>('notifications').doc(notificationId).delete());
  }
}
