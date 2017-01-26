
import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  template: `
    <h1 *ngIf="!givenName">Willkommen, bitte loggen Sie sich ein!</h1>
    <h1 *ngIf="givenName"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>&nbsp;Sie sind nun eingeloggt!</h1>
    
    <button *ngIf="!givenName" class="btn btn-success" (click)="login()">Login</button>
    <button *ngIf="givenName" class="btn btn-danger" (click)="logout()">Logout</button>
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



