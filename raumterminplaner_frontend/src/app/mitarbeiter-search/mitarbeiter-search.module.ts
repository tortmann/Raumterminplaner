import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MitarbeiterSearchComponent} from "./mitarbeiter-search.component";
import {MitarbeiterCardComponent} from "./mitarbeiter-card.component";
import {SharedModule} from "../shared/shared.module";
import {MitarbeiterEditComponent} from "./mitarbeiter-edit/mitarbeiter-edit.component";
import {MitarbeiterService} from "./services/mitarbeiter.service";
import {AppRouterModule} from "../app.routes";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AppRouterModule
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
