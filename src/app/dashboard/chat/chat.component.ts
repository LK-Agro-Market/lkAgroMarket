import { Component,Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatShowcaseService } from '../shared/services/chat-showcase.service';
import 'rxjs/operator/filter';
import 'rxjs/add/operator/filter';
import { filter } from 'rxjs/operators'



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})


export class ChatComponent {
   user = JSON.parse(localStorage.getItem('user'));
  currentUser: any;
  users: Observable<any[]>;
  selectedUser:any;
  avatar:any;
  messages:Observable<any[]>;
  content:string;
  constructor(private afs: AngularFirestore,protected chatShowcaseService:ChatShowcaseService) {
    this.users = afs.collection('users').valueChanges();
   // if('sender == user' && 'reciever == selectedUser'){
    this.messages = afs.collection('chats').valueChanges();
   // }
    
  }
  /*ngOnInit(){
    this.others =this.users.filter(users => !this.isAuthenticated(users));
  }
  isAuthenticated(users){
   return this.currentUser = JSON.parse(localStorage.getItem('user'));
  }*/
 
  UserClicked(users: any){
    this.selectedUser=users.displayName;
    this.avatar = users.photoURL;
    const currentuser = JSON.parse(localStorage.getItem('user'));
    this.currentUser=currentuser.displayName;

  }
 
  sendMessage(event:any) {
    const user = JSON.parse(localStorage.getItem('user'));
    return this.afs.collection('chats').add({'content': event.message,'date': Date.now(),'avatar':user.photoURL,'sender':user.displayName,'reciever': this.selectedUser });
    
  }
  
}

  
  
  

