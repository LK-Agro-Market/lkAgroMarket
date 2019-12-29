import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForumService } from './forum.service';
import { Button } from 'protractor';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  discussionForm = new FormGroup({
    title: new FormControl('', Validators.required),
    des: new FormControl('')
  });

  showFarmer = true;
  showBuyer = true;
  showMyPost = false;
  isShow = false;
  isHovering: boolean;
  images: File[] = [];

  @ViewChild('item', { static: false }) accordion;
  @ViewChild('imageDrop', { static: false }) imageDrop;

  constructor(private forumService: ForumService) {}

  user: User = JSON.parse(localStorage.getItem('user'));
  formControls = this.discussionForm.controls;

  get title() {
    return this.discussionForm.get('title');
  }
  get des() {
    return this.discussionForm.get('des');
  }

  toggle() {
    this.accordion.toggle();
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  ngOnInit() {}

  changePostType(showMyPost: boolean) {
    // set post type
    this.showMyPost = showMyPost;
  }

  onSelect(event) {
    // get inserted file
    for (let i = 0; i < event.addedFiles.length; i++) {
      if (
        event.addedFiles[i].type === 'image/jpeg' ||
        event.addedFiles[i].type === 'image/png'
      ) {
        this.images.push(event.addedFiles[i]);
      } else {
        // need to edit
        console.log('you can upload images only');
      }
    }
  }

  onRemove(event) {
    // remove upload file
    this.images.splice(this.images.indexOf(event), 1);
  }

  onCreate() {
    // create  post
    const id = this.forumService.getPostId();
    const title = this.discussionForm.controls.title.value as string;
    const des = this.discussionForm.controls.des.value as string;
    const dateTime = new Date();
    const userId = this.user.uid;
    const userName = this.user.displayName;
    const userImage = this.user.photoURL;
    const showFarmer = this.showFarmer;
    const showBuyer = this.showBuyer;

    if (this.discussionForm.valid) {
      if (this.showFarmer === true || this.showBuyer === true) {
        this.forumService.createPost(
          id,
          title,
          des,
          dateTime,
          userId,
          userName,
          userImage,
          showFarmer,
          showBuyer,
          false
        );
        // this.showToast('success');
        this.discussionForm.reset();
        this.toggle();
        if (this.images != null) {
          this.forumService.uploadImg(this.images, 'post', id);
        }
      } else {
        // else of check farmers and buyers
      }
    } else {
      // else of form validation check
    }
  }
}
