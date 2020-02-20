import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { Comment } from 'src/app/shared/models/comment-ad';
import { ActivatedRoute } from '@angular/router';
import { Reply } from 'src/app/shared/models/reply-comment-ad';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private afs: AngularFirestore, private route: ActivatedRoute) {}

  getadId() {
    let id = this.route.snapshot.paramMap.get('demandAdid');
    return id;
  }

  add<T>(data:Comment){
    const docid = this.afs.createId();
    const commentData = {
      adId: data.adId,
      userName: data.userName,
      date: new Date().toISOString(),
      content: data.content,
      docId: docid
      //updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      // createdAt: new Date().toISOString
    };
    const bcmt :  AngularFirestoreCollection<Comment> = this.afs.collection('bcomments');
   // return this.afs.doc('bcomments/' + docid).set(commentData);
   return from(bcmt.doc(docid).set(commentData));
  }

  delete(ref: any) {
    this.afs.doc('bcomments/' + ref).delete();
  }

  getcomments(adId: string):Observable<Comment[]> {
    return this.afs
      .collection<Comment>('bcomments', ref =>
        ref.where('adId', '==', adId).orderBy('date', 'asc')
      )
      .valueChanges()
      //.pipe(map(ref => ref as Comment[]));
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  addreplycmt<T>(data): Promise<void> {
    const docid = this.afs.createId();
    const commentData = {
      docId: docid,
      userName: data.userName,
      date: new Date().toISOString(),
      content: data.content,
      paraentdocId: data.paraentdocId
      //updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      // createdAt: new Date().toISOString
    };
    return this.afs.doc('replycomment/' + docid).set(commentData);
  }

  getreplycomments(docId: string) {
    return this.afs
      .collection('replycomment', ref =>
        ref.where('paraentdocId', '==', docId).orderBy('date', 'asc')
      )
      .valueChanges()
      .pipe(map(ref => ref as Reply[]));
  }
  deleteReplay(ref: any) {
    this.afs.doc('replycomment/' + ref).delete();
  }
}
