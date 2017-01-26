
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Raum} from "../entities/raum";

@Component({
  templateUrl: 'raum-card.component.html',
  selector: 'raum-card'
})
export class RaumCardComponent {

  @Input() item: Raum;
  @Input() selectedItem: Raum;
  @Output() selectedItemChange = new EventEmitter();

  select() {
    this.selectedItemChange.next(this.item);
  }


}
