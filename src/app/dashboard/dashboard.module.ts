import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { environment } from '../../environments/environment';
import { ConfirmButtonDirective } from '../shared/directives/confirm-button.directive';

// components
import { LayoutComponent } from './layout/layout.component';
// chat
import { ChatComponent } from './chat/chat.component';
// supply ad
import { SupplyAdComponent } from './supply-ad/supply-ad.component';
import { CreateSupplyAdComponent } from './supply-ad/create-supply-ad/create-supply-ad.component';
import { ListSupplyAdsComponent } from './supply-ad/list-supply-ads/list-supply-ads.component';
import { StatsComponent } from './supply-ad/stats/stats.component';
import { ViewSupplyAdComponent } from './supply-ad/view-supply-ad/view-supply-ad.component';
// profile
import { ProfileComponent } from './profile/profile.component';
// forum
import { ForumComponent } from './forum/forum.component';
import { ListForumComponent } from './forum/list-forum/list-forum.component';
import { ListCardComponent } from './forum/list-forum/list-card/list-card.component';
import { CommentComponent } from './forum/list-forum/list-card/comment/comment.component';
import { UserProfileCardComponent } from './forum/user-profile-card/user-profile-card.component';
import { ReplyComponent } from './forum/list-forum/list-card/comment/reply/reply.component';
import { CreateFormComponent } from './forum/create-form/create-form.component';
// demand ad
import { DemandAdComponent } from './demand-ad/demand-ad.component';
import { CreateDemandAdComponent } from './demand-ad/create-demand-ad/create-demand-ad.component';
import { ListDemandAdComponent } from './demand-ad/list-demand-ad/list-demand-ad.component';
import { ViewDemandAdComponent } from './demand-ad/view-demand-ad/view-demand-ad.component';
import { CommentBuyerAdComponent } from './demand-ad/view-demand-ad/comment-buyer-ad/comment-buyer-ad.component';
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
    DemandAdComponent,
    CreateDemandAdComponent,
    ListDemandAdComponent,
    ReplyComponent,
    UserProfileCardComponent,
    CreateFormComponent,
    StatsComponent,
    ConfirmButtonDirective,
    ViewSupplyAdComponent,
    ViewDemandAdComponent,
    CommentBuyerAdComponent
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
    FormsModule,
    NbAccordionModule,
    NbUserModule,
    NbAlertModule,
    NbBadgeModule,
    NbCheckboxModule,
    NbMenuModule,
    NbListModule,
    AgmCoreModule.forRoot(environment.googleMap),
    ChartsModule,
    NgbModule,
    NgxDropzoneModule
  ],
  providers: []
})
export class DashboardModule {}
