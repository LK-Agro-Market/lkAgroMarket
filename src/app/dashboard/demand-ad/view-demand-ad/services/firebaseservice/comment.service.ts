import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from '@angular/fire/firestore';

import * as firebase from 'firebase';
import { Observable, from } from 'rxjs';
import { map, take, shareReplay } from 'rxjs/operators';
import { Comment } from 'src/app/shared/models/comment-ad';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private afs: AngularFirestore,
    private route: ActivatedRoute) { }

  getadId(){
    let id = this.route.snapshot.paramMap.get('demandAdid');
    return id;
  }

  add<T>(data):Promise<void>{
    const docid = this.afs.createId();
    const commentData= {
      adId : data.adId,
      userName : data.userName,
      date: data.date, 
      content: data.content,
      docId: docid,
      docPath: data.docPath,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdAt:  firebase.firestore.FieldValue.serverTimestamp()
    }
    return this.afs.doc('bcomments/'+ docid).set(commentData)
  }

  update(ref: any, data: any){
    return this.afs.doc('bcomments/'+ref).update({
      ...data,
      updatedAt: this.timestamp,
    });
  }
 
  delete(ref: any){
    this.afs.doc('bcomments/'+ ref).delete();
  }

 getadds(adId:string){
    return this.afs.collection('bcomments', ref=>ref.where('adId','==',adId).orderBy('date','asc'))
    .valueChanges()
    .pipe(map(ref=>ref as Comment[]))
}

 get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}
