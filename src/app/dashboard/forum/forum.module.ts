import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';

import { ForumComponent } from './forum.component';
import { ListForumComponent } from './list-forum/list-forum.component';
import { ListCardComponent } from './list-forum/list-card/list-card.component';
import { CommentComponent } from './list-forum/list-card/comment/comment.component';
import { ReplyComponent } from './list-forum/list-card/comment/reply/reply.component';
import { UserProfileCardComponent } from './user-profile-card/user-profile-card.component';
import { CreateFormComponent } from './create-form/create-form.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NbLayoutModule,
  NbIconModule,
  NbTooltipModule,
  NbChatModule,
  NbListModule,
  NbUserModule,
  NbCardModule,
  NbButtonModule,
  NbSpinnerModule,
  NbInputModule,
  NbAccordionModule,
  NbAlertModule,
  NbPopoverModule,
  NbCheckboxModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgImageSliderModule } from 'ng-image-slider';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ForumComponent,
    ListForumComponent,
    ListCardComponent,
    CommentComponent,
    ReplyComponent,
    UserProfileCardComponent,
    CreateFormComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbTooltipModule,
    NbChatModule,
    NbListModule,
    NbUserModule,
    NbCardModule,
    NbButtonModule,
    NbSpinnerModule,
    NbInputModule,
    NbAccordionModule,
    NbUserModule,
    NbAlertModule,
    NgxDropzoneModule,
    NgImageSliderModule,
    NbPopoverModule,
    NbCheckboxModule,
    SharedModule
  ]
})
export class ForumModule {}
