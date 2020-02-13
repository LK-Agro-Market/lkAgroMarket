import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewDemandAdComponent } from './view-demand-ad.component';


const routes: Routes = [
  {
    path: '',
    component: ViewDemandAdComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewDemandAdRoutingModule { }
