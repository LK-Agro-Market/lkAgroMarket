import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SupplyAd } from 'src/app/shared/models/supply-ad';
import { SearchSupplyAdsService } from './search-supply-ads.service';

@Component({
  selector: 'app-search-supply-ads',
  templateUrl: './search-supply-ads.component.html',
  styleUrls: ['./search-supply-ads.component.scss']
})
export class SearchSupplyAdsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  currentTime = new Date().toISOString().split('T')[0];

  allSupplyAds: SupplyAd[];
  filteredSupplyAds: SupplyAd[];

  constructor(private searchSupplyAdsService: SearchSupplyAdsService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.searchSupplyAdsService.getActiveAds().subscribe(ads => {
        this.allSupplyAds = ads;
        this.filteredSupplyAds = ads;
      })
    );
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  onFilterAds($event: string[]) {
    if ($event.length) {
      this.filteredSupplyAds= this.allSupplyAds.filter(ad =>
        $event.includes(ad.food)
      );
    } else {
      this.filteredSupplyAds = this.allSupplyAds;
    }
  }
}
