import {Raum} from "../entities/raum";
import {RaumService} from "./services/raum.service";
import {Termin} from "../entities/termin";
import {Component} from "@angular/core";

@Component({
  selector: 'raum-search',
  templateUrl: 'raum-search.component.html',
  styleUrls: ['raum-search.component.css']
})

export class RaumSearchComponent {

  public deleteResponse: number = 0;
  public createResponse: number = 0;
  public menu: number = 1;
  public messageExists: boolean = false;
  public errorMessageExists: boolean = false;
  public id: number;
  public bezeichnung: string;
  public selectedRaum: Raum;
  public message: string;
  public errorMessage: string;

  constructor (private raumService: RaumService){

  }

  public get raums(): Array<Raum> {
    return this.raumService.raums;
  }

  public get termins(): Array<Termin> {
    return this.raumService.termins;
  }

  searchAll(): void {
    this.raumService.find('all');
  }
  search(): void {
    this.raumService.find(this.bezeichnung);
  }

  delete(raum: Raum): void {

    this.raumService.delete(raum.id.toString(),raum.bezeichnung)
      .subscribe((resp) => {
          this.raumService.find(raum.bezeichnung);
          this.message = 'Raum '+ raum.bezeichnung + ' wurde gelöscht!';
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

  select(raum: Raum): void {
    this.selectedRaum = raum;
    this.message = raum.bezeichnung + ' ausgewählt!';
    this.messageExists = true;
    setTimeout(() => {
      this.messageExists = false;
    }, 3000)
  }

  create(): void {
    this.raumService.create(this.bezeichnung)
      .subscribe((resp) => {
          this.raumService.find(this.bezeichnung);
          this.message =  this.bezeichnung +' wurde als neuer Raum angelegt!';
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
