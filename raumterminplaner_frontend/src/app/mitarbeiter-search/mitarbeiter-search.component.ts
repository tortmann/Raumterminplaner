import {Component} from "@angular/core";
import {Mitarbeiter} from "../entities/mitarbeiter";
import {MitarbeiterService} from "./services/mitarbeiter.service";

@Component({
  selector: 'mitarbeiter-search',
  templateUrl: 'mitarbeiter-search.component.html',
  styleUrls: ['mitarbeiter-search.component.css']
})

export class MitarbeiterSearchComponent {

  public deleteResponse: number = 0;
  public createResponse: number = 0;
  public menu: number = 1;
  public id: number;
  public name: string;
  public vorname: string;
  public selectedMitarbeiter: Mitarbeiter;
  public message: string;

  constructor (private mitarbeiterService: MitarbeiterService){

  }

  public get mitarbeiters(): Array<Mitarbeiter> {
    return this.mitarbeiterService.mitarbeiters;
  }

  search(): void {
    this.mitarbeiterService.find(this.name);
  }

  delete(mitarbeiter: Mitarbeiter): void {

    this.mitarbeiterService.delete(mitarbeiter.id.toString(),mitarbeiter.name, mitarbeiter.vorname)
      .subscribe((resp) => {
        this.mitarbeiterService.find(mitarbeiter.name);
        this.message = 'Mitarbeiter '+ mitarbeiter.vorname + ' ' +mitarbeiter.name + ' wurde gelöscht!';
      }
    );
  }

  select(mitarbeiter: Mitarbeiter): void {
    this.selectedMitarbeiter = mitarbeiter;
  }

  create(): void {
    this.mitarbeiterService.create(this.name, this.vorname)
      .subscribe((resp) => {
        this.mitarbeiterService.find(this.name);
        this.message = this.vorname + ' ' + this.name +' wurde als neuer Mitarbeiter angelegt!';
      },
      (err) => {
        console.error('Fehler beim Erstellen', err);
      }
    );
  }
}
