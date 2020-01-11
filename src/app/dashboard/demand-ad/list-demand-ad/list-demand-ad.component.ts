import { Component, OnInit } from '@angular/core';
import { DemandAdService } from '../demand-ad.service';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-demand-ad',
  templateUrl: './list-demand-ad.component.html',
  styleUrls: ['./list-demand-ad.component.scss']
})
export class ListDemandAdComponent implements OnInit {
  subscriptions: Subscription[] = [];
  user: User = JSON.parse(localStorage.getItem('user'));
  demandAdList = [];
  constructor(
    private demandAdsevice: DemandAdService,
    private afs: AngularFirestore,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.demandAdsevice.getdemandAds(this.user.uid).subscribe(res => {
      this.demandAdList = res;
    });
  }
  deleteAd(id: string) {
    if (confirm('Are you sure to delete this AD?')) {
      this.afs.doc('demandAd/' + id).delete();
      this.toastr.warning('Ad was removed successfully');
    }
  }
}
