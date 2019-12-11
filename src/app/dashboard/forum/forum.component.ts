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
  urlList: FileList;
  files: File[] = [];

  @ViewChild('item', { static: false }) accordion;
  @ViewChild('imageDrop', { static: false }) imageDrop;

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

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onCreate() {
    this.uploadPost();
  }

  // getFile(files: FileList) {
  //   if (files.length > 0) {
  //     this.urlList = files;
  //     this.isShow = true;
  //   }
  // }

  // allowDrop(e) {
  //   e.preventDefault();
  // }

  // drop(e) {
  //   e.preventDefault();
  //   this.readfiles(e.dataTransfer.files);
  // }

  // checkfiles(files: FileList) {
  //   this.readfiles(files);
  // }

  // readfiles(files: FileList) {
  //   for ( let i = 0; i < files.length; i++) {
  //     const reader = new FileReader();
  //     reader.onload =  (event) => {
  //       const image = new Image();
  //       // const btn =  new Button();
  //       const fileReader = event.target as FileReader;
  //       image.src = fileReader.result as string;
  //       image.width = 100;
  //       this.imageDrop.nativeElement.appendChild(image);
  //     };
  //     reader.readAsDataURL(files[i]);
  //   }
  // }

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
        this.discussionForm.reset();
        this.toggle();
        // if (this.urlList != null) {
        //   this.forumService.uploadImg(this.urlList, 'post', id);
        // }

      } else {
        // else of check farmers and buyers
      }

    } else {
      // else of form validation check
    }
  }


}
