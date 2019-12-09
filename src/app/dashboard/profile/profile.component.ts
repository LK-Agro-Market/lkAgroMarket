import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { ProfileService } from './profile.service';
import { UserDetails } from 'src/app/shared/models/user-details';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  attempted = false;
  processing = false;

  viewer: User = JSON.parse(localStorage.getItem('user'));
  profileOwnerId: string = '';
  profileOwnerUser: User;
  selectedUserType: string = '';
  numOfFollowers: number = 0;
  isViewerFollowThisProfile: boolean;

  userDetailsForm: FormGroup;
  latitude: number;
  longitude: number;

  get formControls() {
    return this.userDetailsForm.controls;
  }

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userDetailsForm = this.formBuilder.group({
      nic: [
        '',
        [
          Validators.required,
          Validators.pattern('^([0-9]{9}[x|X|v|V]|[0-9]{12})$')
        ]
      ],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      district: ['', Validators.required],
      homeAddress: ['', Validators.required],
      businessAddress: ['', Validators.required],
      organization: ['', Validators.required],
      designation: ['', Validators.required],
      organizationAddress: ['', Validators.required]
    });
    this.subscriptions.push(
      this.route.params.subscribe(routeParams => {
        this.profileOwnerId = routeParams.profileOwner;
        this.profileService
          .getProfileOwner(this.profileOwnerId)
          .subscribe(user => {
            this.profileOwnerUser = user;
            this.subscriptions.push(
              this.profileService
                .getFollowers(this.profileOwnerUser)
                .subscribe(follows => {
                  this.numOfFollowers = follows.length;
                  const viewerInFollowers = follows.filter(follow => {
                    return follow.follower == this.viewer.uid;
                  });
                  if (viewerInFollowers.length > 0) {
                    this.isViewerFollowThisProfile = true;
                  } else {
                    this.isViewerFollowThisProfile = false;
                  }
                })
            );
          });
        this.profileService
          .getProfileOwnerUserDetails(this.profileOwnerId)
          .subscribe(userDetails => {
            this.userDetailsForm.patchValue({
              nic: userDetails.nic,
              contact: userDetails.contact,
              district: userDetails.district,
              homeAddress: userDetails.homeAddress,
              businessAddress: userDetails.businessAddress,
              organization: userDetails.organization,
              designation: userDetails.designation,
              organizationAddress: userDetails.organizationAddress
            });
            this.selectedUserType = userDetails.userLevel;
            this.longitude = userDetails.longitude;
            this.latitude = userDetails.latitude;
          });
      })
    );
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }

  updateProfile() {
    this.attempted = true;
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
    this.processing = true;

    const userDetails: Partial<UserDetails> = {
      longitude: this.longitude,
      latitude: this.latitude,
      nic: this.formControls.nic.value,
      contact: this.formControls.contact.value,
      district: this.formControls.district.value,
      homeAddress: this.formControls.homeAddress.value,
      businessAddress: this.formControls.businessAddress.value,
      organization: this.formControls.organization.value,
      designation: this.formControls.designation.value,
      organizationAddress: this.formControls.organization.value
    };
    this.subscriptions.push(
      this.profileService
        .updateProfile(userDetails, this.profileOwnerId)
        .subscribe(() => {
          this.processing = false;
          this.attempted = false;
          this.toastr.success('Updated your profile info');
        })
    );
  }

  followUser() {
    this.subscriptions.push(
      this.profileService
        .followUser(this.profileOwnerUser, this.viewer.uid)
        .subscribe()
    );
  }

  unfollowUser() {
    this.subscriptions.push(
      this.profileService
        .unfollowUser(this.profileOwnerUser, this.viewer.uid)
        .subscribe()
    );
  }
}
