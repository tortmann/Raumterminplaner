import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {RaumSearchComponent} from "./raum-search.component";
import {RaumCardComponent} from "./raum-card.component";
import {RaumService} from "./services/raum.service";
import {RaumSearchRouterModule} from "./raum-search.routes";
import {RaumEditComponent} from "./raum-edit/raum-edit.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RaumSearchRouterModule
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
