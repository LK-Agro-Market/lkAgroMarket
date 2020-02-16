import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { UserDetails } from '../../shared/models/user-details';
import { AdminPanelService } from './admin-panel.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  farmerC: Observable<any[]>;
  buyerC: Observable<any[]>;
  adminC: Observable<any[]>;
  user = JSON.parse(localStorage.getItem('user'));
  userDetails: UserDetails;
  users: Observable<any[]>;
  demAdd: Observable<any[]>;
  suppAdd: Observable<any[]>;

  constructor(
    public afs: AngularFirestore,
    private adminPanelService: AdminPanelService,
    private toastr: ToastrService
  ) {
    this.users = afs
      .collection('users', ref => ref.orderBy('displayName'))
      .valueChanges({ idField: 'id' });
    this.farmerC = this.afs
      .collection('userDetails', ref => ref.where('userLevel', '==', 'Farmer'))
      .valueChanges({ idField: 'id' });
    this.buyerC = this.afs
      .collection('userDetails', ref => ref.where('userLevel', '==', 'Buyer'))
      .valueChanges({ idField: 'id' });
    this.adminC = this.afs
      .collection('userDetails', ref =>
        ref.where('userLevel', '==', 'Administrator')
      )
      .valueChanges({ idField: 'id' });

    this.suppAdd = this.afs.collection('supplyAd').valueChanges();
    this.demAdd = this.afs.collection('demandAd').valueChanges();
  }

  ngOnInit() {
    this.adminPanelService
      .getUserDetails(this.user.uid)
      .subscribe(userDetails => {
        this.userDetails = userDetails;
      });
  }
  deleteUser(uId) {
    if (confirm('Are you sure to delete this User?')) {
      this.afs.doc('users/' + uId).delete();
      this.afs.doc('userDetails/' + uId).delete();
      this.toastr.warning('User was removed successfully');
    }
  }
}
