import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PassengerSearchComponent} from "./passenger-search.component";
import {PassengerCardComponent} from "./passenger-card.component";
import {SharedModule} from "../shared/shared.module";
import {PassengerSearchRouterModule} from "./passenger-search.routes";
import {PassengerEditComponent} from "./passenger-edit/passenger-edit.component";
import {FlightSearchComponent} from "./flight-search/flight-search.component";
import {PassengerService} from "./services/passenger.service";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PassengerSearchRouterModule
  ],
  declarations: [
    PassengerSearchComponent,
    PassengerCardComponent,
    PassengerEditComponent,
    FlightSearchComponent
  ],
  providers: [
    PassengerService
  ]
})
export class PassengerSearchModule {

}
