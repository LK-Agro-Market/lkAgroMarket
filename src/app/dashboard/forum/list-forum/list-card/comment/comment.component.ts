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
cmnt;
  get rply() {
    return this.replyForm.get('reply');
  }

  @Input() comments: any[];

  user: User = JSON.parse(localStorage.getItem('user'));
  formControls = this.replyForm.controls;

  constructor(private forumService: ForumService) {}

  ngOnInit() {

  }

  onCreate() {
    const rply = this.replyForm.controls.reply.value as string;
    const dateTime = new Date();
    const commentID = this.comments.key;

    const userId = this.user.uid;
    const userName = this.user.displayName;
    const userImage = this.user.photoURL;

    if (this.replyForm.valid) {
      this.forumService.createReply(rply, dateTime, commentID, userId, userName, userImage);
      this.rply.setValue('');
    } else {
      // this.msgStatus.emit('error');
      // this.msg.emit('Please enterreply');
    }
  }
}
