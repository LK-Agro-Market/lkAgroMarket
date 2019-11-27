import { Component, OnInit, Input } from '@angular/core';
import { ForumService } from '../forum.service';
import { User } from 'firebase';

@Component({
  selector: 'app-list-forum',
  templateUrl: './list-forum.component.html',
  styleUrls: ['./list-forum.component.scss']
})
export class ListForumComponent implements OnInit {
  items: any[];
  postUser: any;

  @Input() showMyPost;

  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(private forumService: ForumService) {}

  ngOnInit() {
    this.allPosts();
  }

  ngOnChanges() {
  // change post view
    if (this.showMyPost) {
      this.myPost();
    } else {
      this.allPosts();
    }
  }

  myPost() { // get my post only
    this.forumService
      .getPostByID(this.user.uid)
      .pipe()
      .subscribe(items => {
        this.items = items;
      });
  }

  allPosts() {  // get all post
    this.forumService
      .getPost()
      .pipe()
      .subscribe(items => {
        this.items = items;
      });
  }
}
