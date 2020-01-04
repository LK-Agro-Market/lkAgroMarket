import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
// import { ChatService } from './chat.service';
import { Observable, from } from 'rxjs';
import { UserDetails } from 'src/app/shared/models/user-details';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private afs: AngularFirestore) { }
  getUserDetails(ownerId): Observable<UserDetails> {
    return this.afs
      .collection('userDetails')
      .doc(ownerId)
      .valueChanges()
      .pipe(map(res => res as UserDetails));
  }
}
