import { Injectable } from '@angular/core';
import { UserDetails } from '../../shared/models/user-details';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {
  constructor(public afs: AngularFirestore) {}

  getUserDetails(userId): Observable<UserDetails> {
    return this.afs
      .collection('userDetails')
      .doc(userId)
      .valueChanges()
      .pipe(map(res => res as UserDetails));
  }
}
