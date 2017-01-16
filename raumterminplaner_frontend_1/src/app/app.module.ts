import { NgModule } from '@angular/core'
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {BASE_URL} from './app.tokens';
import {PassengerSearchComponent} from "./passenger-search/passenger-search.component";
import {PassengerService} from "./passenger-search/services/passenger.service";
import {BonusMilesPipe} from "./shared/pipes/bonusMiles.pipe";
import {PassengerSearchModule} from "./passenger-search/passenger-search.module";
import {AppRouterModule} from "./app.routes";
import {HomeComponent} from "./home/home.component";
import {OAuthModule} from "angular-oauth2-oidc";
//const BASE_URL_FOR_PRODUCTION = "http://www.angular.at/api/securepassenger";
const BASE_URL_FOR_PRODUCTION = "http://localhost:8080/api/passengers";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PassengerSearchModule,
    AppRouterModule,
    OAuthModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [
    { provide: BASE_URL, useValue: BASE_URL_FOR_PRODUCTION}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
