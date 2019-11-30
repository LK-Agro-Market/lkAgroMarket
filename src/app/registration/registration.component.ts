import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { User } from '../shared/models/user';
import { UserDetails } from '../shared/models/user-details';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  constructor(
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone
  ) {}

  selectedUserType = 'Farmer';
  latitude = 6.9497;
  longitude = 80.7891;
  userDetailsForm = new FormGroup({
    nic: new FormControl('', [
      Validators.required,
      Validators.pattern('^([0-9]{9}[x|X|v|V]|[0-9]{12})$')
    ]),
    contact: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')
    ]),
    district: new FormControl('Colombo', Validators.required),
    homeAddress: new FormControl('', Validators.required),
    businessAddress: new FormControl('', Validators.required),
    organization: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    organizationAddress: new FormControl('', Validators.required)
  });
  formControls = this.userDetailsForm.controls;

  gotAllInfo = false;

  ngOnInit() {
    window.document.body.style.backgroundImage =
      'url("../../assets/login-background.jpg")';
    window.document.body.style.backgroundPosition = 'center center';
    window.document.body.style.backgroundSize = 'cover';
    window.document.body.style.backgroundRepeat = 'fixed';
    window.document.body.style.backgroundAttachment = 'fixed';
    const layouts = Array.from(
      window.document.getElementsByClassName('layout')
    );
    for (const layout of layouts) {
      const slide = layout as HTMLElement;
      slide.style.background = 'transparent';
      slide.style.minHeight = '20em';
    }
  }

  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }

  submit() {
    if (this.formControls.nic.errors || this.formControls.contact.errors) {
      return false;
    }
    if (
      this.selectedUserType === 'Farmer' &&
      this.formControls.homeAddress.errors
    ) {
      return false;
    }
    if (this.selectedUserType === 'Buyer') {
      if (
        this.formControls.homeAddress.errors ||
        this.formControls.businessAddress.errors
      ) {
        return false;
      }
    }
    if (this.selectedUserType === 'Adminis') {
      if (
        this.formControls.organization.errors ||
        this.formControls.designation.errors ||
        this.formControls.organizationAddress.errors
      ) {
        return false;
      }
    }

    let userDetails: UserDetails;
    userDetails = {
      userLevel: this.selectedUserType,
      longitude: this.longitude,
      latitude: this.latitude,
      nic: this.formControls.nic.value,
      contact: this.formControls.contact.value,
      district: this.formControls.district.value,
      homeAddress: this.formControls.homeAddress.value,
      businessAddress: this.formControls.businessAddress.value,
      organization: this.formControls.organization.value,
      designation: this.formControls.designation.value,
      organizationAddress: this.formControls.organization.value,
      createdAt: new Date()
    };

    const user: User = JSON.parse(localStorage.getItem('user'));
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `userDetails/${user.uid}`
    );
    userRef
      .set(userDetails, {
        merge: true
      })
      .then(() => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
      });
  }
}
