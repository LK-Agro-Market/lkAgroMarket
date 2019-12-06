import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForumService } from './forum.service';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';

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

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;

  @ViewChild('item', { static: false }) accordion;

  constructor(
    private forumService: ForumService,
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {}

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

  ngOnInit() {
  }

  changePostType(showMyPost: boolean) {
    this.showMyPost = showMyPost;
  }

// file uploading

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);

    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type ');
      return;
    }
    const path = `test/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(path);
    const customMetadata = { app: 'My AngularFire-powered PWA!' };
    const task = this.storage.upload(path, file, { customMetadata });

    this.percentage = task.percentageChanges();
    this.snapshot   = task.snapshotChanges();
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL())
    ).subscribe();
    console.log(fileRef.getDownloadURL());
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

// ---------

  onCreate() {
    // create  post
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
      } else {
        // this.showToast('danger');
      }
    } else {
    }
  }


  



}
