import {Component, NgModule} from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {Router} from "@angular/router";


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./custom.css']
})

export class AppComponent {

  constructor(private oauthService: OAuthService, private router: Router) {

    this.oauthService.redirectUri = window.location.origin + "/index.html";
    this.oauthService.clientId = "spa-demo";
    this.oauthService.scope = "openid profile email voucher";
    this.oauthService.oidc = true;
    this.oauthService.setStorage(sessionStorage);
    let url = 'https://steyer-identity-server.azurewebsites.net/identity/.well-known/openid-configuration';
    this.oauthService.loadDiscoveryDocument(url).then(() => {
      this.oauthService.tryLogin({});

    });

  }

  logout(): void {
    this.oauthService.logOut();
    this.router.navigate(['home']);
  }

  get givenName(): string {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;

    return claims.given_name;
  }


}
