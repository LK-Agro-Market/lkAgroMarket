import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { SupplyAdService } from '../supply-ad.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  user: User = JSON.parse(localStorage.getItem('user'));

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

  constructor(private supplyAdService: SupplyAdService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.supplyAdService.getAds(this.user.uid).subscribe(res => {
        const soldAdCount = res.filter(res => res.status === 'sold').length;
        const activeAdCount = res.filter(res => res.status === 'active').length;
        const deletedAdCount = res.filter(res => res.status === 'deleted')
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
      })
    );
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
