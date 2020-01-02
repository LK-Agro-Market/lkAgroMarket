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
  viewMore = true;
  comments: any[];
  cmntId: any;
  imageList: any[];
  isLogUser;
  isEdit = false;
  createOrUpdate;
  isEnd;
  postId;
  commCount;

  @Input() item: any;

  @ViewChild('itm', { static: false }) accordion;

  commentForm = new FormGroup({
    comment: new FormControl('', Validators.required)
  });

  user: User = JSON.parse(localStorage.getItem('user'));
  formControls = this.commentForm.controls;

  constructor(private forumService: ForumService) {}

  get comm() {
    return this.commentForm.get('comment');
  }

  ngOnInit() {
    this.getCommentCount();
    this.postId = this.item.key;
    this.isEnd = this.item.endThread;
    this.imageList = this.item.images;

    if (this.isEnd) {
      this.commentForm.get('comment').disable();
    }
    // show edit and end button
    if (this.item.userID === this.user.uid) {
      this.isLogUser = true;
    } else {
      this.isLogUser = false;
    }
    // load comments
    this.forumService
      .getComment(this.postId)
      .pipe()
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  onCreate() {
    // create comment
    const comm = this.commentForm.controls.comment.value as string;
    const dateTime = new Date();
    const postID = this.postId;
    const userId = this.postId;
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
        false
      );
      this.comm.setValue('');
      this.getCommentCount();
      // this.showToast('success');
    } else {
      // this.showToast('danger');
    }
  }

  endOrViewPost() {
    // change post (end or start)
    this.forumService.changeEndProperty(
      'post',
      this.postId,
      !this.item.endThread
    );
  }

  deletePost() {
    // Delete post
    this.forumService.deleteImage(this.item.images);
    this.forumService.deleteReplyList('postID', this.postId).subscribe();
    this.forumService.deleteCommentList('postID', this.postId).subscribe();
    this.forumService.deleteDocment('post', this.postId);
    this.getCommentCount();
  }

  getCommentCount() {
    // get comment count
    this.forumService
      .getCount('comment', 'postID', this.item.key)
      .subscribe(count => {
        this.commCount = count;
      });
  }

  updateForm() {
    // update form
    this.accordion.toggle();
    this.createOrUpdate = 'update';
    this.isEdit = !this.isEdit;
  }
}
