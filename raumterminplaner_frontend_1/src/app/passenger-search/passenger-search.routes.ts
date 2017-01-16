import { Routes, RouterModule } from '@angular/router';
import {PassengerEditComponent} from "./passenger-edit/passenger-edit.component";
import {FlightSearchComponent} from "./flight-search/flight-search.component";
import {PassengerSearchComponent} from "./passenger-search.component";

const PASSENGER_SEARCH_ROUTES: Routes = [
  {
    path: 'flight-search',
    component: FlightSearchComponent
  },
  {
    path: 'passenger-search',
    component: PassengerSearchComponent
  },
  {
    path: 'passenger-edit/:id',
    component: PassengerEditComponent
  }
];

export const PassengerSearchRouterModule
        = RouterModule.forChild(PASSENGER_SEARCH_ROUTES);
