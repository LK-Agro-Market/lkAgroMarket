import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileOwnerId: string = '';
  image1ChangedEvent: any = '';
  supplyAdForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.profileOwnerId = this.route.snapshot.paramMap.get('profileOwner');
    this.supplyAdForm = this.formBuilder.group({
      image1: ['']
    });
  }

  file1ChangeEvent(event: any): void {
    this.image1ChangedEvent = event;
  }
  image1Cropped(event: ImageCroppedEvent) {
    this.supplyAdForm.patchValue({ image1: event.base64 });
    console.log(this.supplyAdForm.value.image1);
  }
}
