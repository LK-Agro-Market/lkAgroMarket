import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { UserDetailsService } from '../services/user-details.service';

@Injectable({
  providedIn: 'root'
})
export class RegiReverseGuard implements CanActivate {
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
          this.router.navigate(['']);
        } else {
          return of(true);
        }
      })
    );
  }
}
