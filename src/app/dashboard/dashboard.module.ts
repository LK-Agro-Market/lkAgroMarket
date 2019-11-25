import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbThemeModule,
  NbLayoutModule,
  NbTooltipModule,
  NbIconModule,
  NbSidebarModule,
  NbChatModule,
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
import { AgmCoreModule } from '@agm/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { environment } from '../../environments/environment';

//components
import { LayoutComponent } from './layout/layout.component';
//chat
import { ChatComponent } from './chat/chat.component';
//supply ad
import { SupplyAdComponent } from './supply-ad/supply-ad.component';
import { CreateSupplyAdComponent } from './supply-ad/create-supply-ad/create-supply-ad.component';
import { ListSupplyAdsComponent } from './supply-ad/list-supply-ads/list-supply-ads.component';
import { UpdateAdComponent } from './supply-ad/update-ad/update-ad.component';
//profile
import { ProfileComponent } from './profile/profile.component';
//forum
import { ForumComponent } from './forum/forum.component';
import { ListForumComponent } from './forum/list-forum/list-forum.component';
import { ListCardComponent } from './forum/list-forum/list-card/list-card.component';
import { CommentComponent } from './forum/list-forum/list-card/comment/comment.component';
//demand ad
import { DemandAdComponent } from './demand-ad/demand-ad.component';
import { CreateDemandAdComponent } from './demand-ad/create-demand-ad/create-demand-ad.component';
import { ListDemandAdComponent } from './demand-ad/list-demand-ad/list-demand-ad.component';
import { ReplyComponent } from './forum/list-forum/list-card/comment/reply/reply.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SupplyAdComponent,
    CreateSupplyAdComponent,
    ChatComponent,
    ListSupplyAdsComponent,
    ProfileComponent,
    ForumComponent,
    ListForumComponent,
    ListCardComponent,
    CommentComponent,
    UpdateAdComponent,
    DemandAdComponent,
    CreateDemandAdComponent,
    ListDemandAdComponent,
    ReplyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
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
    NbChatModule,
    NbListModule,
    NbUserModule,
    NbCardModule,
    NbButtonModule,
    NbCardModule,
    NbSpinnerModule,
    NbSelectModule,
    NbInputModule,
    NbAccordionModule,
    NbAlertModule,
    NbBadgeModule,
    NbCheckboxModule,
    NbMenuModule,
    NbListModule,
    AgmCoreModule.forRoot(environment.googleMap)
  ],
  providers: []
})
export class DashboardModule {}
