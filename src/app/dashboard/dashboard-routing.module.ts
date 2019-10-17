import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
<<<<<<< HEAD
import { FarmerComponent } from './farmer/farmer.component';
import { ChatComponent } from './chat/chat.component';
=======
import { SupplyAdComponent } from './supply-ad/supply-ad.component';
>>>>>>> ab353352c7f74b7d7f53b250f5fc1d0cb4553119

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'farmer-dashboard',
        pathMatch: 'full'
      },
      {
        path: 'farmer-dashboard',
<<<<<<< HEAD
        component: FarmerComponent
      },
      {
        path: 'chat-dashboard',
        component: ChatComponent
=======
        component: SupplyAdComponent
>>>>>>> ab353352c7f74b7d7f53b250f5fc1d0cb4553119
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
