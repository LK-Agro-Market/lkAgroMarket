import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SupplyAd } from 'src/app/shared/models/supply-ad';
import { SupplyAdService } from '../supply-ad.service';

@Component({
  selector: 'app-view-supply-ad',
  templateUrl: './view-supply-ad.component.html',
  styleUrls: ['./view-supply-ad.component.scss']
})
export class ViewSupplyAdComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  viewer: User = JSON.parse(localStorage.getItem('user'));
  currentTime = new Date().toISOString().split('T')[0];

  adOwnerUser: User;
  supplyAdId: string;
  supplyAd: SupplyAd;

  attempted = false;
  processing = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private supplyAdService: SupplyAdService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.route.params.subscribe(routeParams => {
        this.supplyAdId = routeParams.supplyAdId;
        this.supplyAdService.getAd(this.supplyAdId).subscribe(supplyAd => {
          this.supplyAd = supplyAd;
          console.log(supplyAd.expireDate);
          console.log(this.currentTime);
        });
      })
    );
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  deleteAd(adId: string) {
    this.processing = true;
    this.subscriptions.push(
      this.supplyAdService.changeStatus(adId, 'deleted').subscribe(() => {
        this.processing = false;
        this.toastr.success('Advertisment is deleted');
        this.router.navigate(['farmer-dashboard']);
      })
    );
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
}
