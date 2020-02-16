import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';
import { User } from 'firebase';
import { UserDetails } from 'src/app/shared/models/user-details';
import { TranslateService } from '@ngx-translate/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  user: User = JSON.parse(localStorage.getItem('user'));
  userDetails: UserDetails;

  contextMenu: NbMenuItem[] = [
    { title: 'Profile', link: `/profile/${this.user.uid}` },
    { title: 'Sign out' }
  ];
  langMenu: NbMenuItem[] = [
    { title: 'Engilsh' },
    { title: 'සිංහල' },
    { title: 'தமிழ்' }
  ];

  constructor(
    private authService: AuthService,
    private userDetailsService: UserDetailsService,
    public translate: TranslateService,
    private nbMenuService: NbMenuService,
  ) {
    translate.addLangs(['en', 'sl', 'tm']);
    translate.setDefaultLang('en');

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|sl|tm/) ? browserLang : 'en');
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
    this.nbMenuService.onItemClick().subscribe((event) => {
      if (event.item.title === 'Sign out') {
        this.logout();
      }
      if (event.item.title === 'Engilsh') {
        this.changeLanguage('en');
      } else if (event.item.title === 'සිංහල') {
        this.changeLanguage('sl');
      } else if (event.item.title === 'தமிழ்') {
        this.changeLanguage('tm');
      }
    });
  }

  logout() {
    this.authService.SignOut();
  }
}
