import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { ChatComponent } from './chat/chat.component';
import { SupplyAdComponent } from './supply-ad/supply-ad.component';
import { ProfileComponent } from './profile/profile.component';
import { ForumComponent } from './forum/forum.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
