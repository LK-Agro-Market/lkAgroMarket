import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { User } from 'firebase';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForumService } from '../../forum.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {

  viewButton = true;
  comments: any[];
  cmntId: any;
  userImageURL;
  showBtn;
  isEnd;
  commCount;
  postId;

  @Input() item: any;
  @ViewChild('item', { static: false }) accordion;

  commentForm = new FormGroup({
    comment: new FormControl('', Validators.required)
  });

  user: User = JSON.parse(localStorage.getItem('user'));
  formControls = this.commentForm.controls;

  constructor(
    private forumService: ForumService
  ) { }

  get comm() {
    return this.commentForm.get('comment');
  }

  ngOnInit() {
    this.getCommentCount();
    this.postId = this.item.key;
    this.isEnd = this.item.endThread;

    if (this.isEnd) {
      this.commentForm.get('comment').disable();
    }
    // show edit and end button
    if (this.item.userID === this.user.uid) {
      this.showBtn = true;
    } else {
      this.showBtn = false;
    }
    // load comments
    this.forumService
      .getComment(this.item.key)
      .pipe()
      .subscribe(comments => {
        this.comments = comments;
      });

  }

  onCreate() {  // create comment
    const comm = this.commentForm.controls.comment.value as string;
    const dateTime = new Date();
    const postID = this.item.key;
    const userId = this.user.uid;
    const userName = this.user.displayName;
    const userImage = this.user.photoURL;

    if (this.commentForm.valid) {
      this.forumService.createComment(
        comm,
        dateTime,
        postID,
        userId,
        userName,
        userImage,
        false,
      );
      this.comm.setValue('');
      this.getCommentCount();
      // this.showToast('success');
    } else {
      // this.showToast('danger');
    }
  }

  toggleMain() {
    this.accordion.toggle();
  }

  endOrViewPost() { // change post (end or start)
    this.forumService.changeEndProperty('post', this.item.key, !this.item.endThread);
  }

  deletePost() {  // Delete post
    this.forumService.deleteReplyList('postID', this.item.key).subscribe();
    this.forumService.deleteCommentList('postID', this.item.key).subscribe();
    this.forumService.deleteDocment('post', this.item.key);
    this.getCommentCount();
  }

  getCommentCount() { // get comment count
    this.forumService.getCount('comment', 'postID', this.item.key).subscribe(count => {
      this.commCount = count;
    });
  }

}
