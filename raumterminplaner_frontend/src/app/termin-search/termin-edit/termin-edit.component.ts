
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TerminService} from "../services/termin.service";
import {Termin} from "../../entities/termin";

@Component({
  template: `
    <h1>Termin Edit!</h1>
    <div>
      {{ message }}
    </div>
    <div *ngIf="termin">
      <div class="form-group">
        <label>Id</label>
        <input [(ngModel)]="termin.id" class="form-control">
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
      <select  [(ngModel)]="termin.mitarbeiter" class="form-control" id="selector">
        <option *ngFor="let m of mitarbeitersSearch">{{m.id}}</option>
      </select>
      </div>
       <div class="form-group">
      <label>Raum</label>
      <select  [(ngModel)]="termin.raum" class="form-control" id="selector">
        <option *ngFor="let r of raumsSearch">{{r.id}}</option>
      </select>
      </div>
      <div class="form-group">        
        <a class="btn btn-sm btn-danger" [routerLink]="['/mitarbeiter-search']">
          <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
        </a>
        <button (click)="save()" class="btn btn-sm btn-success">
          <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
        </button>
      </div>
    </div>
    `
})
export class TerminEditComponent implements OnInit{

  id: number;
  showDetails: string;

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
      .save(this.termin, this.id)
      .subscribe(
        termin => {
          this.termin = termin;
          this.message = "Daten wurden gespeichert!";
        },
        (err) => {
          this.message = "Fehler beim Speichern: " + err.text();

        }
      )

  }

}
