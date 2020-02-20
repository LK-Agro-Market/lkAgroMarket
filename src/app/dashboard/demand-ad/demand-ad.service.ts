import { Injectable } from '@angular/core';
//import { AngularFireStorage } from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { DemandAd } from 'src/app/shared/models/demand-ad';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { UserDetails } from 'src/app/shared/models/user-details';
import { buyerAgreement } from 'src/app/shared/models/buyer-agreement';


@Injectable({
  providedIn: 'root'
})
export class DemandAdService {
  constructor(
    // private afStorage: AngularFireStorage,
    private afs: AngularFirestore
  ) {}

  buyerAdform = new FormGroup({
    id: new FormControl(null),
    foodtype: new FormControl('', Validators.required),
    food: new FormControl('', Validators.required),
    expectedamount: new FormControl('1', Validators.required),
    unit: new FormControl('', Validators.required),
    priceperunit: new FormControl('50', Validators.required),
    description: new FormControl('', Validators.required),
    organic: new FormControl('', Validators.required),
    deadline: new FormControl(
      new Date().toISOString().split('T')[0],
      Validators.required
    )
  });

  getdemandAdid() {
    return this.afs.createId();
  }
  createBuyerad(demandAd: DemandAd) {
    const demandAdCollection: AngularFirestoreCollection<DemandAd> = this.afs.collection(
      'demandAd'
    );
    return from(demandAdCollection.doc(demandAd.id).set(demandAd));
  }
  getdemandAds(userID: string): Observable<DemandAd[]> {
    return this.afs
      .collection<DemandAd>('demandAd', ref => ref.where('owner', '==', userID))
      .valueChanges()
     // .pipe(map(res => res as DemandAd[]));
  }

  getdemandad(adId: string): Observable<DemandAd> {
    return this.afs
      .collection('demandAd')
      .doc<DemandAd>(adId)
      .valueChanges();
  }

  editAd(property) {
    this.buyerAdform.setValue({
      id: property.id,
      foodtype: property.foodtype,
      food: property.food,
      expectedamount: property.expectedamount,
      unit: property.unit,
      priceperunit: property.priceperunit,
      description: property.description,
      organic: property.organic,
      deadline: property.deadline
    });
  }

  defaultAd() {
    this.buyerAdform.setValue({
      id: null,
      foodtype: '',
      food: '',
      expectedamount: '50',
      unit: '',
      priceperunit: 50,
      description: '',
      organic: '',
      deadline: ''
    });
  }
  getalldemandAds(): Observable<DemandAd[]> {
    return this.afs
      .collection<DemandAd>('demandAd')
      .valueChanges();
    }

  countViws(adId: string) {
    this.afs
      .collection('demandAd')
      .doc(adId)
      .get()
      .pipe(
        map(res => res.data()),
        map(data => data as DemandAd)
      )
      .subscribe(res => {
        const count = res.views + 1;
        this.afs
          .collection('demandAd')
          .doc(adId)
          .update({ views: count });
      });
  }
  getUser(ownerId: string): Observable<User> {
    return this.afs
      .collection('users')
      .doc<User>(ownerId)
      .valueChanges();
  }

  userDetails(ownerId:string): Observable<UserDetails>{
     return this.afs
     .collection('userDetails')
     .doc<UserDetails>(ownerId)
     .valueChanges()
  }

createagreement(ad:DemandAd,farmer:User,date:string){
  const agreementId=this.getdemandAdid();
  const customer:User={
    uid: farmer.uid,
    email: farmer.email,
    displayName: farmer.displayName,
    photoURL: farmer.photoURL
                      }
  const pendingAgreement:buyerAgreement={
    agreementId: agreementId,
    farmer: customer,
    ad: ad,
    status: 'pending',
    agreementDate: date,
    createdAt: new Date().toISOString()
                                        }
    const docref:AngularFirestoreDocument<buyerAgreement> = this.afs
    .collection('buyerAgreement')
    .doc(agreementId);
  return from(docref.set(pendingAgreement));
}

getPendingDemandads(adId:string):Observable<buyerAgreement[]>{
  return this.afs.collection<buyerAgreement>('buyerAgreement',ref=>ref
    .where('ad.id','==',adId)
    .where('status','==','pending')
    .orderBy('createdAt', 'asc'))
    .valueChanges()
  }

  deletePendingad(agreementId:string):Observable<void>{
    return from(
    this.afs.collection('buyerAgreement').doc(agreementId).delete());
  }

}
