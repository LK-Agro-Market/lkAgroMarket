import { Component, OnInit, Input } from '@angular/core';
import { User } from 'firebase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForumService } from '../../../forum.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  replyForm = new FormGroup({
    reply: new FormControl('', Validators.required)
  });

  commentId;

  get rply() {
    return this.replyForm.get('reply');
  }

  @Input() comment: any;

  user: User = JSON.parse(localStorage.getItem('user'));
  formControls = this.replyForm.controls;

  constructor(
    private forumService: ForumService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.commentId = this.comment.key;
  }

  showToast(status) {
    this.toastrService.show('message', { status });
  }

  onCreate() {
    const rply = this.replyForm.controls.reply.value as string;
    const dateTime = new Date();
    const commentID = this.comment.key;
    const userId = this.user.uid;
    const userName = this.user.displayName;
    const userImage = this.user.photoURL;

    console.log(this.comment.key);
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
      this.showToast('success');
    } else {
      this.showToast('danger');
    }
  }
}
