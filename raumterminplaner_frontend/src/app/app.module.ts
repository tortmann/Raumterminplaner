import { NgModule } from '@angular/core'
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {BASE_URL} from './app.tokens';
import {MitarbeiterSearchModule} from "./mitarbeiter-search/mitarbeiter-search.module";
import {AppRouterModule} from "./app.routes";
import {HomeComponent} from "./home/home.component";
import {OAuthModule} from "angular-oauth2-oidc";
import {TerminSearchModule} from "./termin-search/termin-search.module";
import {RaumSearchModule} from "./raum-search/raum-search.module";
import {UrlGuard} from "./url.guard";

const BASE_URL_FOR_PRODUCTION = "http://localhost:8081/api/";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MitarbeiterSearchModule,
    TerminSearchModule,
    RaumSearchModule,
    AppRouterModule,
    OAuthModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [
    { provide: BASE_URL, useValue: BASE_URL_FOR_PRODUCTION},UrlGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
