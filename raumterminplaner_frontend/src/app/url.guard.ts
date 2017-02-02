import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';
import {HomeComponent} from "./home/home.component";

@Injectable()
export class UrlGuard implements CanActivate {

  constructor(private oauthService: OAuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    var hasIdToken = this.oauthService.hasValidIdToken();
    var hasAccessToken = this.oauthService.hasValidAccessToken();

    if(!hasIdToken && !hasAccessToken){
      this.router.navigate(['home']);
    }

    return (hasIdToken && hasAccessToken);
  }
}
