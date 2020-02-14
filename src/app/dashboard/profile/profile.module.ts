import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule } from '@angular/forms';
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
  NbSelectModule,
  NbInputModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbListModule,
    NbCardModule,
    NbButtonModule,
    NbSpinnerModule,
    NbSelectModule,
    NbInputModule,
    NbUserModule,
    AgmCoreModule.forRoot(environment.googleMap)
  ]
})
export class ProfileModule {}
