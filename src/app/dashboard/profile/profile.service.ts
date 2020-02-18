import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { Observable, from } from 'rxjs';
import { UserDetails } from 'src/app/shared/models/user-details';
import { Follower } from 'src/app/shared/models/follower';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private afs: AngularFirestore,
    private notificationService: NotificationService
  ) {}

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

  followUser(profileOwnerUser: User, viewer: User): Observable<void> {
    const followerRef = this.afs
      .collection('followers')
      .doc(viewer.uid + profileOwnerUser.uid);

    this.notificationService.createNotification(
      `${viewer.displayName} followed you`,
      `profile/${profileOwnerUser.uid}`,
      profileOwnerUser.uid,
      viewer
    );
    return from(
      followerRef.set({
        follower: viewer.uid,
        following: profileOwnerUser
      })
    );
  }

  unfollowUser(profileOwnerUser: User, viewerId: string): Observable<void> {
    const followerRef = this.afs
      .collection('followers')
      .doc(viewerId + profileOwnerUser.uid);
    return from(followerRef.delete());
  }

  getFollowers(profileOwnerUser: User): Observable<Follower[]> {
    return this.afs
      .collection('followers', ref =>
        ref.where('following', '==', profileOwnerUser)
      )
      .valueChanges()
      .pipe(map(follower => follower as Follower[]));
  }
}
