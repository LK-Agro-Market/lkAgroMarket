import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { User } from 'firebase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForumService } from '../../../forum.service';
import { ToastrService } from 'ngx-toastr';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  replies: any[];
  isLogUser;
  isPostOwner;
  isEnd;
  isEdit = false;
  isReply = false;
  isBest;
  isReact;
  repCount;
  reactCount;
  voteCount;

  @Input() comment: any;
  @Input() postId: any;

  @Output() changeCommentCount = new EventEmitter();
  @Output() isComment = new EventEmitter();

  @ViewChild(NbPopoverDirective, { static: false }) ConfirmDelete: NbPopoverDirective;
  @ViewChild('commentSection', { static: false }) section;

  updateCommentForm = new FormGroup({
    upComment: new FormControl('', Validators.required)
  });

  replyForm = new FormGroup({
    reply: new FormControl('', Validators.required)
  });

  user: User = JSON.parse(localStorage.getItem('user'));
  formControls = this.replyForm.controls;

  constructor(
    private forumService: ForumService,
    private toastr: ToastrService
  ) { }

  get upComment() {
    return this.updateCommentForm.get('upComment');
  }

  get rply() {
    return this.replyForm.get('reply');
  }

  ngOnInit() {
    this.getReplyCount();
    this.checkReactState();
    this.isBest = this.comment.isBest;
    this.isEnd = this.comment.endThread;
    if (this.isEnd) {
      this.replyForm.get('reply').disable();
    }
    // show edit and end button
    if (this.comment.commentUserID === this.user.uid) {
      this.isLogUser = true;
    } else {
      this.isLogUser = false;
    }
    if (this.comment.postUserID === this.user.uid) {
      this.isPostOwner = true;
    } else {
      this.isPostOwner = false;
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
      this.toastr.success('Replied successfully...');
    } else {
      this.toastr.error('Please check and fill correctly', 'Can`t reply');
    }
  }

  onUpdate() {
    if (this.updateCommentForm.valid) {
      this.forumService.updateComment(
        this.comment.key,
        this.updateCommentForm.controls.upComment.value as string
      );
    }
    this.updateCommentForm.reset();
    this.isEdit = false;
    this.toastr.success('Your changes are saved...');
  }

  endOrViewComment() {
    this.forumService.changeEndProperty(
      'comment',
      this.comment.key,
      !this.comment.endThread
    );
  }

  updateComment() {
    this.isEdit = !this.isEdit;
    this.isComment.emit(false);
    if (this.isEdit === true) {
      this.isComment.emit(true);
      this.forumService.getCommentForUpdate(this.comment.key)
        .pipe()
        .subscribe(dataSet => {
          this.updateCommentForm.controls.upComment.setValue(dataSet.data().comment);
        });
    }
  }

  deleteComments() {
    this.forumService
      .deleteReplyList('commentID', this.comment.key)
      .subscribe();
    this.forumService.deleteDocment('comment', this.comment.key);
    this.changeCommentCount.emit();
    this.toastr.success('Comment deleted...');
  }

  getReplyCount() {
    this.forumService
      .getCount('reply', 'commentID', this.comment.key)
      .subscribe(count => {
        this.repCount = count;
      });
  }

  changeReactState(current: boolean) {
    this.forumService.changeReact(current, this.user.uid, this.comment.key).then(_ => {
      this.checkReactState();
    });
  }

  checkReactState() {
    this.forumService
      .checkReact(this.user.uid, this.comment.key)
      .subscribe(count => {
        if (count > 0) {
          this.isReact = true;
        } else {
          this.isReact = false;
        }
      });

    this.forumService.countReacts(this.comment.key)
    .subscribe(count => {
      this.reactCount = count;
    });
  }

  changeState(current: boolean) {
    this.forumService.changeCommentState(current, this.comment.key);
  }

  toggelSection() {
    this.section.toggle();
  }

  hidePopover() {
    this.ConfirmDelete.hide();
  }

}
