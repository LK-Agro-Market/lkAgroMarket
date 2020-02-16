import { Component, OnInit, Input } from '@angular/core';
import { ForumService } from '../forum.service';
import { User } from 'firebase';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-list-forum',
  templateUrl: './list-forum.component.html',
  styleUrls: ['./list-forum.component.scss']
})

export class ListForumComponent implements OnInit {
  items: any[];
  postUser: any;
  currentUserType;
  enebleSearchUser;

  @Input() postType;

  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(
    private forumService: ForumService,
    private userDetailsService: UserDetailsService,
  ) { }

  ngOnInit() {
    this.allPosts();

    this.userDetailsService
      .getUserDetails(this.user.uid)
      .subscribe(userDetails => {
        this.currentUserType = userDetails.userLevel;
      });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges() {
    // change post view
    if (this.postType === 'all') {
      this.allPosts();
    } else if (this.postType === 'my') {
      this.myPosts();
    } else if (this.postType === 'admin') {
      this.adminPosts();
    }
  }

  myPosts() {
    // get my post only
    this.forumService
      .getPostByID(this.user.uid)
      .pipe()
      .subscribe(items => {
        this.items = items;
      });
  }

  allPosts() {
    // get all post
    if (this.currentUserType === 'Farmer') {
      this.enebleSearchUser = 'showFarmer';
    } else if (this.currentUserType === 'Buyer') {
      this.enebleSearchUser = 'showBuyer';
    } else {
      this.enebleSearchUser = 'admin';
    }

    this.forumService
      .getPost(this.enebleSearchUser)
      .pipe()
      .subscribe(items => {
        this.items = items;
      });
  }

  adminPosts() {
    // get admin notes
    this.forumService
    .getAdminNotes()
    .pipe()
    .subscribe(items => {
      this.items = items;
    });

  }

}
