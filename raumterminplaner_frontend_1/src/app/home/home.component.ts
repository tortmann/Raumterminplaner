
import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  template: `
    <h1 *ngIf="!givenName">Willkommen!</h1>
    <h1 *ngIf="givenName">Willkommen, {{givenName}}!</h1>
    
    <button class="btn btn-default" (click)="login()">Login</button>
    <button class="btn btn-default" (click)="logout()">Logout</button>
  `
})
export class HomeComponent {

  constructor(private oauthService: OAuthService) {
  }

  login(): void {
    this.oauthService.initImplicitFlow();
  }

  logout(): void {
    this.oauthService.logOut();
  }

  get givenName(): string {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;

    return claims.given_name;
  }

}



