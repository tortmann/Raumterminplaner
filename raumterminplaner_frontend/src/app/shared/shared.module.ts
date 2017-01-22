import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {BonusMilesPipe} from "./pipes/bonusMiles.pipe";
import {MitarbeiterValidator} from "./validators/mitarbeiter.validator";
import {AsyncMitarbeiterValidator} from "./validators/async-mitarbeiter.validator";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BonusMilesPipe,
    MitarbeiterValidator,
    AsyncMitarbeiterValidator
  ],
  providers: [

  ],
  exports: [
    BonusMilesPipe,
    MitarbeiterValidator,
    AsyncMitarbeiterValidator
  ]

})
export class SharedModule {

}
