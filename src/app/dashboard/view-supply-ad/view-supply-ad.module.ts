import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewSupplyAdRoutingModule } from './view-supply-ad-routing.module';
import { ViewSupplyAdComponent } from './view-supply-ad.component';
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
  NbSelectModule,
  NbInputModule,
  NbBadgeModule,
  NbMenuModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ViewSupplyAdComponent],
  imports: [
    CommonModule,
    ViewSupplyAdRoutingModule,
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
    NbSelectModule,
    NbInputModule,
    NbUserModule,
    NbBadgeModule,
    NbMenuModule,
    NbListModule,
    NgbModule,
    NbTooltipModule
  ]
})
export class ViewSupplyAdModule {}
