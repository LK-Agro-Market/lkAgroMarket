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
import { NotificationService } from 'src/app/shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ViewSupplyAdService {
  constructor(private afs: AngularFirestore, private notificationService: NotificationService) {}

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

  createComment(content: string, ad: SupplyAd, user: User): Observable<void> {
    const commentId: string = this.afs.createId();
    const currentUser: User = {
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
      email: user.email
    }
    const comment: SupplyAdComment = {
      commentId: commentId,
      supplyAdId: ad.id,
      user: currentUser,
      content: content,
      createdAt: new Date().toISOString()
    };
    const docRef: AngularFirestoreDocument<SupplyAdComment> = this.afs
      .collection('supplyAdComment')
      .doc(commentId);

    this.notificationService.createNotification(`${currentUser.displayName} commented on your advertisment`, `view-supply-ad/${ad.id}`, ad.owner, currentUser);
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
    ad: SupplyAd,
    buyer: User,
    agreementDate: string,
    agreementPrice: number
  ): Observable<void> {
    const agreementId: string = this.afs.createId();
    const currentUser: User = {
      displayName: buyer.displayName,
      uid: buyer.uid,
      photoURL: buyer.photoURL,
      email: buyer.email
    }
    const pendingAgreement: Agreement = {
      agreementId: agreementId,
      ad: ad,
      buyer: currentUser,
      agreementDate: agreementDate,
      agreementPrice: agreementPrice,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    this.notificationService.createNotification(`${currentUser.displayName} commented on your advertisment`, `view-supply-ad/${ad.id}`, ad.owner, currentUser);
    const docRef: AngularFirestoreDocument<Agreement> = this.afs
      .collection('agreements')
      .doc(agreementId);
    return from(docRef.set(pendingAgreement));
  }

  getPendingAgreements(adId: string): Observable<Agreement[]> {
    return this.afs
      .collection<Agreement>('agreements', ref =>
        ref
          .where('ad.id', '==', adId)
          .where('status', '==', 'Pending')
          .orderBy('createdAt', 'asc')
      )
      .valueChanges();
  }

  getApprovedAgreement(adId: string): Observable<Agreement> {
    return this.afs
      .collection<Agreement>('agreements', ref =>
        ref.where('ad.id', '==', adId).where('status', '==', 'Approved')
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

  approveAgreement(agreementId: string, adId: string, buyerId:string, farmer: User): Observable<void> {
    const currentUser: User = {
      displayName: farmer.displayName,
      uid: farmer.uid,
      photoURL: farmer.photoURL,
      email: farmer.email
    }
    this.notificationService.createNotification(`${currentUser.displayName} commented on your advertisment`, `view-supply-ad/${adId}`, buyerId, currentUser);
    return from(
      this.afs
        .collection('supplyAd')
        .doc(adId)
        .update({ status: 'sold' })
        .then(() => {
          this.afs
            .collection('agreements')
            .doc(agreementId)
            .update({ status: 'Approved' });
        })
    );
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
