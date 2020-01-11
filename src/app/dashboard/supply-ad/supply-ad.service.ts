import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { forkJoin, Observable, from } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

import { User } from '../../shared/models/user';
import { SupplyAd } from 'src/app/shared/models/supply-ad';

@Injectable({
  providedIn: 'root'
})
export class SupplyAdService {
  constructor(
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore
  ) {}

  getAdId() {
    return this.afs.createId();
  }

  uploadImg(image: string, name: string, adId: string): Observable<string> {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const filePath = user.uid + '/ads/' + adId + '/' + name;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, image);
    return forkJoin(task.snapshotChanges()).pipe(
      mergeMap(() => fileRef.getDownloadURL()),
      map(url => url as string)
    );
  }

  createAd(supplyAd: SupplyAd) {
    const supplyAdCollection: AngularFirestoreCollection<
      SupplyAd
    > = this.afs.collection('supplyAd');
    return from(supplyAdCollection.doc(supplyAd.id).set(supplyAd));
  }

  getAds(userId: string): Observable<SupplyAd[]> {
    return this.afs
      .collection<SupplyAd>('supplyAd', ref => ref.where('owner', '==', userId))
      .valueChanges();
  }

  getAd(adId): Observable<SupplyAd> {
    return this.afs
      .collection('supplyAd')
      .doc<SupplyAd>(adId)
      .valueChanges();
  }

  changeStatus(adId: string, status: string): Observable<void> {
    return from(
      this.afs
        .collection('supplyAd')
        .doc(adId)
        .update({ status: status })
    );
  }
}
