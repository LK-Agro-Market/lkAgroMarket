import { Component, OnInit, OnDestroy } from '@angular/core';
import { DemandAdService } from '../demand-ad/demand-ad.service';
import { User } from 'src/app/shared/models/user';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DemandAd } from 'src/app/shared/models/demand-ad';

@Component({
  selector: 'app-view-demand-ad',
  templateUrl: './view-demand-ad.component.html',
  styleUrls: ['./view-demand-ad.component.scss']
})
export class ViewDemandAdComponent implements OnInit, OnDestroy {
  constructor(
    private viewdemandad: DemandAdService,
    private route: ActivatedRoute
  ) {}
  demandAd:DemandAd;
  viewer: User = JSON.parse(localStorage.getItem('user'));
  subscriptions: Subscription[] = [];
  demandAdid: string;
  currentTime = new Date().toISOString().split('T')[0];
  ownerId:string;
  adowner: any;

  ngOnInit() {
    //this.subscriptions.push(
      this.route.params.subscribe(routeParams => {
        this.demandAdid = routeParams.demandAdid;})
        this.viewdemandad.countViws(this.demandAdid);
        this.viewdemandad.getdemandad(this.demandAdid).subscribe(demandAd => {
          this.demandAd = demandAd;
          this.ownerId=demandAd.owner;
          console.log(this.ownerId);
        });
    //   })
    // );
    this.viewdemandad.getUser(this.ownerId).subscribe(owner=>{
      this.adowner=owner;
    })
  }
  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
