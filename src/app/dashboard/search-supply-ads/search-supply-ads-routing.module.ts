import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchSupplyAdsComponent } from './search-supply-ads.component';

const routes: Routes = [
  {
    path: '',
    component: SearchSupplyAdsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchSupplyAdsRoutingModule {}
