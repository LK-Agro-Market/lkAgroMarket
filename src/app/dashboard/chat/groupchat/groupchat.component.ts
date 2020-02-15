import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { Chats } from '../chats';
import { UserDetails } from '../../../shared/models/user-details';
import { ChatService } from '../chat.service';
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
import { finalize, tap } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

interface Post {
  content: string;
}
interface PostId extends Post {
  id: string;
}

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.component.html',
  styleUrls: ['./groupchat.component.scss']
})
export class GroupchatComponent implements OnInit {
  files: File[] = [];
  chatsCollection: AngularFirestoreCollection<Chats>;
  fchatCollection: AngularFirestoreCollection<Chats>;
  frepsCollection: AngularFirestoreCollection<Chats>;
  bchatCollection: AngularFirestoreCollection<Chats>;
  brepsCollection: AngularFirestoreCollection<Chats>;
  userData: any;
  user = JSON.parse(localStorage.getItem('user'));
  currentUser: any;
  currentId: any;
  users: Observable<any[]>;
  userD: Observable<any[]>;
  fmessages: Observable<any[]>;
  bmessages: Observable<any[]>;
  content: string;
  file: Observable<any>;
  isHovering: boolean;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  ref: AngularFireStorageReference;

  chatDoc: AngularFirestoreDocument<Post>;
  chat: Observable<Post>;
  userDetails: UserDetails;

  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private location: Location,
    private chatService: ChatService,
    private toastr: ToastrService
  ) {}
  compFn = (a, b) => {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  };
  ngOnInit() {
    this.chatService.getUserDetails(this.user.uid).subscribe(userDetails => {
      this.userDetails = userDetails;
    });

    this.bmessages = this.afs
      .collection('groupchat')
      .valueChanges({ idField: 'id' })
      .pipe(map(combined => combined.sort(this.compFn)));
    this.fmessages = this.afs
      .collection('groupchat', ref => ref.where('userLevel', '==', 'Farmer'))
      .valueChanges({ idField: 'id' })
      .pipe(map(combined => combined.sort(this.compFn)));
    const currentuser = JSON.parse(localStorage.getItem('user'));
    this.currentUser = currentuser.displayName;
    this.currentId = currentuser.uid;
  }

  sendMessage(content) {
    const user = JSON.parse(localStorage.getItem('user'));
    this.afs.collection('groupchat').add({
      content: this.content,
      time: Date.now(),
      avatar: user.photoURL,
      sender: user.displayName,
      date: new Date(),
      sid: user.uid,
      reply: true,
      type: 'text',
      userLevel: this.userDetails.userLevel
    });
    this.resetForm();
    this.location.replaceState('/groupchats');
  }

  resetForm() {
    this.content = '';
  }
  getPost(chatId) {
    this.chatDoc = this.afs.doc('groupchat/' + chatId);
    this.chat = this.chatDoc.valueChanges();
  }

  deleteChat(chatId) {
    if (confirm('Are you sure to delete this message?')) {
      this.afs.doc('groupchat/' + chatId).delete();
      this.toastr.warning('Message was removed successfully');
    }
  }

  uploadFile(event) {
    const user = JSON.parse(localStorage.getItem('user'));
    const file = event.target.files[0];
    const filePath = '/groupchats/' + Date.now() + '-' + this.files[0];
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);
    this.ref = this.afStorage.ref(filePath);
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(
        finalize(async () => {
          this.downloadURL = await this.ref.getDownloadURL().toPromise();
          this.afs.collection('groupchat').add({
            content: '',
            avatar: user.photoURL,
            type: 'file',
            time: Date.now(),
            date: new Date(),
            sender: user.displayName,
            sid: user.uid,
            reply: true,
            url: this.downloadURL,
            userLevel: this.userDetails.userLevel
          });
        })
      )
      .subscribe();
  }
}
