import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { CommentService } from 'src/app/dashboard/view-demand-ad/comment.service'
import { Reply } from 'src/app/shared/models/reply-comment-ad';


@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

  @Input('parentdocId') public paraentdocId: string;


  user: User = JSON.parse(localStorage.getItem('user'));  

  constructor(
    private commentservice: CommentService,
  ) {
    this.Rcomment = new Reply();
  }

  comments: any;
  

  ngOnInit() {
    this.commentservice.getreplycomments(this.paraentdocId).subscribe(actionArray=>{
      this.comments=actionArray;
    })
    
   
  }

  onComment(Rcomment) {
    this.commentservice.addreplycmt(Rcomment).then(_ => {
      this.Rcomment = new Reply();
    });
  }

  onDelete(pass) {
    this.commentservice.deleteReplay(pass);
  }

  Rcomment: Reply = {
    docId: '',
    userName: this.user.displayName,
    date: new Date(),
    content: '',
    paraentdocId:this.paraentdocId
  };

  on(comm) {
    const Rcomment: Reply = {
      docId: '',
      userName: this.user.displayName,
      date: new Date(),
      content: comm,
      paraentdocId: this.paraentdocId
    };
    this.onComment(Rcomment);
  }
}

