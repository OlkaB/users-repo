import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

@Injectable()
export class RouteAuthGuardService implements CanActivate {

  constructor(
    private userAuthService: UserAuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let auth;
    this.userAuthService.userToken.subscribe((token) => {
      auth = token !== null && token !== undefined;
    });
    return auth;
  }

}
