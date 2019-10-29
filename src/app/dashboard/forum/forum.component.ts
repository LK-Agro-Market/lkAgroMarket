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
    dateTime: new FormControl(''),
  });
  showMsg = '';
  showFarmer =  false;
  showBuyer  = false;

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

  checkValue(event: any) {
    console.log(event.returnValue);
  }

  onSubmit() {
    if (this.formControls.title.errors) {
      return false;
    }
    const title = this.discussionForm.controls.title.value as string;
    const des = this.discussionForm.controls.des.value as string;
    const dateTime = new Date();
    const userId = this.user.uid;
    const userName = this.user.displayName;
    const showFarmer = this.showFarmer;
    const showBuyer = this.showBuyer;
    if ((this.title !== null)  && (this.showFarmer !== false  || this.showBuyer !== false)) {
      this.forumService.createPost(title, des, dateTime, userId, userName, showFarmer, showBuyer);
      this.toggle();
      this.title.setValue('');
      this.des.setValue('');
      this.showMsg =  'success';
    } else {
      this.showMsg = 'error';
    }
  }
}
