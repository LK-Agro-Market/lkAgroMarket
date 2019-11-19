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

  user: User = JSON.parse(localStorage.getItem('user'));

  @Input() showMyPost;
  constructor(private forumService: ForumService) {}

  ngOnInit() {
    this.allPosts();
    this.forumService.getSomething();
  }

  ngOnChanges() {
    if (this.showMyPost) {
      this.myPost();
    } else {
      this.allPosts();
    }
  }

  myPost() {
    this.forumService
      .getPostByID(this.user.uid)
      .pipe()
      .subscribe(items => {
        this.items = items;
      });
  }

  allPosts() {
    this.forumService
      .getPost()
      .pipe()
      .subscribe(items => {
        this.items = items;
      });
  }
}
