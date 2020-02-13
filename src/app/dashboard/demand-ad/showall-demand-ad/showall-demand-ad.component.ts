import { Component, OnInit } from '@angular/core';
import { DemandAdService } from 'src/app/dashboard/demand-ad/demand-ad.service';
import { DemandAd } from 'src/app/shared/models/demand-ad';

@Component({
  selector: 'app-showall-demand-ad',
  templateUrl: './showall-demand-ad.component.html',
  styleUrls: ['./showall-demand-ad.component.scss']
})
export class ShowallDemandAdComponent implements OnInit {
  constructor(private demandAdservice: DemandAdService) {}
  foodcatogory: Array<string>;
  allAds: DemandAd[];
  filteringAds: DemandAd[];

  ngOnInit() {
    this.demandAdservice.getalldemandAds().subscribe(actionArreay => {
      this.foodcatogory = [...new Set(actionArreay.map(ad => ad.food))];
      this.allAds = actionArreay;
      this.filteringAds = this.allAds;
      //   .map(item=>{
      //     return{
      //       id:item.payload.doc.id,
      //       ...item.payload.doc.data() as DemandAd

      //     }
      //   })
      // })
    });
  }

  onFilterAds($event: string[]) {
    if ($event.length) {
      this.filteringAds = this.allAds.filter(ad => $event.includes(ad.food));
    } else {
      this.filteringAds = this.allAds;
    }
  }
}
