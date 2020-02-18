import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

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
        path: 'profile/:profileOwner',
        loadChildren: () =>
          import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'farmer-dashboard',
        loadChildren: () =>
          import('./supply-ad/supply-ad.module').then(m => m.SupplyAdModule)
      },
      {
        path: 'view-supply-ad/:supplyAdId',
        loadChildren: () =>
          import('./view-supply-ad/view-supply-ad.module').then(
            m => m.ViewSupplyAdModule
          )
      },
      {
        path: 'search-supply-ads',
        loadChildren: () =>
          import('./search-supply-ads/search-supply-ads.module').then(
            m => m.SearchSupplyAdsModule
          )
      },
      {
        path: 'chats',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
      },
      {
        path: 'forum',
        loadChildren: () =>
          import('./forum/forum.module').then(m => m.ForumModule)
      },
      {
        path: 'buyer-dashboard',
        loadChildren: () =>
          import('./demand-ad/demand-ad.module').then(m => m.DemandAdModule)
      },
      {
        path: 'view-demand-ad/:demandAdid',
        loadChildren: () =>
          import('./view-demand-ad/view-demand-ad.module').then(
            m => m.ViewDemandAdModule
          )
      },
      {
        path: 'admin-panel',
        loadChildren: () =>
          import('./admin-panel/admin-panel.module').then(
            m => m.AdminPanelModule
          )
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./notification/notification.module').then(
            m => m.NotificationModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
