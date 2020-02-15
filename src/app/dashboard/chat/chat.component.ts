import { Component, Input } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { Chats } from './chats';
import { UserDetails } from '../../shared/models/user-details';
import { ChatService } from '../chat/chat.service';
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
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
  userD: Observable<any[]>;
  selectedUser: any;
  selectedId: any;
  avatar: any;
  farmerC: Observable<any[]>;
  buyerC: Observable<any[]>;
  adminC: Observable<any[]>;
  messages: Observable<any[]>;
  replies: Observable<any[]>;
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

  farmers: boolean = false;
  buyers: boolean = false;
  admin: boolean = false;
  group: boolean = false;
  farmerLists: boolean = false;
  buyerLists: boolean = false;
  userDetails: UserDetails;
  seen: any;
  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private location: Location,
    private chatService: ChatService,
    private toastr: ToastrService
  ) {
    this.users = afs
      .collection('users', ref => ref.orderBy('displayName'))
      .valueChanges();
    this.userD = afs.collection('userDetails').valueChanges({ idField: 'id' });
    this.farmerC = this.afs
      .collection('userDetails', ref => ref.where('userLevel', '==', 'Farmer'))
      .valueChanges({ idField: 'id' });
    this.buyerC = this.afs
      .collection('userDetails', ref => ref.where('userLevel', '==', 'Buyer'))
      .valueChanges({ idField: 'id' });
    this.adminC = this.afs
      .collection('userDetails', ref =>
        ref.where('userLevel', '==', 'Administrator')
      )
      .valueChanges({ idField: 'id' });
  }
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
  }
  farmerList() {
    this.farmers = true;
    this.buyers = false;
    this.admin = false;
    this.group = false;
    this.farmerLists = false;
    this.buyerLists = false;
  }
  buyerList() {
    this.buyers = true;
    this.farmers = false;
    this.admin = false;
    this.group = false;
    this.farmerLists = false;
    this.buyerLists = false;
  }
  adminList() {
    this.admin = true;
    this.farmers = false;
    this.buyers = false;
    this.group = false;
    this.farmerLists = false;
    this.buyerLists = false;
  }
  farmerGroup() {
    this.farmers = false;
    this.buyers = false;
    this.admin = false;
    this.group = true;
    this.location.replaceState('/farmerchats/');
    this.selectedUser = 'Farmers Group Chat';
    this.avatar = '../../../assets/group.png';
    this.farmerLists = true;
  }
  buyerGroup() {
    this.farmers = false;
    this.buyers = false;
    this.admin = false;
    this.group = true;
    this.location.replaceState('/buyerchats/');
    this.selectedUser = 'Buyers Group Chat';
    this.avatar = '../../../assets/group.png';
    this.buyerLists = true;
  }

  UserClicked(users: any) {
    this.selectedUser = users.displayName;
    this.selectedId = users.uid;
    this.avatar = users.photoURL;
    const currentuser = JSON.parse(localStorage.getItem('user'));
    this.currentUser = currentuser.displayName;
    this.currentId = currentuser.uid;
    this.location.replaceState('/chats/', this.selectedUser);

    this.chatCollection = this.afs.collection('chats', ref =>
      ref.where('rid', '==', this.selectedId).where('sid', '==', this.currentId)
    );

    this.repsCollection = this.afs.collection<Chats>('chats', ref =>
      ref.where('rid', '==', this.currentId).where('sid', '==', this.selectedId)
    );

    this.messages = Observable.combineLatest(
      this.chatCollection.valueChanges({ idField: 'id' }),
      this.repsCollection.valueChanges()
    )
      .switchMap(chats => {
        const [chatCollection, repsCollection] = chats;
        const combined = chatCollection.concat(repsCollection);
        return Observable.of(combined);
      })
      .pipe(map(combined => combined.sort(this.compFn)));

    /////////////// seen section //////////
    this.afs
      .collection<Chats>('chats', ref =>
        ref
          .where('sid', '==', this.selectedId)
          .where('rid', '==', this.currentId)
      )
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
      .subscribe(replies => {
        replies.forEach(job => {
          this.afs
            .collection('chats')
            .doc(job.id)
            .update({ seen: 'seened' });
        });
      });
  }

  sendMessage(content) {
    const user = JSON.parse(localStorage.getItem('user'));
    this.afs.collection('chats').add({
      content: this.content,
      time: Date.now(),
      avatar: user.photoURL,
      sender: user.displayName,
      reciever: this.selectedUser,
      date: new Date(),
      sid: user.uid,
      rid: this.selectedId,
      reply: true,
      type: 'text',
      seen: ''
    });
    this.resetForm();
    this.location.replaceState('/chats', this.selectedUser);
  }

  resetForm() {
    this.content = '';
  }
  getPost(chatId) {
    this.chatDoc = this.afs.doc('chats/' + chatId);
    this.chat = this.chatDoc.valueChanges();
  }
  deleteChat(chatId) {
    if (confirm('Are you sure to delete this message?')) {
      this.afs.doc('chats/' + chatId).delete();
      this.toastr.warning('Message was removed successfully');
    }
  }
  uploadFile(event) {
    const user = JSON.parse(localStorage.getItem('user'));
    const file = event.target.files[0];
    const filePath = '/chats/' + Date.now() + '-' + this.files[0];
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);
    this.ref = this.afStorage.ref(filePath);
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(
        finalize(async () => {
          this.downloadURL = await this.ref.getDownloadURL().toPromise();
          this.afs.collection('chats').add({
            content: '',
            avatar: user.photoURL,
            type: 'file',
            time: Date.now(),
            date: new Date(),
            sid: user.uid,
            rid: this.selectedId,
            url: this.downloadURL,
            seen: ''
          });
        })
      )
      .subscribe();
  }
}
