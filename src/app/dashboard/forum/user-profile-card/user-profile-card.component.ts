import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';

import { User } from 'firebase';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss']
})
export class UserProfileCardComponent implements OnInit {
  userName;
  userEmail;
  userImg;
  postType = 'all';
  userLevel;

  user: User = JSON.parse(localStorage.getItem('user'));

  @Output() changePost: EventEmitter<any> = new EventEmitter();

  @ViewChild('my', { static: true }) my;
  @ViewChild('all', { static: true }) all;
  @ViewChild('admin', { static: true }) admin;

  constructor(private userDetailsService: UserDetailsService) {}

  ngOnInit() {
    this.userName = this.user.displayName;
    this.userEmail = this.user.email;
    this.userImg = this.user.photoURL;
    this.chnagePostType('all');

    this.userDetailsService
      .getUserDetails(this.user.uid)
      .subscribe(userDetails => {
        this.userLevel = userDetails.userLevel;
      });
  }

  chnagePostType(postType) {
    // change post view my posts/all posts
    this.changePost.emit(postType);
    this.postType = postType;
  }
}
