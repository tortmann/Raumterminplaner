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

    // URL of the SPA to redirect the user to after login
    this.oauthService.redirectUri = window.location.origin + "/index.html";

    // The SPA's id. The SPA is registerd with this id at the auth-server
    this.oauthService.clientId = "spa-demo";

    // set the scope for the permissions the client should request
    // The first three are defined by OIDC. The 4th is a usecase-specific one
    this.oauthService.scope = "openid profile email voucher";

    // set to true, to receive also an id_token via OpenId Connect (OIDC) in addition to the
    // OAuth2-based access_token
    this.oauthService.oidc = true; // ID_Token

    // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
    // instead of localStorage
    this.oauthService.setStorage(sessionStorage);

    // Discovery Document of your AuthServer as defined by OIDC
    let url = 'https://steyer-identity-server.azurewebsites.net/identity/.well-known/openid-configuration';

    // Load Discovery Document and then try to login the user
    this.oauthService.loadDiscoveryDocument(url).then(() => {

      // This method just tries to parse the token(s) within the url when
      // the auth-server redirects the user back to the web-app
      // It dosn't send the user the the login page
      this.oauthService.tryLogin({});

    });

  }

  /*
  public isCollapsed: boolean = true;

  checkAutorization(): boolean {

    let userIsAuthorized = this.oauthService.hasValidAccessToken();
    if(userIsAuthorized == false && this.router.url != "/home"){
      this.router.navigate(['home']);
    }

    return userIsAuthorized;

  }
  */

  get givenName(): string {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;

    return claims.given_name;
  }


}
