import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  postType = 'all';
  isCreate = false;
  isCreateAdmin = false;
  createOrUpdate;
  currentUserType;
  isAdminNote: boolean;

  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(
    private userDetailsService: UserDetailsService,
  ) {}

  ngOnInit() {
    this.userDetailsService
      .getUserDetails(this.user.uid)
      .subscribe(userDetails => {
        this.currentUserType = userDetails.userLevel;
      });
  }

  changeDisplayPost(postType) {
    // set post type
    this.postType = postType;
  }

  toggleForm(event) {
    // hide form when submit
    this.isCreate = event;
    this.isCreateAdmin = event;
  }

  createPost(isAdminPost) {
    // create post
    if (isAdminPost) {
      this.isCreateAdmin = !this.isCreateAdmin;
    } else {
      this.isCreate = !this.isCreate;
    }
    this.isAdminNote = isAdminPost;
    this.createOrUpdate = 'create';
  }
}
