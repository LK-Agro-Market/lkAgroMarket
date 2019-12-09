import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForumService } from './forum.service';

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

  isHovering: boolean;
  urlList: FileList;

  @ViewChild('item', { static: false }) accordion;

  constructor(
    private forumService: ForumService,
  ) { }

  user: User = JSON.parse(localStorage.getItem('user'));
  formControls = this.discussionForm.controls;

  ngOnInit() {
  }

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

  changePostType(showMyPost: boolean) {
    this.showMyPost = showMyPost;
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  onCreate() {
    this.uploadPost();
  }

  getFile(files: FileList) {
    if (files.length > 0) {
      this.urlList = files;
    }
  }

  uploadPost() {
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
          false,
        );
        // this.showToast('success');
        this.title.setValue('');
        this.des.setValue('');
        this.toggle();
        if (this.urlList != null) {
          this.forumService.uploadImg(this.urlList, 'post', id);
        }

      } else {
        // else of check farmers and buyers
      }

    } else {
      // else of form validation check
    }
  }


}
