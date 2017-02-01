import {Termin} from "../entities/termin";
import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
  templateUrl: 'termin-card.component.html',
  selector: 'termin-card',
  styleUrls: ['../custom.css']
})
export class TerminCardComponent {

  @Input() item: Termin;
  @Input() selectedItem: Termin;
  @Output() selectedItemChange = new EventEmitter();

  select() {
    this.selectedItemChange.next(this.item);
  }


}
