import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileOwnerId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.profileOwnerId = this.route.snapshot.paramMap.get('profileOwner');
  }
}
