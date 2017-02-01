
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TerminService} from "../services/termin.service";
import {Termin} from "../../entities/termin";

@Component({
  template: `
    <h1>Termin bearbeiten!</h1>
  <div class="panel-body">
    <div class="alert alert-success" role="alert" *ngIf="messageExists == true">
      <span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>&nbsp;<b>{{ message }}</b>
    </div>
    <div class="alert alert-danger" role="alert" *ngIf="errorMessageExists == true">
      <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>&nbsp;<b>{{ errorMessage }}</b>
    </div>
    <form #f="ngForm" novalidate>
    <div *ngIf="termin">
      <div class="form-group">
        <label>Id</label>
        <input [(ngModel)]="termin.id" class="form-control" disabled name="id"> 
      </div>
      <div class="form-group">
        <label>Datum</label>
        <input [(ngModel)]="termin.datum" class="form-control" 
                 name="datum"
                 required
                 pattern="^(0?[1-9]|[12][0-9]|3[01]).(0?[1-9]|1[012]).\\d{4}$">
      </div>
            <div class="form-group">
        <label>Kommentar</label>
        <input [(ngModel)]="termin.kommentar" class="form-control" name="kommentar"
        >
      </div>
      <div class="form-group">
      <label>Mitarbeiter</label>
      <select  [(ngModel)]="termin.mitarbeiter" class="form-control" id="selectorMitarbeiter" name="mitarbeiter">
        <option *ngFor="let m of mitarbeitersSearch" value="{{m.id}}">{{m.id | mitarbeiterFullName}}</option>
      </select>
      </div>
       <div class="form-group">
      <label>Raum</label>
      <select  [(ngModel)]="termin.raum" class="form-control" id="selectorRaum" name="raum">
        <option *ngFor="let r of raumsSearch" value="{{r.id}}">{{r.id | raumBezeichnung}}</option>
      </select>
      </div>
      <div class="form-group">        
        <a class="btn btn-sm btn-primary" [routerLink]="['/termin-search']">
          <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
        </a>
        <button [disabled]="!f?.controls?.datum?.valid" class="btn btn-sm btn-success" (click)="save()" [routerLink]="['/termin-search']">
          <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
        </button>
      </div>
      <div class="alert alert-danger" role="alert" *ngIf="!f?.controls?.datum?.valid">

        <div *ngIf="f?.controls?.datum?.hasError('pattern')">
          <b><span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>&nbsp;</b>Bitte auf das richtige
          Format (<i>dd.mm.yyyy</i>) achten!
        </div>
        <div *ngIf="f?.controls?.datum?.hasError('required')">
          <b><span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>&nbsp;</b>Dieses Feld ist nicht
          optional!
        </div>        
      </div>
    </div>
    </form>
        <hr>

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
