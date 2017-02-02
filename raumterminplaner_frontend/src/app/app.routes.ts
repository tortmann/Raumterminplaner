import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {MitarbeiterSearchComponent} from "./mitarbeiter-search/mitarbeiter-search.component";
import {UrlGuard} from "./url.guard";
import {MitarbeiterEditComponent} from "./mitarbeiter-search/mitarbeiter-edit/mitarbeiter-edit.component";
import {RaumSearchComponent} from "./raum-search/raum-search.component";
import {RaumEditComponent} from "./raum-search/raum-edit/raum-edit.component";
import {TerminEditComponent} from "./termin-search/termin-edit/termin-edit.component";
import {TerminSearchComponent} from "./termin-search/termin-search.component";

const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'mitarbeiter-search',
    component: MitarbeiterSearchComponent,
    canActivate: [ UrlGuard ]
  },
  {
    path: 'mitarbeiter-edit/:id',
    component: MitarbeiterEditComponent,
    canActivate: [ UrlGuard ]
  },
  {
    path: 'termin-search',
    component: TerminSearchComponent,
    canActivate: [ UrlGuard ]
  },
  {
    path: 'termin-edit/:id',
    component: TerminEditComponent,
    canActivate: [ UrlGuard ]
  },
  {
    path: 'raum-search',
    component: RaumSearchComponent,
    canActivate: [ UrlGuard ]
  },
  {
    path: 'raum-edit/:id',
    component: RaumEditComponent,
    canActivate: [ UrlGuard ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }

];

export const AppRouterModule
                = RouterModule.forRoot(APP_ROUTES);

