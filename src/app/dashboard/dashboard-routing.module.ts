import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { ChatComponent } from './chat/chat.component';
import { SupplyAdComponent } from './supply-ad/supply-ad.component';
import { ProfileComponent } from './profile/profile.component';
import { ForumComponent } from './forum/forum.component';
import { DemandAdComponent } from './demand-ad/demand-ad.component';

import { User } from '../shared/models/user';

const user: User = JSON.parse(localStorage.getItem('user'));

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: `profile/${user.uid}`,
        pathMatch: 'full'
      },
      {
        path: 'farmer-dashboard',
        component: SupplyAdComponent
      },
      {
        path: 'chat-dashboard',
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
