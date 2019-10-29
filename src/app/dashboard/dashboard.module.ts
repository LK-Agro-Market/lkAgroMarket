import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbThemeModule,
  NbLayoutModule,
  NbTooltipModule,
  NbIconModule,
  NbSidebarModule,
  NbCardModule,
  NbSpinnerModule,
  NbButtonModule,
  NbSelectModule,
  NbInputModule,
  NbAccordionModule,
  NbUserModule,
  NbAlertModule,
  NbBadgeModule,
  NbCheckboxModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { environment } from '../../environments/environment';

import { LayoutComponent } from './layout/layout.component';
import { SupplyAdComponent } from './supply-ad/supply-ad.component';
import { CreateSupplyAdComponent } from './supply-ad/create-supply-ad/create-supply-ad.component';
import { ForumComponent } from './forum/forum.component';
import { ListForumComponent } from './forum/list-forum/list-forum.component';
import { ListCardComponent } from './forum/list-forum/list-card/list-card.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SupplyAdComponent,
    CreateSupplyAdComponent,
    ForumComponent,
    ListForumComponent,
    ListCardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbEvaIconsModule,
    NbIconModule,
    NbTooltipModule,
    NbCardModule,
    NbSpinnerModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    NbAccordionModule,
    NbUserModule,
    NbIconModule,
    NbAlertModule,
    NbBadgeModule,
    NbEvaIconsModule,
    NbCheckboxModule
  ]
})
export class DashboardModule {}
