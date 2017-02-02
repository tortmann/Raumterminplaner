
import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RaumService} from "../services/raum.service";
import {Raum} from "../../entities/raum";

@Component({
  template: `
    <br>
    <br>
    <div class="panel panel-custom">
      <div class="panel-heading panel-heading-custom">
        <h1 class="panel-title"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span>&nbsp;Raum</h1>
      </div>
      <div class="panel-body">
        <div class="alert alert-success" role="alert" *ngIf="messageExists == true">
          <span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>&nbsp;<b>{{ message }}</b>
        </div>
        <div class="alert alert-danger" role="alert" *ngIf="errorMessageExists == true">
          <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>&nbsp;<b>{{ errorMessage }}</b>
        </div>
        <form #f="ngForm" novalidate>
        <div *ngIf="raum">
        <div class="col-md-12">
          <div class="form-group">
            <label>ID</label>
            <input [(ngModel)]="raum.id" class="form-control" disabled
            name="id">
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label>Bezeichnung</label>
            <input [(ngModel)]="raum.bezeichnung" class="form-control"
                   name="raum"
                   required>
          </div>
        </div>
        <div class="col-md-12">        
          <div class="form-group">        
            <a class="btn btn-sm btn-custom" [routerLink]="['/raum-search']">
              <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
            </a>
            <button [disabled]="!f?.controls?.raum?.valid" class="btn btn-sm btn-custom" (click)="save()">
              <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
            </button>
          </div>
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
    </div> 
   </div>

    `,
  styleUrls: ['../../custom.css']
})
export class RaumEditComponent {

  id: number;
  showDetails: string;
  public messageExists: boolean = false;
  public errorMessageExists: boolean = false;

  constructor(
    private raumService: RaumService,
    route: ActivatedRoute, private router: Router) {

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
          this.router.navigate(['raum-search']);
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
