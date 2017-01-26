import { Routes, RouterModule } from '@angular/router';
import {RaumSearchComponent} from "./raum-search.component";
import {RaumEditComponent} from "./raum-edit/raum-edit.component";

const RAUM_SEARCH_ROUTES: Routes = [
  {
    path: 'raum-search',
    component: RaumSearchComponent
  },
  {
    path: 'raum-edit/:id',
    component: RaumEditComponent
  }
];

export const RaumSearchRouterModule
  = RouterModule.forChild(RAUM_SEARCH_ROUTES);
