import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ForumService } from 'src/app/dashboard/forum/forum.service';
import { User } from 'firebase';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  showBtn;
  @Input() reply: any;
  @Output() changeReplyCount = new EventEmitter();

  constructor(private forumService: ForumService) {}

  user: User = JSON.parse(localStorage.getItem('user'));

  ngOnInit() {

    if (this.reply.userID === this.user.uid) {
      this.showBtn = true;
    } else {
      this.showBtn = false;
    }
  }

  deleteReply() {
    this.forumService.deleteDocment('reply', this.reply.key);
    this.changeReplyCount.emit();
  }


}
