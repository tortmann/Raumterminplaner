import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {TerminSearchRouterModule} from "./termin-search.routes";
import {TerminSearchComponent} from "./termin-search.component";
import {TerminEditComponent} from "./termin-edit/termin-edit.component";
import {TerminService} from "./services/termin.service";
import {TerminCardComponent} from "./termin-card.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TerminSearchRouterModule
  ],
  declarations: [

    TerminSearchComponent,
    TerminCardComponent,
    TerminEditComponent,


  ],
  providers: [
    TerminService
  ]
})
export class TerminSearchModule {

}
