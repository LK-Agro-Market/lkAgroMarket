import { Component, OnInit, Input } from '@angular/core';
import { User } from 'firebase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForumService } from '../../../forum.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  replyForm = new FormGroup({
    reply: new FormControl('', Validators.required)
  });
  replies: any[];
  showBtn;
  isEnd;

  get rply() {
    return this.replyForm.get('reply');
  }

  @Input() comment: any;

  user: User = JSON.parse(localStorage.getItem('user'));
  formControls = this.replyForm.controls;

  constructor(
    private forumService: ForumService
  ) { }

  ngOnInit() {
    this.isEnd = this.comment.endThread;
    if (this.isEnd) {
      this.replyForm.get('reply').disable();
    }
    // show edit and end button
    if (this.comment.userID === this.user.uid) {
      this.showBtn = true;
    } else {
      this.showBtn = false;
    }

    // load replies
    this.forumService
      .getReply(this.comment.key)
      .pipe()
      .subscribe(replies => {
        this.replies = replies;
        console.log(this.replies);
      });
  }

  // showToast(status) {
  //   // this.toastrService.show('message', { status });
  // }

  onCreate() {
    const rply = this.replyForm.controls.reply.value as string;
    const dateTime = new Date();
    const commentID = this.comment.key;
    const userId = this.user.uid;
    const userName = this.user.displayName;
    const userImage = this.user.photoURL;

    if (this.replyForm.valid) {
      this.forumService.createReply(
        rply,
        dateTime,
        commentID,
        userId,
        userName,
        userImage
      );
      this.rply.setValue('');
      // this.showToast('success');
    } else {
      // this.showToast('danger');
    }
  }
}
