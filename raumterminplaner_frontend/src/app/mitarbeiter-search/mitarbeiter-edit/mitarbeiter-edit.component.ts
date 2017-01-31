
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MitarbeiterService } from '../services/mitarbeiter.service';
import { Mitarbeiter } from '../../entities/mitarbeiter';

@Component({
  template: `
    <h2>Mitarbeiter bearbeiten!</h2>
    <hr>
    <div class="alert alert-success" role="alert" *ngIf="messageExists == true">
      <b>{{ message }}</b>
    </div>
    <div class="alert alert-danger" role="alert" *ngIf="errorMessageExists == true">
      <b>{{ message }}</b>
    </div>
    <div *ngIf="mitarbeiter">
      <div class="form-group">
        <label>ID</label>
        <input [(ngModel)]="mitarbeiter.id" class="form-control" disabled>
      </div>
      <div class="form-group">
        <label>Name</label>
        <input [(ngModel)]="mitarbeiter.name" class="form-control">
      </div>
      <div class="form-group">
        <label>Vorname</label>
        <input [(ngModel)]="mitarbeiter.vorname" class="form-control">
      </div>
      <div class="form-group">        
        <a class="btn btn-sm btn-primary" [routerLink]="['/mitarbeiter-search']">
          <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
        </a>
        <a class="btn btn-sm btn-success" (click)="save()" [routerLink]="['/mitarbeiter-search']">
          <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
        </a>
      </div>
    </div>
    <hr>
    `
})
export class MitarbeiterEditComponent {

  id: number;
  showDetails: string;
  public messageExists: boolean = false;
  public errorMessageExists: boolean = false;

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
      .save(this.mitarbeiter,this.id)
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
