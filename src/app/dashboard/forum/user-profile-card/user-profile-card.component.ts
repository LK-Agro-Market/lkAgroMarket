import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';

import { User } from 'firebase';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';
import { UserDetails } from 'src/app/shared/models/user-details';

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
  userDetails: UserDetails;

  user: User = JSON.parse(localStorage.getItem('user'));

  @Output() showMypostOnly: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('my', { static: true }) my;
  @ViewChild('all', { static: true }) all;

  constructor(
    private userDetailsService: UserDetailsService,
  ) {}

  ngOnInit() {
    this.userName = this.user.displayName;
    this.userEmail = this.user.email;
    this.userImg = this.user.photoURL;
    this.showMy(false);

    this.userDetailsService
      .getUserDetails(this.user.uid)
      .subscribe(userDetails => {
        this.userDetails = userDetails;
      });

    console.log(this.userDetails);
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
