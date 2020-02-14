import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemandAdComponent } from './demand-ad.component';
import { ShowallDemandAdComponent } from './showall-demand-ad/showall-demand-ad.component';

const routes: Routes = [
  {
    path: '',
    component: DemandAdComponent
  },
  {
  path: 'all-demand-ads',
    component: ShowallDemandAdComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandAdRoutingModule {}
