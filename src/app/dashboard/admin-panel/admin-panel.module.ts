import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { NbCardModule, NbUserModule, NbListModule } from '@nebular/theme';

@NgModule({
  declarations: [AdminPanelComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    NbCardModule,
    NbUserModule,
    NbListModule
  ]
})
export class AdminPanelModule {}
