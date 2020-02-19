import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Subscription } from 'rxjs';
import { Notification } from '../../shared/models/notification';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  notifications: Notification[];
  notificationCount: number;
  viewer: User = JSON.parse(localStorage.getItem('user'));

  constructor(
    private notificationService: NotificationService,
    private toastr: ToastrService,
    public router: Router
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.notificationService
        .getNotifications(this.viewer.uid)
        .subscribe(notifications => {
          this.notifications = notifications;
          this.notificationCount = notifications.length;
        })
    );
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  delete(notificationId: string) {
    this.subscriptions.push(
      this.notificationService
        .deleteNotification(notificationId)
        .subscribe(() => {
          this.toastr.success('Deleted Notification');
        })
    );
  }

  viewAndDelete(notificationId: string) {
    const notification: Notification = this.notifications.filter(
      n => n.notificationId == notificationId
    )[0];
    this.subscriptions.push(
      this.notificationService
        .deleteNotification(notificationId)
        .subscribe(() => {
          this.router.navigate([notification.url]);
        })
    );
  }
}
