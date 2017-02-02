import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {TerminSearchComponent} from "./termin-search.component";
import {TerminEditComponent} from "./termin-edit/termin-edit.component";
import {TerminService} from "./services/termin.service";
import {TerminCardComponent} from "./termin-card.component";
import {AppRouterModule} from "../app.routes";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AppRouterModule
  ],
  declarations: [
    TerminSearchComponent,
    TerminCardComponent,
    TerminEditComponent
  ],
  providers: [
    TerminService
  ]
})
export class TerminSearchModule {

}
