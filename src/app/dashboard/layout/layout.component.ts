import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'firebase';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  logout() {
    this.authService.SignOut();
  }
}
