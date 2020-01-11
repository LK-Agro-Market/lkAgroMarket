import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ForumService } from 'src/app/dashboard/forum/forum.service';
import { User } from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { NbPopoverDirective } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  isLogUser;
  isEdit = false;

  @Input() replyItem: any;
  @Output() changeReplyCount = new EventEmitter();
  @Output() isReply = new EventEmitter();
  @ViewChild(NbPopoverDirective, { static: false }) ConfirmDelete: NbPopoverDirective;

  updateReplyForm = new FormGroup({
    upReply: new FormControl('', Validators.required)
  });

  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(
    private forumService: ForumService,
    private toastr: ToastrService) {}

  get upReply() {
    return this.updateReplyForm.get('upReply');
  }

  ngOnInit() {
    if (this.replyItem.userID === this.user.uid) {
      this.isLogUser = true;
    } else {
      this.isLogUser = false;
    }
  }

  updateReply() {
    this.isReply.emit(false);
    this.isEdit = !this.isEdit;
    if (this.isEdit === true) {
      this.isReply.emit(true);
      this.forumService.getReplyForUpdate(this.replyItem.key)
        .pipe()
        .subscribe(dataSet => {
          this.updateReplyForm.controls.upReply.setValue(dataSet.data().reply);
        });
    }
  }

  onUpdate() {
    if (this.updateReplyForm.valid) {
      this.forumService.updateReply(
        this.replyItem.key,
        this.updateReplyForm.controls.upReply.value as string
      );
    }
    this.updateReplyForm.reset();
    this.isEdit = false;
    this.toastr.success('Your changes are saved...');
  }

  deleteReply() {
    this.forumService.deleteDocment('reply', this.replyItem.key);
    this.changeReplyCount.emit();
    this.toastr.success('Reply deleted...');
  }

  hidePopover() {
    this.ConfirmDelete.hide();
  }


}
