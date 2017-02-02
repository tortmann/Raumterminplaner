import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {MitarbeiterSearchComponent} from "./mitarbeiter-search/mitarbeiter-search.component";
import {UrlGuard} from "./url.guard";


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
    path: '**',
    redirectTo: 'home'
  }

];

export const AppRouterModule
                = RouterModule.forRoot(APP_ROUTES);

