import { Component , OnInit, Input } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators/map';
import { firestore } from 'firebase';
import { Files } from '../shared/services/files';
interface Post {
  downloadURL: string;
}
interface PostId extends Post {
  id: string ;
}
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  @Input() file: File;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;
  ref: AngularFireStorageReference;
  url = '';
  files: Observable<any>;
 // id: any;
 usersCollection: AngularFirestoreCollection<Files>;
 currentUser: any;
  users: Observable<any[]>;
  selectedUser: any;
  avatar: any;
  f: Observable<any[]>;
  constructor(private afs: AngularFirestore, private afStorage: AngularFireStorage) {
    this.files = afs.collection('files').valueChanges();
   }
  ngOnInit() {
    this.startUpload();
  }
  UserClicked(users: any) {
    this.selectedUser = users.displayName;
    this.avatar = users.photoURL;
    const currentuser = JSON.parse(localStorage.getItem('user'));
    this.currentUser = currentuser.displayName;
    // this.afs.collection('chats');
    // this.usersCollection = this.afs.collection('files', ref => ref.where('reciever', '<=', this.selectedUser )
    // .where('reciever', '>=', this.selectedUser ));
    // this.f = this.usersCollection.valueChanges();
    // this.afs.collection('chats' , ref => ref.orderBy('date'));
   }

  startUpload() {
   // const r = this.afs.collection('chats').doc(chatId);
    const user = JSON.parse(localStorage.getItem('user'));
    const path = 'test/${new Date()}_${this.file.name}';
    this.ref = this.afStorage.ref(path);
    this.task = this.afStorage.upload(path, this.file);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize(async () => {
        this.downloadURL = await this.ref.getDownloadURL().toPromise();
        this.afs.collection('chats').add( {
           downloadURL: this.downloadURL,
           avatar: user.photoURL,
            path ,
            type : 'file',
            date: new Date(),
           sender: user.displayName,
           reciever: this.selectedUser,
          });
      })
    );
    ///////////
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize(async () => {
        this.downloadURL = await this.ref.getDownloadURL().toPromise();
        this.afs.collection('files').add( {
           downloadURL: this.downloadURL,
           avatar: user.photoURL,
            path ,
            type : 'file',
            date: new Date(),
         //  sender: user.displayName,
          // reciever: this.selectedUser,
          });
      })
    );
    // const data = {
    //   downloadURL: this.downloadURL, path , type : 'file'
    // };
    // return r.update({
    //   files: firestore.FieldValue.arrayUnion(data)
    // });
  }
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}

