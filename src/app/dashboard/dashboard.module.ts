import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {
  NbThemeModule,
  NbSidebarModule,
  NbUserModule,
  NbLayoutModule,
  NbIconModule,
  NbTooltipModule,
  NbButtonModule,
  NbContextMenuModule,
  NbBadgeComponent,
  NbBadgeModule
} from '@nebular/theme';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { environment } from '../../environments/environment';
import { LayoutComponent } from './layout/layout.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(),
    NbUserModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbTooltipModule,
    NbButtonModule,
    NbContextMenuModule,
    NbBadgeModule,
    SharedModule
  ],
  providers: []
})
export class DashboardModule {}
