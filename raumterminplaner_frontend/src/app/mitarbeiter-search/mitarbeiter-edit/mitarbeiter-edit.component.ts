
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MitarbeiterService } from '../services/mitarbeiter.service';
import { Mitarbeiter } from '../../entities/mitarbeiter';

@Component({
  template: `
    <h1>Mitarbeiter Edit!</h1>
    <div>
      {{ message }}
    </div>
    <div *ngIf="mitarbeiter">
      <div class="form-group">
        <label>Id</label>
        <input [(ngModel)]="mitarbeiter.id" class="form-control">
      </div>
      <div class="form-group">
        <label>From</label>
        <input [(ngModel)]="mitarbeiter.name" class="form-control">
      </div>
      <div class="form-group">
        <label>To</label>
        <input [(ngModel)]="mitarbeiter.vorname" class="form-control">
      </div>
      <div class="form-group">
        <button (click)="save()" class="btn btn-default">Speichern</button>
      </div>
    </div>
    `
})
export class MitarbeiterEditComponent {
  id: string;
  showDetails: string;

  constructor(
    private mitarbeiterService: MitarbeiterService,
    route: ActivatedRoute) {

    route.params.subscribe(
      p => {
        this.id = p['id'];
        this.showDetails = p['showDetails'];
        this.load(this.id);
      }
    )

  }

  mitarbeiter: Mitarbeiter;
  message: string;

  load(id: string): void {
    this
      .mitarbeiterService
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
      .save(this.mitarbeiter)
      .subscribe(
        mitarbeiter => {
          this.mitarbeiter = mitarbeiter;
          this.message = "Daten wurden gespeichert!";
        },
        (err) => {
          this.message = "Fehler beim Speichern: " + err.text();
        }
      )

  }

}
