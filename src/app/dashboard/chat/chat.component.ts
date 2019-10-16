import { Component, Input } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatShowcaseService } from '../shared/services/chat-showcase.service';
import { Chats } from '../shared/services/chats';

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
  constructor(
    private afs: AngularFirestore,
    protected chatShowcaseService: ChatShowcaseService
  ) {
    this.users = afs.collection('users').valueChanges();
  }
  UserClicked(users: any) {
    this.selectedUser = users.displayName;
    this.avatar = users.photoURL;
    const currentuser = JSON.parse(localStorage.getItem('user'));
    this.currentUser = currentuser.displayName;

    this.usersCollection = this.afs.collection('chats', ref => ref.where('reciever', '<=', this.selectedUser )
    .where('reciever', '>=', this.selectedUser ));
    this.messages = this.usersCollection.valueChanges();
  }

  sendMessage(event: any) {
    const user = JSON.parse(localStorage.getItem('user'));
    this.afs
      .collection('chats')
      .add({
       // id,
        content: event.message,
        date: Date.now(),
        avatar: user.photoURL,
        sender: user.displayName,
        reciever: this.selectedUser
      });
    // if('sender' == 'user.displayName' && 'reciever' == 'this.selectedUser'){
  //  }
  }
}
