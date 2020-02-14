import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';
import { UserDetails } from '../../shared/models/user-details';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone
  ) { }
  
  getUserDetails(userId): Observable<UserDetails> {
    return this.afs
      .collection('userDetails')
      .doc(userId)
      .valueChanges()
      .pipe(map(res => res as UserDetails));
  }
}