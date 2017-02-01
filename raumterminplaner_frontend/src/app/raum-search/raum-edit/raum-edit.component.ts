
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {RaumService} from "../services/raum.service";
import {Raum} from "../../entities/raum";

@Component({
  template: `
    <h2>Raum bearbeiten!</h2>
    <hr>
    <div class="panel-body">
    <div class="alert alert-success" role="alert" *ngIf="messageExists == true">
      <span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>&nbsp;<b>{{ message }}</b>
    </div>
    <div class="alert alert-danger" role="alert" *ngIf="errorMessageExists == true">
      <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>&nbsp;<b>{{ errorMessage }}</b>
    </div>
    <form #f="ngForm" novalidate>
    <div *ngIf="raum">
      <div class="form-group">
        <label>ID</label>
        <input [(ngModel)]="raum.id" class="form-control" disabled
        name="id">
      </div>
      <div class="form-group">
        <label>Bezeichnung</label>
        <input [(ngModel)]="raum.bezeichnung" class="form-control"
               name="raum"
               required
              >
      </div>
    
      <div class="form-group">        
        <a class="btn btn-sm btn-primary" [routerLink]="['/raum-search']">
          <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
        </a>
        <button [disabled]="!f?.controls?.raum?.valid" class="btn btn-sm btn-success" (click)="save()" [routerLink]="['/raum-search']">
          <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
        </button>
      </div>
       <div class="col-md-12">

        <div class="alert alert-danger" role="alert" *ngIf="!f?.controls?.raum?.valid">
          <div *ngIf="f?.controls?.raum?.hasError('required')">
            <b><span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>&nbsp;</b>Dieses Feld ist nicht
            optional!
          </div>
        </div>
      </div>
    </div>
    </form>
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
