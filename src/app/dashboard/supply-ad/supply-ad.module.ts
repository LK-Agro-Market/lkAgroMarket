import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplyAdRoutingModule } from './supply-ad-routing.module';

import { SupplyAdComponent } from './supply-ad.component';
import { CreateSupplyAdComponent } from './create-supply-ad/create-supply-ad.component';
import { ListSupplyAdsComponent } from './list-supply-ads/list-supply-ads.component';
import { StatsComponent } from './stats/stats.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
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
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SupplyAdComponent,
    CreateSupplyAdComponent,
    ListSupplyAdsComponent,
    StatsComponent
  ],
  imports: [
    CommonModule,
    SupplyAdRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule,
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
    NbListModule,
    ChartsModule,
    NgbModule,
    NbTooltipModule
  ]
})
export class SupplyAdModule {}
