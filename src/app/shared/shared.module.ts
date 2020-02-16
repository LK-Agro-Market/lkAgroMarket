import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmButtonDirective } from './directives/confirm-button.directive';

@NgModule({
  declarations: [ConfirmButtonDirective],
  imports: [CommonModule],
  exports: [ConfirmButtonDirective]
})
export class SharedModule {}
