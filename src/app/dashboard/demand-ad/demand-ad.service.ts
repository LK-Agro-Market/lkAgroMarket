import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { DemandAd } from 'src/app/shared/models/demand-ad';
import { forkJoin, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DemandAdService {
  constructor(
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore
  ) {}

  getdemandAdid() {
    return this.afs.createId();
  }
  createBuyerad(demandAd: DemandAd) {
    const demandAdCollection: AngularFirestoreCollection<
      DemandAd
    > = this.afs.collection('demandAd');
    return from(demandAdCollection.doc(demandAd.id).set(demandAd));
  }
  getdemandAds(userID): Observable<DemandAd[]> {
    return this.afs
      .collection('demandAd', ref => ref.where('owner', '==', userID))
      .valueChanges()
      .pipe(map(res => res as DemandAd[]));
  }
}
