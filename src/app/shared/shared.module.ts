import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmButtonDirective } from './directives/confirm-button.directive';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ConfirmButtonDirective],
  imports: [CommonModule, TranslateModule],
  exports: [ConfirmButtonDirective, TranslateModule]
})
export class SharedModule {}
