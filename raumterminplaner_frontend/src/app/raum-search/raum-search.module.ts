import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {RaumSearchComponent} from "./raum-search.component";
import {RaumCardComponent} from "./raum-card.component";
import {RaumService} from "./services/raum.service";
import {RaumEditComponent} from "./raum-edit/raum-edit.component";
import {AppRouterModule} from "../app.routes";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AppRouterModule
  ],
  declarations: [
    RaumSearchComponent,
    RaumCardComponent,
    RaumEditComponent,
  ],
  providers: [
    RaumService
  ]
})
export class RaumSearchModule {

}
