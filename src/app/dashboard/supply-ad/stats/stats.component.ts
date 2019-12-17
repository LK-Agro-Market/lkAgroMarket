import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { SupplyAdService } from '../supply-ad.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  subscriptions: Subscription[] = [];
  user: User = JSON.parse(localStorage.getItem('user'));
  
  doughnutChartLabels: Label[] = ['Sold', 'Currently Active', 'Deleted'];
  doughnutChartData: MultiDataSet = [[0,0,0]];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors: Color[] = [
    {
      backgroundColor: ['green', 'yellow', 'red']
    }
  ];

  constructor(private supplyAdService:SupplyAdService) {}

  ngOnInit() {
    this.supplyAdService.getAds(this.user.uid).subscribe(res => {
      const soldAdCount = res.filter(res => res.status === 'sold').length;
      const activeAdCount = res.filter(res => res.status === 'active').length;
      const deletedAdCount = res.filter(res => res.status === 'deleted').length;
      this.doughnutChartData = [[soldAdCount, activeAdCount, deletedAdCount]]
    });
  }
}
