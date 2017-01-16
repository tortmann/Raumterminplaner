import {NgModule} from "@angular/core";
import { CommonModule} from '@angular/common';
import {BonusMilesPipe} from "./pipes/bonusMiles.pipe";
import {PassengerValidator} from "./validators/passenger.validator";
import {AsyncPassengerValidator} from "./validators/async-passenger.validator";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BonusMilesPipe,
    PassengerValidator,
    AsyncPassengerValidator
  ],
  providers: [

  ],
  exports: [
    BonusMilesPipe,
    PassengerValidator,
    AsyncPassengerValidator
  ]

})
export class SharedModule {

}
