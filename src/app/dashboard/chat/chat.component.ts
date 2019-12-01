import { Component, Input } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { Chats } from './chats';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { finalize , tap } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Location } from '@angular/common';

interface Post {
  
  content: string;
}
interface PostId extends Post {
  id: string;
}

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
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  ref: AngularFireStorageReference;
  // file: any;
 // url = '';
  // files: Observable<any>;
  chatDoc: AngularFirestoreDocument<Post>;
  chat: Observable<Post>;
///////////////////
  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private location: Location
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
    this.location.replaceState('/chat-dashboard/', this.selectedUser);
    //////////////////
    this.chatCollection = this.afs.collection('chats', ref =>
      ref.where('rid', '==', this.selectedId).where('sid', '==', this.currentId)
    );
    ///////////////////
    this.repsCollection = this.afs.collection('chats', ref =>
      ref.where('rid', '==', this.currentId).where('sid', '==', this.selectedId)
    );
    //////////////
    this.messages = Observable.combineLatest(
      this.chatCollection.valueChanges().pipe(
        map(res => {
          res.forEach(r => {
            r.reply = true;
            return r;
          });
          return res;
        })
      ),
      this.repsCollection.valueChanges().pipe(
        map(res => {
          res.forEach(r => {
            r.reply = false;
            return r;
          });
          return res;
        })
      )
    )
      .switchMap(chats => {
        const [chatCollection, repsCollection] = chats;
        const combined = chatCollection.concat(repsCollection);
        return Observable.of(combined);
      })
      .pipe(map(combined => combined.sort(this.compFn)));
  }

  sendMessage(content) {
    const user = JSON.parse(localStorage.getItem('user'));
    this.afs
      .collection('chats')
      .add({
        content: this.content,
        time: Date.now(),
        avatar: user.photoURL,
        sender: user.displayName,
        reciever: this.selectedUser,
        date: new Date(),
        sid: user.uid,
        rid: this.selectedId,
        reply: true,
        type: 'text'
     });
    this.resetForm();
    this.location.replaceState('/chat-dashboard');
  }
  resetForm(){
    this.content = '';
}
  getPost(chatId) {
    this.chatDoc = this.afs.doc('chats/' + chatId);
    this.chat = this.chatDoc.valueChanges();
  }
  ////////////////////////////////////////////////
  uploadFile(event) {
      const user = JSON.parse(localStorage.getItem('user'));
      const file = event.target.files[0];
      const filePath = '/chats/' + Date.now() + '-' + this.files[0];
      const fileRef = this.afStorage.ref(filePath);
      const task = this.afStorage.upload(filePath, file);
      this.ref = this.afStorage.ref(filePath);
      // observe percentage changes
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(async () => {
                 this.downloadURL = await this.ref.getDownloadURL().toPromise();
                 this.afs.collection('chats').add( {
                    content: '' ,
                    avatar: user.photoURL,
                    type : 'file',
                     time: Date.now(),
                     date: new Date(),
                     sender: user.displayName,
                     reciever: this.selectedUser,
                     sid: user.uid,
                     rid: this.selectedId,
                     reply: true,
                  //   files: {file: {url: this.downloadURL , type: 'image/jpeg' }}
                   //  files: {url: this.downloadURL , type: 'image/jpeg' }
                      url: this.downloadURL,
                   //   files: files
                   });
               })
      )
      .subscribe();
  }
}
