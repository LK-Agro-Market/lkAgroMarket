import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { SupplyAdComment } from 'src/app/shared/models/supply-ad-comment';
import { SupplyAd } from 'src/app/shared/models/supply-ad';
import { User } from 'src/app/shared/models/user';

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

  viewAd(adId: string, currentViews: number): Observable<void> {
    return from(
      this.afs
        .collection('supplyAd')
        .doc(adId)
        .update({ views: currentViews + 1 })
    );
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
      user: user,
      content: content,
      createdAt: new Date().toISOString()
    };
    const docRef: AngularFirestoreDocument<
      SupplyAdComment
    > = this.afs.collection('supplyAdComment').doc(commentId);
    return from(docRef.set(comment));
  }

  getComments(adId: string): Observable<SupplyAdComment[]> {
    return this.afs
      .collection<SupplyAdComment>('supplyAdComment', ref =>
        ref.where('supplyAdId', '==', adId)
      )
      .valueChanges();
  }
}
