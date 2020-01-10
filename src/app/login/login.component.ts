import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {
    window.document.body.style.backgroundImage =
      'url("../../assets/login-background.jpg")';
    window.document.body.style.backgroundPosition = 'center center';
    window.document.body.style.backgroundSize = 'cover';
    window.document.body.style.backgroundRepeat = 'fixed';
    window.document.body.style.backgroundAttachment = 'fixed';
  }
}
