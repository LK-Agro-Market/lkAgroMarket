import { Injectable } from '@angular/core';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SupplyAd } from 'src/app/shared/models/supply-ad';

@Injectable({
  providedIn: 'root'
})
export class SearchSupplyAdsService {
  constructor(private afs: AngularFirestore) {}

  getActiveAds(): Observable<SupplyAd[]> {
    return this.afs
      .collection<SupplyAd>('supplyAd', ref => ref.where('status', '==', 'active').orderBy('createdAt','desc'))
      .valueChanges();
  }
}
