import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';
import { User } from 'firebase';
import { UserDetails } from 'src/app/shared/models/user-details';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  user: User = JSON.parse(localStorage.getItem('user'));
  userDetails: UserDetails;

  constructor(
    private authService: AuthService,
    private userDetailsService: UserDetailsService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'sl', 'tm']);
    translate.setDefaultLang('en');

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|sl|tm/) ? browserLang : 'en');
    // translate.use('sl')
  }
  changeLanguage(lang) {
    this.translate.use(lang);
  }

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
