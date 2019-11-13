import { Component, OnInit } from '@angular/core';
import { DemandAdService } from '../demand-ad.service';
import { User } from 'src/app/shared/models/user';
import { DemandAd } from 'src/app/shared/models/demand-ad';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-list-demand-ad',
  templateUrl: './list-demand-ad.component.html',
  styleUrls: ['./list-demand-ad.component.scss']
})
export class ListDemandAdComponent implements OnInit {
  subscriptions: Subscription[] = [];
  user: User = JSON.parse(localStorage.getItem('user'));
  demandAdList: DemandAd[];

  constructor(private demandAdsevice: DemandAdService) { }

  ngOnInit() {
    this.demandAdsevice.getdemandAds(this.user.uid).subscribe(res=>{
      this.demandAdList = res;
    })
  }

}
