import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  postType = 'all';
  isCreate = false;
  createOrUpdate;

  user: User = JSON.parse(localStorage.getItem('user'));

  constructor() {}

  ngOnInit() {}

  changeDisplayPost(postType) {
    // set post type
    this.postType = postType;
  }

  toggleForm(event) {
    // hide form when submit
    this.isCreate = event;
  }

  createPost() {
    // create post
    this.createOrUpdate = 'create';
    this.isCreate = !this.isCreate;
  }
}
