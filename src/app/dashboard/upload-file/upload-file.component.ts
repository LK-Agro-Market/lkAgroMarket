// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-upload-file',
//   templateUrl: './upload-file.component.html',
//   styleUrls: ['./upload-file.component.scss']
// })
// export class UploadFileComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component , OnInit, Input } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize, tap } from 'rxjs/operators';
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
  constructor(private afs: AngularFirestore, private afStorage: AngularFireStorage) {
    this.files = afs.collection('files').valueChanges();
   }
  ngOnInit() {
    this.startUpload();
  }
  startUpload() {
    const path = 'test/${new Date()}_${this.file.name}';
    this.ref = this.afStorage.ref(path);
    this.task = this.afStorage.upload(path, this.file);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize(async () => {
        this.downloadURL = await this.ref.getDownloadURL().toPromise();
        this.afs.collection('files').add( { downloadURL: this.downloadURL,path });
      })
    );
  }
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}

