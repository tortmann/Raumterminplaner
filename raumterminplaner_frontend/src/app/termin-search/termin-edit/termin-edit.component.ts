
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TerminService} from "../services/termin.service";
import {Termin} from "../../entities/termin";

@Component({
  template: `
    <br>
    <br>
    <div class="panel panel-custom">
      <div class="panel-heading panel-heading-custom">
        <h1 class="panel-title"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span>&nbsp;Termin</h1>
      </div>
      <div class="panel-body">
        <div class="alert alert-success" role="alert" *ngIf="messageExists == true">
          <span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>&nbsp;<b>{{ message }}</b>
        </div>
        <div class="alert alert-danger" role="alert" *ngIf="errorMessageExists == true">
          <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>&nbsp;<b>{{ errorMessage }}</b>
        </div>
        <form #f="ngForm" novalidate>
          <div *ngIf="termin">
            <div class="col-md-12">
              <div class="form-group">
                <label>ID</label>
                <input [(ngModel)]="termin.id" class="form-control" disabled name="id"> 
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label>Datum</label>
                <input type="date" [(ngModel)]="termin.datum" class="form-control" name="datum">
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label>Kommentar</label>
                <input [(ngModel)]="termin.kommentar" class="form-control" name="kommentar" required>
              </div>
            </div>
            <div class="col-md-12">
              <div class="alert alert-danger" role="alert" *ngIf="!f?.controls?.kommentar?.valid">        
                <div *ngIf="f?.controls?.kommentar?.hasError('required')">
                  <b><span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>&nbsp;</b>Dieses Feld ist nicht
                  optional!
                </div>        
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
              <label>Mitarbeiter</label>
              <select  [(ngModel)]="termin.mitarbeiter" class="form-control" name="mitarbeiter" required>
                <option *ngFor="let m of mitarbeitersSearch" value="{{m.id}}">{{m.id | mitarbeiterFullName}}</option>
              </select>
              </div>
            </div>
            <div class="col-md-12">
              <div class="alert alert-danger" role="alert" *ngIf="!f?.controls?.mitarbeiter?.valid">        
                <div *ngIf="f?.controls?.mitarbeiter?.hasError('required')">
                  <b><span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>&nbsp;</b>Dieses Feld ist nicht
                  optional!
                </div>        
              </div>
            </div>
            <div class="col-md-12">
             <div class="form-group">
              <label>Raum</label>
              <select  [(ngModel)]="termin.raum" class="form-control" name="raum" required>
                <option *ngFor="let r of raumsSearch" value="{{r.id}}">{{r.id | raumBezeichnung}}</option>
              </select>
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
            <div class="col-md-12">
              <div class="form-group">        
                <a class="btn btn-sm btn-custom" [routerLink]="['/termin-search']">
                  <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
                </a>
                <button [disabled]="!f?.controls?.kommentar?.valid" class="btn btn-sm btn-custom" (click)="save()">
                  <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
                </button>
              </div>
            </div>            
          </div>
        </form>
      </div>
    </div>

    `,
  styleUrls: ['../../css/custom.css']
})
export class TerminEditComponent implements OnInit{

  id: number;
  showDetails: string;
  public messageExists: boolean = false;
  public errorMessageExists: boolean = false;
  public formattedDateString: string;

  constructor(
    private terminService: TerminService,
    route: ActivatedRoute, private router: Router) {

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
  errorMessage: string;



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
    let year = this.termin.datum.substring(0,4);
    let month = this.termin.datum.substring(5,7);
    let day = this.termin.datum.substring(8,10);
    this.formattedDateString = day+'.'+month+'.'+year;
    this.termin.datum = this.formattedDateString;
    this
      .terminService
      .save(this.termin)
      .subscribe(
        termin => {
          this.termin = termin;
          this.terminService.find(this.termin.datum);
          this.message = "Daten wurden gespeichert!"
          this.terminService.displayMessage(this.message);
          this.router.navigate(['termin-search']);
          this.messageExists = true;
          setTimeout(() => {
            this.messageExists = false;
          }, 5000)
        },
        (err) => {
          this.errorMessage = "Fehler beim Speichern: " + err.text();
          this.errorMessageExists = true;
        }
      )

  }

}
