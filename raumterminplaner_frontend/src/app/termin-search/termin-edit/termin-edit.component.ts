
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TerminService} from "../services/termin.service";
import {Termin} from "../../entities/termin";

@Component({
  template: `
    <h1>Termin Edit!</h1>
    <div>
      {{ message }}
    </div>
    <div *ngIf="mitarbeiter">
      <div class="form-group">
        <label>Id</label>
        <input [(ngModel)]="termin.id" class="form-control">
      </div>
      <div class="form-group">
        <label>Datum</label>
        <input [(ngModel)]="termin.date" class="form-control">
      </div>
      <div class="form-group">
        <label>Mitarbeiter</label>
        <input [(ngModel)]="termin.mitarbeiter_id" class="form-control">
      </div>
         <div class="form-group">
        <label>Raum</label>
        <input [(ngModel)]="termin.raum_id" class="form-control">
      </div>
      <div class="form-group">
        <button (click)="save()" class="btn btn-default">Speichern</button>
      </div>
    </div>
    `
})
export class TerminEditComponent {

  id: number;
  showDetails: string;

  constructor(
    private terminService: TerminService,
    route: ActivatedRoute) {

  /*  route.params.subscribe(
      p => {
        this.id = p['id'];
        this.showDetails = p['showDetails'];
        this.load(this.id);
      }
    )*/

  }

  termin: Termin;
  message: string;

  /*load(id: number): void {
    this
      .terminService
      .findById(id)
      .subscribe(
        mitarbeiter => {
          this.mitarbeiter = mitarbeiter;
          this.message = "";
        },
        (err) => {
          this.message = "Fehler beim Speichern: " + err.text();
        }
      )
  }

  save(): void {
    this
      .mitarbeiterService
      .save(this.mitarbeiter,this.id)
      .subscribe(
        mitarbeiter => {
          this.mitarbeiter = mitarbeiter;
          this.message = "Daten wurden gespeichert!";
        },
        (err) => {
          this.message = "Fehler beim Speichern: " + err.text();

        }
      )

  }*/

}
