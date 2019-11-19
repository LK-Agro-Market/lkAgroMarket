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
  NbCheckboxModule,
  NbMenuModule,
  NbListModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ImageCropperModule } from 'ngx-image-cropper';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { environment } from '../../environments/environment';

import { LayoutComponent } from './layout/layout.component';
import { SupplyAdComponent } from './supply-ad/supply-ad.component';
import { CreateSupplyAdComponent } from './supply-ad/create-supply-ad/create-supply-ad.component';
import { ListSupplyAdsComponent } from './supply-ad/list-supply-ads/list-supply-ads.component';
import { ProfileComponent } from './profile/profile.component';
import { ForumComponent } from './forum/forum.component';
import { ListForumComponent } from './forum/list-forum/list-forum.component';
import { ListCardComponent } from './forum/list-forum/list-card/list-card.component';
import { CommentComponent } from './forum/list-forum/list-card/comment/comment.component';
import { AgmCoreModule } from '@agm/core';
import { UpdateAdComponent } from './supply-ad/update-ad/update-ad.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SupplyAdComponent,
    CreateSupplyAdComponent,
    ListSupplyAdsComponent,
    ProfileComponent,
    ForumComponent,
    ListForumComponent,
    ListCardComponent,
    CommentComponent,
    UpdateAdComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    ImageCropperModule,
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
    NbCheckboxModule,
    NbMenuModule,
    NbListModule,
    AgmCoreModule.forRoot(environment.googleMap)
  ]
})
export class DashboardModule {}
