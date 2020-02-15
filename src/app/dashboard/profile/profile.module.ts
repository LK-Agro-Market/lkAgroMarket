import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {StatsComponent} from './stats/stats.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbLayoutModule,
  NbIconModule,
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
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ProfileComponent, StatsComponent],
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
    AgmCoreModule.forRoot(environment.googleMap),
    ChartsModule
  ]
})
export class ProfileModule {}
