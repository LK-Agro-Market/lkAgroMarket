import { Component, OnInit, OnDestroy } from '@angular/core';
import { SupplyAdService } from '../supply-ad.service';
import { Subscription } from 'rxjs';
import { SupplyAd } from 'src/app/shared/models/supply-ad';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-list-supply-ads',
  templateUrl: './list-supply-ads.component.html',
  styleUrls: ['./list-supply-ads.component.scss']
})
export class ListSupplyAdsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  user: User = JSON.parse(localStorage.getItem('user'));
  activeSupplyAdList: SupplyAd[];

  constructor(private supplyAdService: SupplyAdService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.supplyAdService.getAds(this.user.uid, 'active').subscribe(res => {
        this.activeSupplyAdList = res;
      })
    );
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
