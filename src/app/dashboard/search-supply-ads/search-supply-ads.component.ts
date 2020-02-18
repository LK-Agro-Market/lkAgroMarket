import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SupplyAd } from 'src/app/shared/models/supply-ad';
import { SearchSupplyAdsService } from './search-supply-ads.service';
import { Agreement } from 'src/app/shared/models/agreement';
import { User } from 'src/app/shared/models/user';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-search-supply-ads',
  templateUrl: './search-supply-ads.component.html',
  styleUrls: ['./search-supply-ads.component.scss']
})
export class SearchSupplyAdsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  currentTime = new Date().toISOString().split('T')[0];
  viewer: User = JSON.parse(localStorage.getItem('user'));

  allSupplyAds: SupplyAd[];
  filteredSupplyAds: SupplyAd[];

  minPrice: number = 0;
  maxPrice: number = 500;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return 'Min price: Rs.' + value;
        case LabelType.High:
          return 'Max price: Rs.' + value;
        default:
          return 'Rs.' + value;
      }
    }
  };

  pendingAgreements: Agreement[];
  approvedAgreements: Agreement[];

  foods = {
    Fruits: [
      'Apple',
      'Avocado',
      'Banana',
      'Grape',
      'Lemon',
      'Mango',
      'Orange',
      'Papaya',
      'Pineapple',
      'Strawberry',
      'Watermelon'
    ],
    Vegitable: [
      'Beans',
      'Beetroots',
      'Cabbage',
      'Carrot',
      'Cucumber',
      'Garlic',
      'Tomato',
      'Onion'
    ]
  };
  types = Object.keys(this.foods);
  relatedFoods: Array<string>;

  constructor(private searchSupplyAdsService: SearchSupplyAdsService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.searchSupplyAdsService.getActiveAds().subscribe(ads => {
        this.allSupplyAds = ads;
        this.filteredSupplyAds = ads;
      })
    );

    this.subscriptions.push(
      this.searchSupplyAdsService
        .getAgreements(this.viewer)
        .subscribe(agreements => {
          this.pendingAgreements = agreements.filter(
            agreement => agreement.status == 'Pending'
          );
          this.approvedAgreements = agreements.filter(
            agreement => agreement.status == 'Approved'
          );
        })
    );
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  retriveFoods($event: string) {
    this.relatedFoods = this.foods[$event];
  }

  onFilterAds($event: string[]) {
    if ($event.length) {
      this.filteredSupplyAds = this.allSupplyAds.filter(ad =>
        $event.includes(ad.food)
      );
    } else {
      this.filteredSupplyAds = this.allSupplyAds;
    }
    this.filteredSupplyAds = this.filteredSupplyAds.filter(
      ad => ad.pricePerUnit >= this.minPrice && ad.pricePerUnit <= this.maxPrice
    );
  }

  onFilterByPrice() {
    this.filteredSupplyAds = this.filteredSupplyAds.filter(
      ad => ad.pricePerUnit >= this.minPrice && ad.pricePerUnit <= this.maxPrice
    );
  }
}
