import { Component, OnInit, Input } from '@angular/core';
import { ForumService } from 'src/app/dashboard/forum/forum.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  replies: any;

  constructor(private forumService: ForumService) {}

  @Input() commentId: any;

  ngOnInit() {
    this.forumService
      .getReply(this.commentId)
      .pipe()
      .subscribe(replies => {
        this.replies = replies;
      });
  }
}
