import {Component, OnInit} from "@angular/core";
import {Mitarbeiter} from "../entities/mitarbeiter";
import {MitarbeiterService} from "./services/mitarbeiter.service";
import {Termin} from "../entities/termin";

@Component({
  selector: 'mitarbeiter-search',
  templateUrl: 'mitarbeiter-search.component.html',
  styleUrls: ['mitarbeiter-search.component.css']
})

export class MitarbeiterSearchComponent {

  public menu: number = 1;
  public messageExists: boolean = false;
  public errorMessageExists: boolean = false;
  public id: number;
  public name: string;
  public vorname: string;
  public selectedMitarbeiter: Mitarbeiter;
  public message: string;
  public errorMessage: string;

  constructor (private mitarbeiterService: MitarbeiterService){
  }

  public get mitarbeiters(): Array<Mitarbeiter> {
    return this.mitarbeiterService.mitarbeiters;
  }

  public get termins(): Array<Termin> {
    return this.mitarbeiterService.termins;
  }

  search(): void {
    this.mitarbeiterService.find(this.name);
  }

  searchAll(): void {
    this.mitarbeiterService.find('all');
  }

  delete(mitarbeiter: Mitarbeiter): void {

    this.mitarbeiterService.delete(mitarbeiter.id.toString(),mitarbeiter.name, mitarbeiter.vorname)
      .subscribe((resp) => {
        this.mitarbeiterService.find(mitarbeiter.name);
        this.message = 'Mitarbeiter '+ mitarbeiter.vorname + ' ' +mitarbeiter.name + ' wurde gelöscht!';
        this.messageExists = true;
        setTimeout(() => {
            this.messageExists = false;
          }, 5000)
      },
        (err) => {
          this.errorMessage = 'Fehler beim Löschen: ' + err;
          this.errorMessageExists = true;
        }
    );
  }

  select(mitarbeiter: Mitarbeiter): void {
    this.selectedMitarbeiter = mitarbeiter;
    this.message = mitarbeiter.vorname + ' ' +mitarbeiter.name + ' ausgewählt!';
    this.messageExists = true;
    setTimeout(() => {
      this.messageExists = false;
    }, 3000)
  }

  create(): void {
    this.mitarbeiterService.create(this.name, this.vorname)
      .subscribe((resp) => {
        this.mitarbeiterService.find(this.name);
        this.message = this.vorname + ' ' + this.name +' wurde als neuer Mitarbeiter angelegt!';
        this.messageExists = true;
        setTimeout(() => {
          this.messageExists = false;
        }, 5000)
      },
      (err) => {
        this.errorMessage = 'Fehler beim Erstellen: ' + err ;
        this.errorMessageExists = true;
      }
    );
  }
}
