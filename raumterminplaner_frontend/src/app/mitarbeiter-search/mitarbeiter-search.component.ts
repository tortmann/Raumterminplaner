import {Component} from "@angular/core";
import {Mitarbeiter} from "../entities/mitarbeiter";
import {MitarbeiterService} from "./services/mitarbeiter.service";

@Component({
  selector: 'mitarbeiter-search',
  templateUrl: 'mitarbeiter-search.component.html',
  styleUrls: ['mitarbeiter-search.component.css']
})

export class MitarbeiterSearchComponent {

  public menu: number = 1;
  public id: number;
  public name: string;
  public vorname: string;
  public selectedMitarbeiter: Mitarbeiter;

  constructor (private mitarbeiterService: MitarbeiterService){

  }

  public get mitarbeiters(): Array<Mitarbeiter> {
    return this.mitarbeiterService.mitarbeiters;
  }

  search(): void {
    this.mitarbeiterService.find(this.name);
  }

  delete(mitarbeiter: Mitarbeiter): void {
<<<<<<< HEAD

    this.mitarbeiterService.delete(mitarbeiter.id.toString(),mitarbeiter.name, mitarbeiter.vorname)
      .subscribe((resp) => {
        this.mitarbeiterService.find(mitarbeiter.name);
        this.message = 'Mitarbeiter '+ mitarbeiter.vorname + ' ' +mitarbeiter.name + ' wurde gelöscht!';
      }
    );
=======
    this.mitarbeiterService.delete(mitarbeiter.id.toString());
>>>>>>> 7307eec01e4af846f308f7843ce3867218474e97
  }

  select(mitarbeiter: Mitarbeiter): void {
    this.selectedMitarbeiter = mitarbeiter;
  }
<<<<<<< HEAD

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
=======
  create(): void{
    this.mitarbeiterService.create(this.name,this.vorname);
>>>>>>> 7307eec01e4af846f308f7843ce3867218474e97
  }

}
