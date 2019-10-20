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
import {finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  files: File[] = [];
  chatsCollection: AngularFirestoreCollection<Chats>;
  repsCollection: AngularFirestoreCollection<Chats>;
  userData: any;
  user = JSON.parse(localStorage.getItem('user'));
  currentUser: any;
  users: Observable<any[]>;
  selectedUser: any;
  avatar: any;
  messages: Observable<any[]>;
  replies: Observable<any[]>;
  content: string;
  ////////
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  //////////////
  percentage: Observable<number>;
  snapshot: Observable<any>;
  file: Observable<any>;
  isHovering: boolean;
  constructor(
    private afs: AngularFirestore,
    protected chatShowcaseService: ChatShowcaseService,
    private afStorage: AngularFireStorage
  ) {
    this.users = afs.collection('users').valueChanges();
    this.file = afs.collection('files').valueChanges();
  }
  UserClicked(users: any) {
    this.selectedUser = users.displayName;
    this.avatar = users.photoURL;
    const currentuser = JSON.parse(localStorage.getItem('user'));
    this.currentUser = currentuser.displayName;
    this.chatsCollection = this.afs.collection('chats',
     ref => ref.where('reciever', '==' , this.selectedUser)
    .where('sender', '==', this.currentUser));
    this.messages = this.chatsCollection.valueChanges();
    ///////////
    // this.repsCollection = this.afs.collection('chats', ref => ref.where('reciever', '<=', this.currentUser )
    // .where('reciever', '>=', this.currentUser ));
    // this.replies = this.chatsCollection.valueChanges();
    // this.afs.collection('chats' , ref => ref.orderBy('date'));
   }

  sendMessage(event: any) {
    const user = JSON.parse(localStorage.getItem('user'));
    this.afs
      .collection('chats', ref => ref.orderBy('date', 'desc' ))
      .add({
        content: event.message,
        time: Date.now(),
        avatar: user.photoURL,
        sender: user.displayName,
        reciever: this.selectedUser,
        date: new Date(),
       // type: this.snapshot.length ? 'file' : 'text',
    //   type: 'file',
    //   files: files,
    //   files: this.snapshot,
     });
  }
  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }
}
