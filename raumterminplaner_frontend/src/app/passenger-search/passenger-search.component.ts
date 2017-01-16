import {Component} from "@angular/core";
import {Passenger} from "../entities/passenger";
import {PassengerService} from "./services/passenger.service";

@Component({
  selector: 'passenger-search',
  templateUrl: './passenger-search.component.html',
  styleUrls: ['./passenger-search.component.css']
})

export class PassengerSearchComponent {

  public menu: number = 1;
  public name: string;
  public id: string;
  public firstName: string;
  public bonusMiles: number;
  public selectedPassenger: Passenger;

  constructor (private passengerService: PassengerService){

  }

  public get passengers(): Array<Passenger> {
    return this.passengerService.passengers;
  }

  search(): void {
    this.passengerService.find(this.name);
  }

  select(passenger: Passenger): void {
    this.selectedPassenger = passenger;
  }
  create(): void{
    this.passengerService.create(this.name,this.firstName,this.bonusMiles);
  }

}
