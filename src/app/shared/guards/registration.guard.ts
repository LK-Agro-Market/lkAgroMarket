import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { UserDetailsService } from '../services/user-details.service';
import { switchMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuard implements CanActivate {
  constructor(
    private userDetailsService: UserDetailsService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userDetailsService.haveUserDetails.pipe(
      first(),
      switchMap(res => {
        if (res === true) {
          return of(true);
        } else {
          this.router.navigate(['registration']);
        }
      })
    );
  }
}
