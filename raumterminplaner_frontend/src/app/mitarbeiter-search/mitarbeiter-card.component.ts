
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Mitarbeiter} from "../entities/mitarbeiter";

@Component({
  templateUrl: 'mitarbeiter-card.component.html',
  selector: 'mitarbeiter-card',
  styleUrls: ['../custom.css']
})
export class MitarbeiterCardComponent {

  @Input() item: Mitarbeiter;
  @Input() selectedItem: Mitarbeiter;
  @Output() selectedItemChange = new EventEmitter();

  select() {
    this.selectedItemChange.next(this.item);
  }


}
