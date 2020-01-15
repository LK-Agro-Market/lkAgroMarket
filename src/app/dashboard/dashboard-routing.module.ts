import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { ChatComponent } from './chat/chat.component';
import { SupplyAdComponent } from './supply-ad/supply-ad.component';
import { ProfileComponent } from './profile/profile.component';
import { ForumComponent } from './forum/forum.component';
import { DemandAdComponent } from './demand-ad/demand-ad.component';
import { ViewSupplyAdComponent } from './supply-ad/view-supply-ad/view-supply-ad.component';
import { ViewDemandAdComponent } from './demand-ad/view-demand-ad/view-demand-ad.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: `profile/myProfile`,
        pathMatch: 'full'
      },
      {
        path: 'farmer-dashboard',
        component: SupplyAdComponent
      },
      {
        path: 'view-supply-ad/:supplyAdId',
        component: ViewSupplyAdComponent
      },
      {
        path: 'chats',
        component: ChatComponent
      },
      {
        path: 'profile/:profileOwner',
        component: ProfileComponent
      },
      {
        path: 'forum',
        component: ForumComponent
      },
      {
        path: 'buyer-dashboard',
        component: DemandAdComponent
      },
      {
        path:'view-demand-ad/:demandAdid',
        component : ViewDemandAdComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
