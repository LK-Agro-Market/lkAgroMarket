import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';
import { User } from 'firebase';
import { UserDetails } from 'src/app/shared/models/user-details';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  user: User = JSON.parse(localStorage.getItem('user'));
  userDetails: UserDetails;

  constructor(private authService: AuthService, private userDetailsService: UserDetailsService) {}

  ngOnInit() {
    this.userDetailsService
      .getUserDetails(this.user.uid)
      .subscribe(userDetails => {
        this.userDetails = userDetails;
      });
  }

  logout() {
    this.authService.SignOut();
  }
}
