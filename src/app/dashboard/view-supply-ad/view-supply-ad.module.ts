import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewSupplyAdRoutingModule } from './view-supply-ad-routing.module';
import { ViewSupplyAdComponent } from './view-supply-ad.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NbLayoutModule,
  NbIconModule,
  NbListModule,
  NbUserModule,
  NbCardModule,
  NbButtonModule,
  NbSpinnerModule,
  NbSelectModule,
  NbInputModule,
  NbBadgeModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxStarsModule } from 'ngx-stars';
import { SharedModule } from 'src/app/shared/shared.module';

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
    NbListModule,
    NbUserModule,
    NbCardModule,
    NbButtonModule,
    NbSpinnerModule,
    NbSelectModule,
    NbInputModule,
    NbUserModule,
    NbBadgeModule,
    NgbModule,
    NgxStarsModule,
    SharedModule
  ]
})
export class ViewSupplyAdModule {}
