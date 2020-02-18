import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { NbCardModule, NbSpinnerModule, NbUserModule } from '@nebular/theme';


@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    NbCardModule,
    NbSpinnerModule,
    NbUserModule
  ]
})
export class NotificationModule { }
