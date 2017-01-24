import { Routes, RouterModule } from '@angular/router';
import {TerminSearchComponent} from "./termin-search.component";
import {TerminEditComponent} from "./termin-edit/termin-edit.component";

const TERMIN_SEARCH_ROUTES: Routes = [
  {
    path: 'termin-search',
    component: TerminSearchComponent
  },
  {
    path: 'termin-edit/:id',
    component: TerminEditComponent
  }
];

export const TerminSearchRouterModule
  = RouterModule.forChild(TERMIN_SEARCH_ROUTES);
