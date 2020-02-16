import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SupplyAd } from 'src/app/shared/models/supply-ad';
import { Agreement } from 'src/app/shared/models/agreement';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class SearchSupplyAdsService {
  constructor(private afs: AngularFirestore) {}

  getActiveAds(): Observable<SupplyAd[]> {
    return this.afs
      .collection<SupplyAd>('supplyAd', ref =>
        ref.where('status', '==', 'active').orderBy('createdAt', 'desc')
      )
      .valueChanges();
  }

  getAgreements(buyer: User): Observable<Agreement[]> {
    console.log(buyer.uid);
    return this.afs.collection<Agreement>('agreements', ref => ref.where('buyer.uid','==',buyer.uid)).valueChanges();
  }
}
