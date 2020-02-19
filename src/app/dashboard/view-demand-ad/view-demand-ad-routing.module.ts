import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewDemandAdComponent } from './view-demand-ad.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    component: ViewDemandAdComponent
  },
  {
    path:'agreement',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewDemandAdRoutingModule {}
