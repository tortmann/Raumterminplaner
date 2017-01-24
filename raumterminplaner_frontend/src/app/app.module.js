"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var app_component_1 = require('./app.component');
var forms_1 = require('@angular/forms');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var app_tokens_1 = require('./app.tokens');
var passenger_search_module_1 = require("./mitarbeiter-search/mitarbeiter-search.module.ts");
var app_routes_1 = require("./app.routes");
var home_component_1 = require("./home/home.component");
var angular_oauth2_oidc_1 = require("angular-oauth2-oidc");
//const BASE_URL_FOR_PRODUCTION = "http://www.angular.at/api/securepassenger";
var BASE_URL_FOR_PRODUCTION = "http://localhost:8080/api/mitarbeiters";
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                passenger_search_module_1.PassengerSearchModule,
                app_routes_1.AppRouterModule,
                angular_oauth2_oidc_1.OAuthModule.forRoot()
            ],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent
            ],
            providers: [
                { provide: app_tokens_1.BASE_URL, useValue: BASE_URL_FOR_PRODUCTION }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
