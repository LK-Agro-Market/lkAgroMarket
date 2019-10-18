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
  //////////////
  snapshot: Observable<any>;
  files: Observable<any>;
  constructor(
    private afs: AngularFirestore,
    protected chatShowcaseService: ChatShowcaseService,
    private afStorage: AngularFireStorage
  ) {
    this.users = afs.collection('users').valueChanges();
   // this.afs.collection('chats' , ref => ref.orderBy('date'));
    this.files = afs.collection('files').valueChanges();
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
   // const files = this.upload(event);
    const user = JSON.parse(localStorage.getItem('user'));
    this.afs
      .collection('chats', ref => ref.orderBy('date'))
      .add({
        content: event.message,
        time: Date.now(),
        avatar: user.photoURL,
        sender: user.displayName,
        reciever: this.selectedUser,
        date: new Date(),
       // type: files.length ? 'file' : 'text',
      //  files: files,
      });
    // this.afs.collection('chats' , ref => ref.orderBy('date', 'desc'));
    // if('sender' == 'user.displayName' && 'reciever' == 'this.selectedUser'){
  //  }
  }
  // upload(event) {
  //   const path = 'test/${new Date()}_${this.file.name}';
  //   this.ref = this.afStorage.ref(path);
  //   this.task = this.ref.put(event.target.files[0]);
  //   this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
  //   this.uploadProgress = this.task.percentageChanges();
  //   this.downloadURL = this.ref.getDownloadURL();
  //   this.snapshot = this.task.snapshotChanges().pipe(
  //     tap(console.log),
  //     finalize(async () => {
  //       this.downloadURL = await this.ref.getDownloadURL().toPromise();
  //       this.afs.collection('files').add( { downloadURL: this.downloadURL, path });
  //     })
  //   );
  //   const files = !event.files ? [] : event.files.map((file) => {
  //     return {
  //       url: file.src,
  //       type: file.type,
  //       icon: 'file-text-outline',
  //     };
  //   });
  // }
}
