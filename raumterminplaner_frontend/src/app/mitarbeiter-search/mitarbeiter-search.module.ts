import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MitarbeiterSearchComponent} from "./mitarbeiter-search.component";
import {MitarbeiterCardComponent} from "./mitarbeiter-card.component";
import {SharedModule} from "../shared/shared.module";
import {MitarbeiterSearchRouterModule} from "./mitarbeiter-search.routes";
import {MitarbeiterEditComponent} from "./mitarbeiter-edit/mitarbeiter-edit.component";
import {FlightSearchComponent} from "./flight-search/flight-search.component";
import {MitarbeiterService} from "./services/mitarbeiter.service";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MitarbeiterSearchRouterModule
  ],
  declarations: [
    MitarbeiterSearchComponent,
    MitarbeiterCardComponent,
    MitarbeiterEditComponent
  ],
  providers: [
    MitarbeiterService
  ]
})
export class MitarbeiterSearchModule {

}
