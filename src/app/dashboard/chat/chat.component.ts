import { Component, Input } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { Chats } from './chats';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  files: File[] = [];
  chatsCollection: AngularFirestoreCollection<Chats>;
  chatCollection: AngularFirestoreCollection<Chats>;
  repsCollection: AngularFirestoreCollection<Chats>;
  userData: any;
  user = JSON.parse(localStorage.getItem('user'));
  currentUser: any;
  currentId: any;
  users: Observable<any[]>;
  selectedUser: any;
  selectedId: any;
  avatar: any;
  messages: Observable<any[]>;
  replies: Observable<any[]>;
  content: string;
  file: Observable<any>;
  isHovering: boolean;
  /////
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {
    this.users = afs.collection('users').valueChanges();
    this.file = afs.collection('files').valueChanges();
  }
  compFn = (a, b) => {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  }
  UserClicked(users: any) {
    this.selectedUser = users.displayName;
    this.selectedId = users.uid;
    this.avatar = users.photoURL;
    const currentuser = JSON.parse(localStorage.getItem('user'));
    this.currentUser = currentuser.displayName;
    this.currentId = currentuser.uid;
    //////////////////
    this.chatCollection = this.afs
    .collection('chats', ref => ref.where('rid', '==' , this.selectedId)
    .where('sid', '==', this.currentId));
    ///////////////////
    this.repsCollection = this.afs.collection('chats',
     ref => ref.where('rid', '==' , this.currentId)
    .where('sid', '==', this.selectedId));
    //////////////
    this.messages = Observable
     .combineLatest(this.chatCollection.valueChanges().pipe(
      map(res => {
        res.forEach(r => {
          r.reply = true;
          return r;
        });
        return res; })
     ),
                   this.repsCollection.valueChanges()
                   .pipe(
                   map(res => {
                     res.forEach(r => {
                       r.reply = false;
                       return r;
                     });
                     return res; })
                 )
                )
    .switchMap(chats => {
        const [chatCollection, repsCollection] = chats;
        const combined = chatCollection.concat(repsCollection);
        return Observable.of(combined);
    })
    .pipe(
      map(combined => combined.sort(this.compFn))
    );
   }

  sendMessage(event: any, reply: boolean) {
    const user = JSON.parse(localStorage.getItem('user'));
    this.afs
      .collection('chats')
      .add({
        content: event.message,
        time: Date.now(),
        avatar: user.photoURL,
        sender: user.displayName,
        reciever: this.selectedUser,
        date: new Date(),
        sid: user.uid,
        rid: this.selectedId,
        reply: true
     });
  }
  // 
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'test/';
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }
}
