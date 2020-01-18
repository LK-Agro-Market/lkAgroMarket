import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { UserDetails } from '../models/user-details';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  constructor(public afs: AngularFirestore, public router: Router) {}

  get haveUserDetails(): Observable<boolean> {
    const user: User = JSON.parse(localStorage.getItem('user'));
    return this.afs
      .collection('userDetails')
      .doc(user.uid)
      .get()
      .pipe(map(doc => doc.exists));
  }

  getUserDetails(userId): Observable<UserDetails> {
    return this.afs
      .collection('userDetails')
      .doc(userId)
      .valueChanges()
      .pipe(map(res => res as UserDetails));
  }
}
