import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { GroupchatComponent } from '../chat/groupchat/groupchat.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NbLayoutModule,
  NbIconModule,
  NbChatModule,
  NbListModule,
  NbUserModule,
  NbCardModule,
  NbButtonModule,
  NbSpinnerModule,
  NbInputModule,
  NbAccordionModule,
  NbAlertModule,
  NbSidebarModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  declarations: [ChatComponent, GroupchatComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NbLayoutModule,
    NbSidebarModule,
    NbEvaIconsModule,
    NbIconModule,
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
    NbSidebarModule
  ]
})
export class ChatModule {}
