import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MitarbeiterService} from '../services/mitarbeiter.service';
import {Mitarbeiter} from '../../entities/mitarbeiter';

@Component({
  template: `
    <h2>Mitarbeiter bearbeiten!</h2>
    <hr>
    <div class="alert alert-success" role="alert" *ngIf="messageExists == true">
      <span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>&nbsp;<b>{{ message }}</b>
    </div>
    <div class="alert alert-danger" role="alert" *ngIf="errorMessageExists == true">
      <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>&nbsp;<b>{{ errorMessage }}</b>
    </div> 
    <form #f="ngForm" novalidate>
    <div *ngIf="mitarbeiter">
      <div class="form-group">
        <label>ID</label>
        <input [(ngModel)]="mitarbeiter.id" class="form-control" disabled
        name="id">
      </div>
      <div class="form-group">
        <label>Name</label>
        <input [(ngModel)]="mitarbeiter.name" class="form-control"
                 name="name"
                 required
                 minlength="3"
                 maxlength="20"
                 pattern="[a-zA-ZöäüßÖÄÜ]*">
      </div>
      <div class="form-group">
        <label>Vorname</label>
        <input [(ngModel)]="mitarbeiter.vorname" class="form-control"
                 name="vorname"
                 required
                 minlength="3"
                 maxlength="20"
                 pattern="[a-zA-ZöäüßÖÄÜ]*">
      </div>
      <div class="form-group">        
        <a class="btn btn-sm btn-primary" [routerLink]="['/mitarbeiter-search']">
          <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
        </a>
        <button [disabled]="!f?.controls?.name?.valid ||!f?.controls?.vorname?.valid " class="btn btn-sm btn-success" (click)="save()" [routerLink]="['/mitarbeiter-search']">
          <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
        </button>
        <div class="col-md-12" >
      <div class="alert alert-danger" role="alert" *ngIf="!f?.controls?.vorname?.valid || !f?.controls?.name?.valid">
        <div *ngIf="f?.controls?.vorname?.hasError('minlength') || f?.controls?.name?.hasError('minlength')">
          <b><span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>&nbsp;</b>Name und Vorname
          eines Mitarbeiters müssen  <i>mind. 3 BUCHSTABEN</i> enthalten!
        </div>
        <div *ngIf="f?.controls?.vorname?.hasError('pattern')||f?.controls?.name?.hasError('pattern')">
          <b><span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>&nbsp;</b>Nur <i>BUCHSTABEN</i>
          sind erlaubt!
        </div>
        <div *ngIf="f?.controls?.vorname?.hasError('required') || f?.controls?.name?.hasError('required')">
          <b><span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>&nbsp;</b>Beide Felder müssen ausgefüllt werden!
        </div>
      </div>
    </div>
      </div>
    </div> 
        </form>
        <hr> 
    `
})
export class MitarbeiterEditComponent {

  id: number;
  showDetails: string;
  public messageExists: boolean = false;
  public errorMessageExists: boolean = false;

  constructor(private mitarbeiterService: MitarbeiterService,
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
  public message: string = 'hello world';

  load(id: number): void {
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
      .save(this.mitarbeiter, this.id)
      .subscribe(
        mitarbeiter => {
          this.mitarbeiter = mitarbeiter;
          this.mitarbeiterService.find(this.mitarbeiter.name);
          this.message = "Daten wurden gespeichert!";
          this.mitarbeiterService.displayMessage(this.message);
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
