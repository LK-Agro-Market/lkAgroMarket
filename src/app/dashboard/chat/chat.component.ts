import { Component, Input } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatShowcaseService } from '../shared/services/chat-showcase.service';
import { Chats } from '../shared/services/chats';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  usersCollection: AngularFirestoreCollection<Chats>;
  userData: any;
  user = JSON.parse(localStorage.getItem('user'));
  currentUser: any;
  users: Observable<any[]>;
  selectedUser: any;
  avatar: any;
  messages: Observable<any[]>;
  content: string;
  ////////
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  constructor(
    private afs: AngularFirestore,
    protected chatShowcaseService: ChatShowcaseService,
    private afStorage: AngularFireStorage
  ) {
    this.users = afs.collection('users').valueChanges();
    this.afs.collection('chats' , ref => ref.orderBy('date'));
  }
  UserClicked(users: any) {
    this.selectedUser = users.displayName;
    this.avatar = users.photoURL;
    const currentuser = JSON.parse(localStorage.getItem('user'));
    this.currentUser = currentuser.displayName;
    this.afs.collection('chats' , ref => ref.orderBy('date'));
    this.usersCollection = this.afs.collection('chats', ref => ref.where('reciever', '<=', this.selectedUser )
    .where('reciever', '>=', this.selectedUser ));
    this.messages = this.usersCollection.valueChanges();
    // this.afs.collection('chats' , ref => ref.orderBy('date'));
   }

  sendMessage(event: any) {
    const user = JSON.parse(localStorage.getItem('user'));
    this.afs
      .collection('chats', ref => ref.orderBy('date'))
      .add({
        content: event.message,
        time: Date.now(),
        avatar: user.photoURL,
        sender: user.displayName,
        reciever: this.selectedUser,
        date: new Date()
      });
    // this.afs.collection('chats' , ref => ref.orderBy('date', 'desc'));
    // if('sender' == 'user.displayName' && 'reciever' == 'this.selectedUser'){
  //  }
  }
  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.downloadURL = this.ref.getDownloadURL();
  }
}
