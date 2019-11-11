import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
    this.userName = this.user.displayName;
    this.userEmail = this.user.email;
    this.userImg = this.user.photoURL;
    console.log(this.userName);
  }

}
