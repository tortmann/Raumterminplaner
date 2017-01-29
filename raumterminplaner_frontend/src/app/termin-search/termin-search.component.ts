import {Component, OnInit} from "@angular/core";
import {Termin} from "../entities/termin";
import {TerminService} from "./services/termin.service";
import {Mitarbeiter} from "../entities/mitarbeiter";
import {Raum} from "../entities/raum";

@Component({
  selector: 'termin-search',
  templateUrl: 'termin-search.component.html',
  styleUrls: ['termin-search.component.css']
})

export class TerminSearchComponent implements OnInit{

  public menu: number = 1;
  public id: number;
  public datum: string;
  public kommentar: string;
  public selectedTermin: Termin;
  public message: string;
  public messageExists: boolean = false;
  public errorMessageExists: boolean = false;
  public errorMessage: string;



  constructor (private terminService: TerminService){

  }


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

  search(): void {
    this.terminService.find(this.datum);
  }

  searchAll(): void {
    this.terminService.find('all');
  }


  delete(termin: Termin): void {

    this.terminService.delete(termin.id.toString(),termin.datum, termin.kommentar)
      .subscribe((resp) => {
          this.terminService.find(termin.datum);
          this.message = 'Termin '+ termin.kommentar + ' am ' + termin.datum + ' wurde gelöscht!';
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

  select(termin: Termin): void {
    this.selectedTermin = termin;
    this.message = 'Termin'+termin.kommentar + ' am ' +termin.datum + ' ausgewählt!';
    this.messageExists = true;
    setTimeout(() => {
      this.messageExists = false;
    }, 3000)
  }

  create(): void {
    this.terminService.create(this.datum, this.kommentar).subscribe((resp) => {
          this.terminService.find(this.datum);
          this.message = 'Termin: '+ this.kommentar + ' am ' + this.datum +' wurde neu angelegt!';
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



