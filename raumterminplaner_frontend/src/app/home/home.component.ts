import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {Router} from "@angular/router";

@Component({
  template: `
    <div *ngIf="!givenName" class="jumbotron">
      <a class="navbar-brand"><img src="../../readme_logo.png" class="logoJumbotron" alt="Logo Jumbotron"/></a>
      <h1>Willkommen!</h1>
    </div>    
    <div *ngIf="givenName" class="jumbotron">
      <a class="navbar-brand"><img src="../../readme_logo.png" class="logoJumbotron" alt="Logo Jumbotron"/></a>
      <h1>Willkommen {{givenName}}!</h1>
    </div>
    <div *ngIf="givenName" class="alert alert-success" role="alert">      
      <span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>&nbsp;<b>{{ message }}</b>      
    </div>    
    <div *ngIf="!givenName" class="alert alert-danger" role="alert">
      <button *ngIf="!givenName" class="btn btn-custom" (click)="login()">
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
  public ErrorMessage: string = 'Sie sind derzeit nicht eingeloggt!';

  login(): void {
    this.oauthService.initImplicitFlow();
  }

  get givenName(): string {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;

    return claims.given_name;
  }

}



