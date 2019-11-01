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
  commentForm = new FormGroup({
    comment: new FormControl('', Validators.required),
  });

  viewButton = true;
  comments: any[];

  get comm() {
    return this.commentForm.get('comment');
  }

  @Input() item: any;

  user: User = JSON.parse(localStorage.getItem('user'));
  formControls = this.commentForm.controls;

  @ViewChild('item', { static: false }) accordion;

  toggleMain() {
    this.accordion.toggle();
  }

  constructor(private forumService: ForumService) {
  }

  ngOnInit() {
    this.forumService.getComment().pipe().subscribe(comments => {
      this.comments = comments;
    });
  }

  onCreate() {
    const comm = this.commentForm.controls.comment.value as string;
    const dateTime = new Date();
    const postID = this.item.id;
    const userId = this.user.uid;
    const userName = this.user.displayName;

    if (this.commentForm.valid) {
      this.forumService.createComment(comm, dateTime, postID, userId, userName);
      this.comm.setValue('');
    } else {
      // this.msgStatus.emit('error');
      // this.msg.emit('Please enter comment to reply');
    }
  }


}
