import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewDemandAdRoutingModule } from './view-demand-ad-routing.module';
import { ViewDemandAdComponent } from './view-demand-ad.component';
import { CommentBuyerAdComponent } from './comment-buyer-ad/comment-buyer-ad.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NbLayoutModule, NbIconModule, NbTooltipModule, NbListModule, NbUserModule, NbCardModule, NbButtonModule, NbSpinnerModule, NbSelectModule, NbInputModule, NbBadgeModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ViewDemandAdComponent,
    CommentBuyerAdComponent
  ],
  imports: [
    CommonModule,
    ViewDemandAdRoutingModule,
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
export class ViewDemandAdModule { }
