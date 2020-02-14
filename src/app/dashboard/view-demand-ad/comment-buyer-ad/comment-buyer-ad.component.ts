import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/models/comment-ad';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-buyer-ad',
  templateUrl: './comment-buyer-ad.component.html',
  styleUrls: ['./comment-buyer-ad.component.scss']
})
export class CommentBuyerAdComponent implements OnInit {
  user: User = JSON.parse(localStorage.getItem('user'));
  comments$: Observable<any[]>;

  constructor(
    private commentservice: CommentService,
    private route: ActivatedRoute
  ) {
    this.comment = new Comment();
    this.viewReply = '';
  }

  cmt: any;

  COMMENTS_REF: string = 'comments';
  COL_NODE: string;

  viewReply: string;
  editComment: string;

  adId = this.getadId();
  ngOnInit() {
    this.cmt = this.commentservice.getcomments(this.adId);
  }

  onComment(comment) {
    this.commentservice.add(comment).then(_ => {
      this.comment = new Comment();
    });
  }

  getadId() {
    let id = this.route.snapshot.paramMap.get('demandAdid');
    return id;
  }

  onEdit(comment: Comment) {
    this.commentservice.update(comment.docId, comment).then(_ => {
      this.editComment = '';
    });
  }

  onDelete(pass) {
    this.commentservice.delete(pass);
  }

  comment: Comment = {
    adId: this.getadId(),
    userName: this.user.displayName,
    date: new Date(),
    content: '',
    docId: ''
  };

  on(comm) {
    const comment: Comment = {
      adId: this.getadId(),
      userName: this.user.displayName,
      date: new Date(),
      content: comm.content,
      docId: ''
    };
    this.onComment(comment);
  }
}
