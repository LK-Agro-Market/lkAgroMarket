import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForumService } from './forum.service';
import { AngularFireUploadTask, AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable, forkJoin } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { mergeMap, map, finalize, tap } from 'rxjs/operators';

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

  tasks: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  fileRef: AngularFireStorageReference;
  isHovering: boolean;
  downUrl;

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

  getImg(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const path = `forum/post/${Date.now()}_${files.item(i).name}`;
      const fileRef = this.storage.ref(path);
      this.tasks = this.storage.upload(path, files.item(i));
      this.percentage = this.tasks.percentageChanges();
      this.tasks.snapshotChanges().pipe(
        finalize( async () =>  {
          this.downUrl = await fileRef.getDownloadURL().toPromise();
        }),
      ).subscribe();
    }
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  onCreate() {
    this.uploadPost();
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
    const imageURL = 'asdaasdads';

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
