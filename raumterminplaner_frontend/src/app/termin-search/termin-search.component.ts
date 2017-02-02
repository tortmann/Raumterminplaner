import {Component, OnInit} from "@angular/core";
import {Termin} from "../entities/termin";
import {TerminService} from "./services/termin.service";
import {Mitarbeiter} from "../entities/mitarbeiter";
import {Raum} from "../entities/raum";

@Component({
  selector: 'termin-search',
  templateUrl: 'termin-search.component.html',
  styleUrls: ['../custom.css']
})

export class TerminSearchComponent implements OnInit{

  public menu: number = 1;
  public id: number;
  public datum: string;
  public kommentar: string;
  public mitarbeiter: string;
  public raum: string;
  public selectedTermin: Termin;
  public message: string;
  public messageExists: boolean = false;
  public errorMessageExists: boolean = false;
  public errorMessage: string;
  public formattedDateString: string;



  constructor (private terminService: TerminService){

  }

  ngOnInit(){
    this.terminService.findMitarbeiter('all');
    this.terminService.findRaum('all');
    setTimeout(() => {
      this.displayMessage();
    }, 1000);
  }

  displayMessage(): void {
    this.message = this.messages;
    if(this.messages){
      this.messageExists = true;
    }
    setTimeout(() => {
      this.messageExists = false;
    }, 3000)
  }

  public get messages(): string {
    return this.terminService.messageFromService;
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
    let year = this.datum.substring(0,4);
    let month = this.datum.substring(5,7);
    let day = this.datum.substring(8,10);
    this.formattedDateString = day+'.'+month+'.'+year;
    this.terminService.find(this.formattedDateString);
    setTimeout(() => {
      if(this.terminService.termins.length == 0){
        this.errorMessage = 'Es wurden keine Termine am "'+this.datum+'" gefunden!';
        this.errorMessageExists = true;
        setTimeout(() => {
          this.errorMessageExists = false;
        }, 5000)
      }else{
        let numberOfSearchResults = this.terminService.termins.length;
        this.errorMessageExists = false;
        this.messageExists = true;
        this.message = 'Es wurde(n) '+numberOfSearchResults+' Termine am "'+this.formattedDateString+'" gefunden!'
        setTimeout(() => {
          this.messageExists = false;
        }, 5000)
      }
    }, 500)
  }

  searchAll(): void {
    this.terminService.find('all');
    setTimeout(() => {
      let numberOfSearchResults = this.terminService.termins.length;
      this.errorMessageExists = false;
      this.messageExists = true;
      this.message = 'Es wurden '+numberOfSearchResults+' Termine gefunden!'
      setTimeout(() => {
        this.messageExists = false;
      }, 5000)
    }, 500)
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
    let year = this.datum.substring(0,4);
    let month = this.datum.substring(5,7);
    let day = this.datum.substring(8,10);
    this.formattedDateString = day+'.'+month+'.'+year;
    this.terminService.create(this.formattedDateString, this.kommentar, this.mitarbeiter, this.raum).subscribe((resp) => {
          this.terminService.find(this.datum);
          this.message = 'Termin: '+ this.kommentar + ' am ' + this.formattedDateString +' wurde neu angelegt!';
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



