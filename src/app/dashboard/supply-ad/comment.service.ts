import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { SupplyAdComment } from 'src/app/shared/models/supply-ad-comment';
import { User } from 'src/app/shared/models/user';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private afs: AngularFirestore) {}

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
