import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewSupplyAdComponent } from './view-supply-ad.component';


const routes: Routes = [
  {
    path: '',
    component: ViewSupplyAdComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewSupplyAdRoutingModule { }
