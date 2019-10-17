import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  user: User = JSON.parse(localStorage.getItem('user'));
  constructor(
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone
  ) {}

  get haveUserDetails(): Observable<boolean> {
    return this.afs
      .collection('userDetails')
      .doc(this.user.uid)
      .get()
      .pipe(map(doc => doc.exists));
  }
}
