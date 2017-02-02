import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {Router} from "@angular/router";

@Component({
  template: `
    <div *ngIf="givenName" class="alert alert-success" role="alert">      
      <span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>&nbsp;<b>{{ message }}</b>      
    </div>
    
    <div *ngIf="!givenName" class="alert alert-success" role="alert">
      <button *ngIf="!givenName" class="btn btn-loginLogout" (click)="login()">
        <span class="glyphicon glyphicon-log-in" aria-hidden="true"></span>
      </button>
      &nbsp;&nbsp;<span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>&nbsp;<b>{{ ErrorMessage }}</b>
    </div> 
  `,
  styleUrls: ['../css/custom.css']
})
export class HomeComponent {

  constructor(private oauthService: OAuthService, private router: Router) {
  }

  public message: string = 'Sie sind nun eingeloggt!';
  public ErrorMessage: string = 'Willkommen, bitte loggen Sie sich ein!';

  login(): void {
    this.oauthService.initImplicitFlow();
  }

  get givenName(): string {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;

    return claims.given_name;
  }

}



