import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForumService } from './forum.service';
import { AngularFireUploadTask, AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize, first, tap } from 'rxjs/operators';

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

  tasks: Observable<any>;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  fileRef: AngularFireStorageReference;
  isHovering: boolean;
  path;
  url;
  isFileAdd = false;
  fileSet: FileList;

  @ViewChild('item', { static: false }) accordion;

  constructor(
    private forumService: ForumService,
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) { }

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

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  checkFiles(event: FileList) {
    if (event.length === 0) {
      this.isFileAdd = false;
    } else {
      console.log('file add');
      this.isFileAdd = true;
      this.fileSet = event;
    }
  }

  uploadImage(event: FileList) {
    const file = event.item(0);

    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type ');
      return;
    }
    this.path = `forum/post/${new Date().getTime()}_${file.name}`;
    this.fileRef = this.storage.ref(this.path);
    const customMetadata = { app: 'My AngularFire-powered PWA!' };
    const task = this.storage.upload(this.path, file, { customMetadata });

    this.percentage = task.percentageChanges();
    this.snapshot = task.snapshotChanges();
    return task.snapshotChanges();
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  onCreate() {
    if (this.isFileAdd) {
      this.uploadImage(this.fileSet).pipe(tap(c => console.log(c))).subscribe({
        next: (p) => {},
        error: (err) => {},
        complete: () => {
          const url = this.fileRef.getDownloadURL();
          if (url) {
            url.subscribe(downUrl => {
              this.url = downUrl;
              this.uploadPost();
            });
          }
        }
      });
    } else {
      this.uploadPost();
    }
  }

  uploadPost() {
    // create  post

    const title = this.discussionForm.controls.title.value as string;
    const des = this.discussionForm.controls.des.value as string;
    const dateTime = new Date();
    const userId = this.user.uid;
    const userName = this.user.displayName;
    const userImage = this.user.photoURL;
    const showFarmer = this.showFarmer;
    const showBuyer = this.showBuyer;
    let imageURL;
    if (this.isFileAdd) {
      imageURL = this.ur;
    } else {
      imageURL = 'null';
    }

    console.log(imageURL);
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
          imageURL
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
