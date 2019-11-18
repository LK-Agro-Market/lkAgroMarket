import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ForumService } from '../forum.service';

@Component({
  selector: 'app-list-forum',
  templateUrl: './list-forum.component.html',
  styleUrls: ['./list-forum.component.scss']
})
export class ListForumComponent implements OnInit {
  items: any[];
  postUser: any;

  constructor(private forumService: ForumService) {}

  ngOnInit() {
    this.forumService
      .getPost()
      .pipe()
      .subscribe(items => {
        this.items = items;
      });
  }
}
