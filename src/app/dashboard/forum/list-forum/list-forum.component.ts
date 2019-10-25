import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ForumService } from '../forum.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list-forum',
  templateUrl: './list-forum.component.html',
  styleUrls: ['./list-forum.component.scss']
})
export class ListForumComponent implements OnInit {
  items: any[];
  constructor(private forumService: ForumService) {}

  ngOnInit() {
    this.forumService.getAll().pipe().subscribe(items => {
      this.items = items;
    });
  }
}
