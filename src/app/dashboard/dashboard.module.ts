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
<<<<<<< HEAD
  NbUserModule
=======
  NbUserModule,
  NbAlertModule,
  NbBadgeModule,
  NbCheckboxModule,
  NbMenuModule,
  NbListModule
>>>>>>> 38dc43d322b763c1df4f429499fb7ae4166ca7fe
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AgmCoreModule } from '@agm/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { environment } from '../../environments/environment';

import { LayoutComponent } from './layout/layout.component';
import { ChatComponent } from './chat/chat.component';
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
import { DemandAdComponent } from './demand-ad/demand-ad.component';
import { CreateDemandAdComponent } from './demand-ad/create-demand-ad/create-demand-ad.component';
import { ListDemandAdComponent } from './demand-ad/list-demand-ad/list-demand-ad.component';
import { ReplyComponent } from './forum/list-forum/list-card/comment/reply/reply.component';
import { UserProfileCardComponent } from './forum/user-profile-card/user-profile-card.component';

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
    ReplyComponent,
    UserProfileCardComponent
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
<<<<<<< HEAD
    NbUserModule
  ]
=======
    NbAlertModule,
    NbBadgeModule,
    NbCheckboxModule,
    NbMenuModule,
    NbListModule,
    AgmCoreModule.forRoot(environment.googleMap)
  ],
  providers: []
>>>>>>> 38dc43d322b763c1df4f429499fb7ae4166ca7fe
})
export class DashboardModule {}
