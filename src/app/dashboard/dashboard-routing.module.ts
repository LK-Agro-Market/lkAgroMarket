import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { FarmerComponent } from './farmer/farmer.component';
import { ChatComponent } from './chat/chat.component';
import { ChatroomComponent } from './chatroom/chatroom.component';

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
        component: FarmerComponent
      },
      {
        path: 'chat-dashboard',
        component: ChatComponent
      },
      {
        path: 'chatroom-dashboard',
        component: ChatroomComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
