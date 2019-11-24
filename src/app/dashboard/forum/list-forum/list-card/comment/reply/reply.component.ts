import { Component, OnInit, Input } from '@angular/core';
import { ForumService } from 'src/app/dashboard/forum/forum.service';
import { User } from 'firebase';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  showBtn;

  constructor(private forumService: ForumService) {}

  @Input() reply: any;

  user: User = JSON.parse(localStorage.getItem('user'));

  ngOnInit() {

    if (this.reply.userID === this.user.uid) {
      this.showBtn = true;
    } else {
      this.showBtn = false;
    }
  }
}
