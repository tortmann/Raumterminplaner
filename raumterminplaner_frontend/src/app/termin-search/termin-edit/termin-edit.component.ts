
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TerminService} from "../services/termin.service";
import {Termin} from "../../entities/termin";

@Component({
  template: `
    <h1>Termin bearbeiten!</h1>
    <div class="alert alert-success" role="alert" *ngIf="messageExists == true">
      <b>{{ message }}</b>
    </div>
    <div class="alert alert-danger" role="alert" *ngIf="errorMessageExists == true">
      <b>{{ message }}</b>
    </div>
    <div *ngIf="termin">
      <div class="form-group">
        <label>Id</label>
        <input [(ngModel)]="termin.id" class="form-control" disabled>
      </div>
      <div class="form-group">
        <label>Datum</label>
        <input [(ngModel)]="termin.datum" class="form-control">
      </div>
            <div class="form-group">
        <label>Kommentar</label>
        <input [(ngModel)]="termin.kommentar" class="form-control">
      </div>
      <div class="form-group">
      <label>Mitarbeiter</label>
      <select  [(ngModel)]="termin.mitarbeiter" class="form-control" id="selectorMitarbeiter">
        <option *ngFor="let m of mitarbeitersSearch" value="{{m.id}}">{{m.id | mitarbeiterFullName}}</option>
      </select>
      </div>
       <div class="form-group">
      <label>Raum</label>
      <select  [(ngModel)]="termin.raum" class="form-control" id="selectorRaum">
        <option *ngFor="let r of raumsSearch" value="{{r.id}}">{{r.id | raumBezeichnung}}</option>
      </select>
      </div>
      <div class="form-group">        
        <a class="btn btn-sm btn-primary" [routerLink]="['/termin-search']">
          <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
        </a>
        <a class="btn btn-sm btn-success" (click)="save()" [routerLink]="['/termin-search']">
          <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
        </a>
      </div>
    </div>
    `
})
export class TerminEditComponent implements OnInit{

  id: number;
  showDetails: string;
  public messageExists: boolean = false;
  public errorMessageExists: boolean = false;

  constructor(
    private terminService: TerminService,
    route: ActivatedRoute) {

    route.params.subscribe(
      p => {
        this.id = p['id'];
        this.showDetails = p['showDetails'];
        this.load(this.id);
      }
    )

  }

  termin: Termin;
  message: string;



  ngOnInit(){
    this.terminService.findMitarbeiter('all');
    this.terminService.findRaum('all');
  }

  public get termins(): Array<Termin> {
    return this.terminService.termins;
  }

  public get mitarbeitersSearch():Array<any>{
    return this.terminService.mitarbeitersSearch;
  }

  public get raumsSearch():Array<any>{
    return this.terminService.raumsSearch;

  }

  load(id: number): void {
    this
      .terminService
      .findById(id)
      .subscribe(
        termin => {
          this.termin = termin;
          this.message = "";
        },
        (err) => {
          this.message = "Fehler beim Speichern: " + err.text();
        }
      )
  }

  save(): void {
    console.log(this.termin);
    this
      .terminService
      .save(this.termin)
      .subscribe(
        termin => {
          this.termin = termin;
          this.terminService.find(this.termin.datum);
          this.message = "Daten wurden gespeichert!"
          this.terminService.displayMessage(this.message);
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
