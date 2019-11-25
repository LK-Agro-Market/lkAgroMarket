import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { User } from 'firebase';

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss']
})
export class UserProfileCardComponent implements OnInit {
  userName;
  userEmail;
  userImg;

  user: User = JSON.parse(localStorage.getItem('user'));
  userDetails: User = JSON.parse(localStorage.getItem('userDetails'));

  @Output() showMypostOnly: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('my', { static: true }) my;
  @ViewChild('all', { static: true }) all;

  constructor() {}

  ngOnInit() {
    this.userName = this.user.displayName;
    this.userEmail = this.user.email;
    this.userImg = this.user.photoURL;
    this.showMy(false);
  }

  showMy(showMyPost) {
    // change post view my posts/all posts
    this.showMypostOnly.emit(showMyPost);
    if (showMyPost) {
      this.my.nativeElement.classList.remove('btn');
      this.all.nativeElement.classList.remove('btnSelect');
      this.my.nativeElement.classList.add('btnSelect');
      this.all.nativeElement.classList.add('btn');
    } else {
      this.my.nativeElement.classList.remove('btnSelect');
      this.all.nativeElement.classList.remove('btn');
      this.my.nativeElement.classList.add('btn');
      this.all.nativeElement.classList.add('btnSelect');
    }
  }
}
