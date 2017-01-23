"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var APP_ROUTES = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
exports.AppRouterModule = router_1.RouterModule.forRoot(APP_ROUTES);
