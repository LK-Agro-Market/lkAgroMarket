import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { SupplyAdService } from '../../supply-ad/supply-ad.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  profileOwnerId: string;
  profileOwnerUser: User;
  viewer: User = JSON.parse(localStorage.getItem('user'));

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  doughnutChartLabels: Label[] = ['Sold', 'Currently Active', 'Deleted'];
  doughnutChartData: MultiDataSet = [[0, 0, 0]];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors: Color[] = [
    {
      backgroundColor: ['green', 'yellow', 'red']
    }
  ];

  barChartLabels: Label[] = [''];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [{ data: [0], label: 'No. Of Ads' }];
  public barChartColors: Color[] = [{ backgroundColor: 'chartreuse' }];

  lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0], label: 'No. of ratings' },
  ];
  lineChartLabels: Label[] = ['1', '2', '3', '4', '5'];
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'gold',
    }
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';

  constructor(private supplyAdService: SupplyAdService, private profileService: ProfileService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscriptions.push(
      this.route.params.subscribe(routeParams => {
        if (routeParams.profileOwner === 'myProfile') {
          this.profileOwnerId = this.viewer.uid;
        } else {
          this.profileOwnerId = routeParams.profileOwner;
        }
        this.profileService
          .getProfileOwner(this.profileOwnerId)
          .subscribe(user => {
            this.profileOwnerUser = user;
            this.subscriptions.push(
              this.supplyAdService.getAds(this.profileOwnerUser.uid).subscribe(res => {
                const soldAdCount = res.filter(ad => ad.status === 'sold').length;
                const activeAdCount = res.filter(ad => ad.status === 'active').length;
                const deletedAdCount = res.filter(ad => ad.status === 'deleted')
                  .length;
                this.doughnutChartData = [[soldAdCount, activeAdCount, deletedAdCount]];
        
                const dic: Object = {};
                res.forEach(ad => {
                  if (ad.food in dic) {
                    dic[ad.food] = dic[ad.food] + 1;
                  } else {
                    dic[ad.food] = 1;
                  }
                });
                this.barChartLabels = Object.keys(dic);
                this.barChartData[0].data = Object.values(dic);
        
                const soldAds = res.filter(ad => ad.status === 'sold');
                const rate1 = soldAds.filter(ad => ad.rating === 1).length;
                const rate2 = soldAds.filter(ad => ad.rating === 2).length;
                const rate3 = soldAds.filter(ad => ad.rating === 3).length;
                const rate4 = soldAds.filter(ad => ad.rating === 4).length;
                const rate5 = soldAds.filter(ad => ad.rating === 5).length;
                this.lineChartData[0].data = [rate1, rate2, rate3, rate4, rate5];
              })
            );
          });
      }));
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
