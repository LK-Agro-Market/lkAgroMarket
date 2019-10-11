import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class SupplyAdService {
  constructor(
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore
  ) {}

  uploadImg(image: File) {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const filePath = user.uid + '/ads/' + this.afs.createId() + '/image1';
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, image);
    return forkJoin(task.snapshotChanges()).pipe(
      mergeMap(() => fileRef.getDownloadURL()),
      map(url => url as string)
    );
  }
}
