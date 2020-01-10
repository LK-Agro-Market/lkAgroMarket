import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ForumService } from 'src/app/dashboard/forum/forum.service';
import { User } from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  isLogUser;

  @Input() reply: any;
  @Output() changeReplyCount = new EventEmitter();
  @ViewChild(NbPopoverDirective, { static: false }) ConfirmDelete: NbPopoverDirective;

  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(
    private forumService: ForumService,
    private toastr: ToastrService) {}

  ngOnInit() {
    if (this.reply.userID === this.user.uid) {
      this.isLogUser = true;
    } else {
      this.isLogUser = false;
    }
  }

  deleteReply() {
    this.forumService.deleteDocment('reply', this.reply.key);
    this.changeReplyCount.emit();
    this.toastr.success('Reply deleted...');
  }

  hidePopover() {
    this.ConfirmDelete.hide();
  }
}
