import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'firebase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForumService } from '../../../forum.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  replies: any[];
  isLogUser;
  isEnd;
  repCount;

  @Input() comment: any;
  @Input() postId: any;
  @Output() changeCommentCount = new EventEmitter();

  replyForm = new FormGroup({
    reply: new FormControl('', Validators.required)
  });

  user: User = JSON.parse(localStorage.getItem('user'));
  formControls = this.replyForm.controls;

  constructor(private forumService: ForumService) {}

  get rply() {
    return this.replyForm.get('reply');
  }

  ngOnInit() {
    this.getReplyCount();

    this.isEnd = this.comment.endThread;
    if (this.isEnd) {
      this.replyForm.get('reply').disable();
    }
    // show edit and end button
    if (this.comment.userID === this.user.uid) {
      this.isLogUser = true;
    } else {
      this.isLogUser = false;
    }

    // load replies
    this.forumService
      .getReply(this.comment.key)
      .pipe()
      .subscribe(replies => {
        this.replies = replies;
      });
  }

  onCreate() {
    // crete reply
    const rply = this.replyForm.controls.reply.value as string;
    const dateTime = new Date();
    const commentID = this.comment.key;
    const postID = this.postId;
    const userId = this.user.uid;
    const userName = this.user.displayName;
    const userImage = this.user.photoURL;

    if (this.replyForm.valid) {
      this.forumService.createReply(
        rply,
        dateTime,
        commentID,
        postID,
        userId,
        userName,
        userImage
      );
      this.rply.setValue('');
      this.getReplyCount();
      // this.showToast('success');
    } else {
      // this.showToast('danger');
    }
  }

  endOrViewComment() {
    this.forumService.changeEndProperty(
      'comment',
      this.comment.key,
      !this.comment.endThread
    );
  }

  deleteComments() {
    this.forumService
      .deleteReplyList('commentID', this.comment.key)
      .subscribe();
    this.forumService.deleteDocment('comment', this.comment.key);
    this.changeCommentCount.emit();
  }

  getReplyCount() {
    this.forumService
      .getCount('reply', 'commentID', this.comment.key)
      .subscribe(count => {
        this.repCount = count;
      });
  }
}
