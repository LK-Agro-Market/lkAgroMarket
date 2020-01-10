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
  myPostOnly = false;

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
      this.myPostOnly = true;
    } else {
      this.myPostOnly = false;
    }
  }
}
