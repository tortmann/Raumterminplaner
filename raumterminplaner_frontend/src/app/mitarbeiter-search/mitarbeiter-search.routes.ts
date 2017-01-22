import { Routes, RouterModule } from '@angular/router';
import {MitarbeiterEditComponent} from "./mitarbeiter-edit/mitarbeiter-edit.component";
import {FlightSearchComponent} from "./flight-search/flight-search.component";
import {MitarbeiterSearchComponent} from "./mitarbeiter-search.component";

const MITARBEITER_SEARCH_ROUTES: Routes = [
  {
    path: 'flight-search',
    component: FlightSearchComponent
  },
  {
    path: 'mitarbeiter-search',
    component: MitarbeiterSearchComponent
  },
  {
    path: 'mitarbeiter-edit/:id',
    component: MitarbeiterEditComponent
  }
];

export const MitarbeiterSearchRouterModule
        = RouterModule.forChild(MITARBEITER_SEARCH_ROUTES);
