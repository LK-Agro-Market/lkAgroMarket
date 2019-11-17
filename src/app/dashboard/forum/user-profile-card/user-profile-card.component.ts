import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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

  showMyPost;

  user: User = JSON.parse(localStorage.getItem('user'));
  userDetails: User = JSON.parse(localStorage.getItem('userDetails'));
  @Output() showMypostOnly: EventEmitter<boolean> = new EventEmitter();

  showMy() {
    this.showMyPost = true;
    this.showMypostOnly.emit(this.showMyPost);
  }

  showAll() {
    this.showMyPost = false;
    this.showMypostOnly.emit(this.showMyPost);
  }

  constructor() { }

  ngOnInit() {
    this.userName = this.user.displayName;
    this.userEmail = this.user.email;
    this.userImg = this.user.photoURL;
  }
}
