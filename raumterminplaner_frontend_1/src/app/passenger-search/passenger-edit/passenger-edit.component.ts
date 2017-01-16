
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PassengerService } from '../services/passenger.service';
import { Passenger } from '../../entities/passenger';

@Component({
  template: `
    <h1>Passenger Edit!</h1>
    <div>
      {{ message }}
    </div>
    <div *ngIf="passenger">
      <div class="form-group">
        <label>Id</label>
        <input [(ngModel)]="passenger.id" class="form-control">
      </div>
      <div class="form-group">
        <label>From</label>
        <input [(ngModel)]="passenger.name" class="form-control">
      </div>
      <div class="form-group">
        <label>To</label>
        <input [(ngModel)]="passenger.bonusMiles" class="form-control">
      </div>
      <div class="form-group">
        <label>Date</label>
        <input [(ngModel)]="passenger.passengerStatus" class="form-control">
      </div>
      <div class="form-group">
        <button (click)="save()" class="btn btn-default">Save</button>
      </div>
    </div>
    `
})
export class PassengerEditComponent {
  id: string;
  showDetails: string;

  constructor(
    private passengerService: PassengerService,
    route: ActivatedRoute) {

    route.params.subscribe(
      p => {
        this.id = p['id'];
        this.showDetails = p['showDetails'];
        this.load(this.id);
      }
    )

  }

  passenger: Passenger;
  message: string;

  load(id: string): void {
    this
      .passengerService
      .findById(id)
      .subscribe(
        passenger => {
          this.passenger = passenger;
          this.message = "";
        },
        (err) => {
          this.message = "Fehler beim Speichern: " + err.text();
        }
      )
  }

  save(): void {
    this
      .passengerService
      .save(this.passenger)
      .subscribe(
        passenger => {
          this.passenger = passenger;
          this.message = "Daten wurden gespeichert!";
        },
        (err) => {
          this.message = "Fehler beim Speichern: " + err.text();
        }
      )

  }

}
