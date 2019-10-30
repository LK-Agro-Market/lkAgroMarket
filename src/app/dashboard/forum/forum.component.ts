import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ForumService } from './forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})

export class ForumComponent implements OnInit {
  discussionForm = new FormGroup({
    title: new FormControl('', Validators.required),
    des: new FormControl(''),
  });

  showMsg = '';
  massage = '';
  showFarmer =  true;
  showBuyer  = true;

  get title() {
    return this.discussionForm.get('title');
  }
  get des() {
    return this.discussionForm.get('des');
  }

  user: User = JSON.parse(localStorage.getItem('user'));
  formControls = this.discussionForm.controls;

  @ViewChild('item', { static: false }) accordion;

  toggle() {
    this.accordion.toggle();
  }

  constructor(private forumService: ForumService) {}

  ngOnInit() {}

  onSubmit() {
    const title = this.discussionForm.controls.title.value as string;
    const des = this.discussionForm.controls.des.value as string;
    const dateTime = new Date();
    const userId = this.user.uid;
    const userName = this.user.displayName;
    const showFarmer = this.showFarmer;
    const showBuyer = this.showBuyer;

    if (this.title !== null) {
      if (this.showFarmer === true || this.showBuyer === true) {
        this.forumService.createPost(title, des, dateTime, userId, userName, showFarmer, showBuyer);
        this.toggle();
        this.title.setValue('');
        this.des.setValue('');
        this.showMsg =  'success';
        this.massage = 'You have been successfully submitted!';
      } else {
          this.showMsg = 'error';
          this.massage = 'please chose category';
      }
    } else {
      this.showMsg = 'error';
      this.massage = 'title is required';
    }
  }
}
