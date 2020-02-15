import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { SupplyAdComment } from 'src/app/shared/models/supply-ad-comment';
import { SupplyAd } from 'src/app/shared/models/supply-ad';
import { User } from 'src/app/shared/models/user';
import { Agreement } from 'src/app/shared/models/agreement';
import { map, first, concatAll } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewSupplyAdService {
  constructor(private afs: AngularFirestore) {}

  getAd(adId: string): Observable<SupplyAd> {
    return this.afs
      .collection('supplyAd')
      .doc<SupplyAd>(adId)
      .valueChanges();
  }

  getAdOwner(ownerId: string): Observable<User> {
    return this.afs
      .collection('users')
      .doc<User>(ownerId)
      .valueChanges();
  }

  increaseViewCount(adId: string) {
    this.afs
      .collection('supplyAd')
      .doc(adId)
      .get()
      .pipe(
        map(res => res.data()),
        map(data => data as SupplyAd)
      )
      .subscribe(res => {
        const newViews = res.views + 1;
        this.afs
          .collection('supplyAd')
          .doc(adId)
          .update({ views: newViews });
      });
  }

  changeStatus(adId: string, status: string): Observable<void> {
    return from(
      this.afs
        .collection('supplyAd')
        .doc(adId)
        .update({ status: status })
    );
  }

  updateAd(adId: string, supplyAd: Partial<SupplyAd>): Observable<void> {
    const docRef: AngularFirestoreDocument<SupplyAd> = this.afs
      .collection('supplyAd')
      .doc(adId);
    return from(docRef.update(supplyAd));
  }

  createComment(content: string, adId: string, user: User): Observable<void> {
    const commentId: string = this.afs.createId();
    const comment: SupplyAdComment = {
      commentId: commentId,
      supplyAdId: adId,
      user: {
        displayName: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
        email: user.email
      },
      content: content,
      createdAt: new Date().toISOString()
    };
    const docRef: AngularFirestoreDocument<SupplyAdComment> = this.afs
      .collection('supplyAdComment')
      .doc(commentId);
    return from(docRef.set(comment));
  }

  getComments(adId: string): Observable<SupplyAdComment[]> {
    return this.afs
      .collection<SupplyAdComment>('supplyAdComment', ref =>
        ref.where('supplyAdId', '==', adId)
      )
      .valueChanges();
  }

  createPendingAgreement(
    adId: string,
    buyer: User,
    agreementDate: string
  ): Observable<void> {
    const agreementId: string = this.afs.createId();
    const pendingAgreement: Agreement = {
      agreementId: agreementId,
      adId: adId,
      buyer: {
        displayName: buyer.displayName,
        uid: buyer.uid,
        photoURL: buyer.photoURL,
        email: buyer.email
      },
      agreementDate: agreementDate,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    const docRef: AngularFirestoreDocument<Agreement> = this.afs
      .collection('agreements')
      .doc(agreementId);
    return from(docRef.set(pendingAgreement));
  }

  getPendingAgreements(adId: string): Observable<Agreement[]> {
    return this.afs
      .collection<Agreement>('agreements', ref =>
        ref
          .where('adId', '==', adId)
          .where('status', '==', 'Pending')
          .orderBy('createdAt', 'asc')
      )
      .valueChanges();
  }

  getApprovedAgreements(adId: string): Observable<Agreement> {
    return this.afs
      .collection<Agreement>('agreements', ref =>
        ref.where('adId', '==', adId).where('status', '==', 'Approved')
      )
      .valueChanges()
      .pipe(concatAll(), first());
  }

  deletePendingAgreement(agreementId: string): Observable<void> {
    return from(
      this.afs
        .collection('agreements')
        .doc(agreementId)
        .delete()
    );
  }

  approveAgreement(agreementId: string): Observable<void> {
    return new Observable(() => {
      this.afs
        .collection('supplyAd')
        .doc()
        .update({ status: 'sold' });
      this.afs
        .collection('agreements')
        .doc(agreementId)
        .update({ status: 'Approved' });
    });
  }

  rateUser(adId: string, rate: number): Observable<void> {
    return from(
      this.afs
        .collection('supplyAd')
        .doc(adId)
        .update({ rating: rate })
    );
  }
}
