import { Component, OnInit, OnDestroy } from '@angular/core';
import { SupplyAdService } from '../supply-ad.service';
import { Subscription } from 'rxjs';
import { SupplyAd } from 'src/app/shared/models/supply-ad';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-supply-ads',
  templateUrl: './list-supply-ads.component.html',
  styleUrls: ['./list-supply-ads.component.scss']
})
export class ListSupplyAdsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  user: User = JSON.parse(localStorage.getItem('user'));
  activeSupplyAdList: SupplyAd[];
  soldSupplyAdList: SupplyAd[];
  deletedSupplyAdList: SupplyAd[];
  processing = false;

  constructor(
    private supplyAdService: SupplyAdService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.supplyAdService.getAds(this.user.uid).subscribe(res => {
        this.activeSupplyAdList = res.filter(res => res.status === 'active');
        this.soldSupplyAdList = res.filter(res => res.status === 'sold');
        this.deletedSupplyAdList = res.filter(res => res.status === 'deleted');
      })
    );
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  markAsSold(adId: string) {
    this.processing = true;
    this.subscriptions.push(
      this.supplyAdService.changeStatus(adId, 'sold').subscribe(() => {
        this.processing = false;
        this.toastr.success('Advertisment is marked as "sold"');
      })
    );
  }

  deleteAd(adId: string) {
    this.processing = true;
    this.subscriptions.push(
      this.supplyAdService.changeStatus(adId, 'deleted').subscribe(() => {
        this.processing = false;
        this.toastr.success('Advertisment is deleted');
      })
    );
  }
}
