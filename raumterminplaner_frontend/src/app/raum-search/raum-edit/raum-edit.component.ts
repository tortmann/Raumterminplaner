
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {RaumService} from "../services/raum.service";
import {Raum} from "../../entities/raum";

@Component({
  template: `
    <h2>Raum bearbeiten!</h2>
    <hr>
    <div class="alert alert-success" role="alert" *ngIf="messageExists == true">
      <b>{{ message }}</b>
    </div>
    <div class="alert alert-danger" role="alert" *ngIf="errorMessageExists == true">
      <b>{{ message }}</b>
    </div>
    <div *ngIf="raum">
      <div class="form-group">
        <label>ID</label>
        <input [(ngModel)]="raum.id" class="form-control" disabled>
      </div>
      <div class="form-group">
        <label>Bezeichnung</label>
        <input [(ngModel)]="raum.bezeichnung" class="form-control">
      </div>
    
      <div class="form-group">        
        <a class="btn btn-sm btn-primary" [routerLink]="['/raum-search']">
          <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
        </a>
        <a class="btn btn-sm btn-success" (click)="save()" [routerLink]="['/raum-search']">
          <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
        </a>
      </div>
    </div>
    <hr>
    `
})
export class RaumEditComponent {

  id: number;
  showDetails: string;
  public messageExists: boolean = false;
  public errorMessageExists: boolean = false;

  constructor(
    private raumService: RaumService,
    route: ActivatedRoute) {

    route.params.subscribe(
      p => {
        this.id = p['id'];
        this.showDetails = p['showDetails'];
        this.load(this.id);
      }
    )

  }

  raum: Raum;
  message: string;

  load(id: number): void {
    this
      .raumService
      .findById(id)
      .subscribe(
        raum => {
          this.raum = raum;
          this.message = "";
        },
        (err) => {
          this.message = "Fehler beim Speichern: " + err.text();
        }
      )
  }

  save(): void {
    this
      .raumService
      .save(this.raum,this.id)
      .subscribe(
        raum => {
          this.raum = raum;
          this.raumService.find(this.raum.bezeichnung);
          this.message = "Daten wurden gespeichert!";
          this.raumService.displayMessage(this.message);
          this.messageExists = true;
          setTimeout(() => {
            this.messageExists = false;
          }, 5000)
        },
        (err) => {
          this.message = "Fehler beim Speichern: " + err.text();
          this.errorMessageExists = true;
        }
      )

  }

}
