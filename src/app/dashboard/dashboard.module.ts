import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
<<<<<<< HEAD
import { RouterModule } from '@angular/router';
=======
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
>>>>>>> ab353352c7f74b7d7f53b250f5fc1d0cb4553119
import {
  NbThemeModule,
  NbLayoutModule,
  NbTooltipModule,
  NbIconModule,
  NbSidebarModule,
<<<<<<< HEAD
  NbChatModule,
  NbListModule,
  NbUserModule,
  NbCardModule,
  NbButtonModule
=======
  NbCardModule,
  NbSpinnerModule,
  NbButtonModule,
  NbSelectModule,
  NbInputModule
>>>>>>> ab353352c7f74b7d7f53b250f5fc1d0cb4553119
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { environment } from '../../environments/environment';

import { LayoutComponent } from './layout/layout.component';
<<<<<<< HEAD
import { FarmerComponent } from './farmer/farmer.component';
import { ChatComponent } from './chat/chat.component';
import { ChatShowcaseService } from './shared/services/chat-showcase.service';

@NgModule({
  declarations: [LayoutComponent, FarmerComponent, ChatComponent],
=======
import { SupplyAdComponent } from './supply-ad/supply-ad.component';
import { CreateSupplyAdComponent } from './supply-ad/create-supply-ad/create-supply-ad.component';

@NgModule({
  declarations: [LayoutComponent, SupplyAdComponent, CreateSupplyAdComponent],
>>>>>>> ab353352c7f74b7d7f53b250f5fc1d0cb4553119
  imports: [
    CommonModule,
    RouterModule,
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
<<<<<<< HEAD
    NbChatModule,
    NbListModule,
    NbUserModule,
    NbCardModule,
    NbButtonModule
  ],
  providers: [ChatShowcaseService]
=======
    NbCardModule,
    NbSpinnerModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule
  ]
>>>>>>> ab353352c7f74b7d7f53b250f5fc1d0cb4553119
})
export class DashboardModule {}
