import { Component, OnInit} from '@angular/core';
import { User } from 'src/app/shared/models/user';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  showMyPost = false;
  isCreate = false;
  createOrUpdate;

  user: User = JSON.parse(localStorage.getItem('user'));

  constructor() { }

  ngOnInit() {
  }

  changePostType(showMyPost: boolean) { // set post type
    this.showMyPost = showMyPost;
  }

  toggleForm(event) { // hide form when submit
    this.isCreate = event;
  }

  createPost() { // create post
    this.createOrUpdate = 'create';
    this.isCreate = !this.isCreate;
  }
}
