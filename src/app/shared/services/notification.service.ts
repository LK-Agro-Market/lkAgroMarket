import { Injectable } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

type NotificationType = 'primary' | 'success' | 'warning' | 'danger' | 'info';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: NbToastrService) {}

  create(message: string, status: NotificationType = 'primary', title = '') {
    this.toastr.show(message, title, {
      status,
      hasIcon: false,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      duration: 5000,
      destroyByClick: true
    });
  }
}
