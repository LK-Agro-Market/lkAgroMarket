import { Component, OnInit, OnDestroy } from '@angular/core';
import { SupplyAdService } from '../supply-ad.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { SupplyAd } from 'src/app/shared/models/supply-ad';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-supply-ads',
  templateUrl: './list-supply-ads.component.html',
  styleUrls: ['./list-supply-ads.component.scss']
})
export class ListSupplyAdsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  user: User = JSON.parse(localStorage.getItem('user'));

  farmersAdCategories: Array<string>;
  allActiveSupplyAdList: SupplyAd[];
  allSoldSupplyAdList: SupplyAd[];
  allDeletedSupplyAdList: SupplyAd[];
  filteredActiveSupplyAdList: SupplyAd[];
  filteredSoldSupplyAdList: SupplyAd[];
  filteredDeletedSupplyAdList: SupplyAd[];

  processing = false;

  constructor(
    private supplyAdService: SupplyAdService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.supplyAdService.getAds(this.user.uid).subscribe(res => {
        this.farmersAdCategories = [...new Set(res.map(ad => ad.food))];

        this.allActiveSupplyAdList = res.filter(res => res.status === 'active');
        this.allSoldSupplyAdList = res.filter(res => res.status === 'sold');
        this.allDeletedSupplyAdList = res.filter(
          res => res.status === 'deleted'
        );

        this.filteredActiveSupplyAdList = this.allActiveSupplyAdList;
        this.filteredSoldSupplyAdList = this.allSoldSupplyAdList;
        this.filteredDeletedSupplyAdList = this.allDeletedSupplyAdList;
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

  onFilterActiveAds($event: string[]) {
    if ($event.length) {
      this.filteredActiveSupplyAdList = this.allActiveSupplyAdList.filter(ad =>
        $event.includes(ad.food)
      );
    } else {
      this.filteredActiveSupplyAdList = this.allActiveSupplyAdList;
    }
  }

  onFilterSoldAds($event: string[]) {
    if ($event.length) {
      this.filteredSoldSupplyAdList = this.allSoldSupplyAdList.filter(ad =>
        $event.includes(ad.food)
      );
    } else {
      this.filteredSoldSupplyAdList = this.allSoldSupplyAdList;
    }
  }

  onFilterDeletedAds($event: string[]) {
    if ($event.length) {
      this.filteredDeletedSupplyAdList = this.allDeletedSupplyAdList.filter(
        ad => $event.includes(ad.food)
      );
    } else {
      this.filteredDeletedSupplyAdList = this.allDeletedSupplyAdList;
    }
  }
}
