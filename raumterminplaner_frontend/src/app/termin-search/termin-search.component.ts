import {Component} from "@angular/core";
import {Termin} from "../entities/termin";
import {TerminService} from "./services/termin.service";

@Component({
  selector: 'termin-search',
  templateUrl: 'termin-search.component.html',
  styleUrls: ['termin-search.component.css']
})

export class TerminSearchComponent {

  public menu: number = 1;
  public id: number;
  public datum: string;
  public kommentar: string;
  //public mitarbeiter_id: number;
 // public raum_id: number;
  public selectedTermin: Termin;


  constructor (private terminService: TerminService){

  }

  public get termine(): Array<Termin> {
    return this.terminService.termins;
  }

  search(): void {
    this.terminService.find(this.datum);
  }



    delete(termin: Termin): void {
      this.terminService.delete(termin.id.toString());
    }

    select(termin: Termin): void {
      this.selectedTermin = termin;
    }
    create(): void{
      this.terminService.create(this.datum,this.kommentar);
    }

}



