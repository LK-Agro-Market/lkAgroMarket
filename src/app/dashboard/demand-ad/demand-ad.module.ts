import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandAdRoutingModule } from './demand-ad-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NbLayoutModule,
  NbIconModule,
  NbTooltipModule,
  NbListModule,
  NbUserModule,
  NbCardModule,
  NbButtonModule,
  NbSpinnerModule,
  NbSelectModule,
  NbInputModule,
  NbBadgeModule,
  NbMenuModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DemandAdComponent } from './demand-ad.component';
import { CreateDemandAdComponent } from './create-demand-ad/create-demand-ad.component';
import { ListDemandAdComponent } from './list-demand-ad/list-demand-ad.component';
import { ConfirmButtonDirective } from 'src/app/shared/directives/confirm-button.directive';
import { ShowallDemandAdComponent } from 'src/app/dashboard/demand-ad/showall-demand-ad/showall-demand-ad.component';

@NgModule({
  declarations: [
    DemandAdComponent,
    CreateDemandAdComponent,
    ListDemandAdComponent,
    ConfirmButtonDirective,
    ShowallDemandAdComponent
  ],
  imports: [
    CommonModule,
    DemandAdRoutingModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbTooltipModule,
    NbListModule,
    NbUserModule,
    NbCardModule,
    NbButtonModule,
    NbSpinnerModule,
    NbSelectModule,
    NbInputModule,
    FormsModule,
    NbUserModule,
    NbBadgeModule,
    NbListModule,
    ChartsModule,
    NgbModule,
    NbTooltipModule
  ]
})
export class DemandAdModule {}
