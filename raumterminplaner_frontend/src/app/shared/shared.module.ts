import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {RaumBezeichnungPipe} from "./pipes/raumBezeichnung.pipe";
import {MitarbeiterValidator} from "./validators/mitarbeiter.validator";
import {AsyncMitarbeiterValidator} from "./validators/async-mitarbeiter.validator";
import {MitarbeiterFullNamePipe} from "./pipes/mitarbeiterFullName.pipe";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RaumBezeichnungPipe,
    MitarbeiterFullNamePipe,
    MitarbeiterValidator,
    AsyncMitarbeiterValidator
  ],
  providers: [

  ],
  exports: [
    RaumBezeichnungPipe,
    MitarbeiterFullNamePipe,
    MitarbeiterValidator,
    AsyncMitarbeiterValidator
  ]

})
export class SharedModule {

}
