
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Passenger} from "../entities/passenger";

@Component({
  templateUrl: './passenger-card.component.html',
  selector: 'passenger-card'
})
export class PassengerCardComponent {

  @Input() item: Passenger;
  @Input() selectedItem: Passenger;
  @Output() selectedItemChange = new EventEmitter();

  select() {
    this.selectedItemChange.next(this.item);
  }


}
