import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { Observable, from } from 'rxjs';
import { UserDetails } from 'src/app/shared/models/user-details';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private afs: AngularFirestore) {}

  getProfileOwner(ownerId: string): Observable<User> {
    return this.afs
      .collection('users')
      .doc(ownerId)
      .valueChanges()
      .pipe(map(res => res as User));
  }

  getProfileOwnerUserDetails(ownerId): Observable<UserDetails> {
    return this.afs
      .collection('userDetails')
      .doc(ownerId)
      .valueChanges()
      .pipe(map(res => res as UserDetails));
  }

  updateProfile(
    userDetails: Partial<UserDetails>,
    ownerId: string
  ): Observable<void> {
    const userRef = this.afs.collection('userDetails').doc(ownerId);
    return from(userRef.update(userDetails));
  }
}
