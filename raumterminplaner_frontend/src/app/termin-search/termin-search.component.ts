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

  constructor (private terminService: TerminService){

  }

  public get termine(): Array<Termin> {
    return this.terminService.termins;
  }

  search(): void {
    this.terminService.find(this.datum);
  }


  /*

    delete(mitarbeiter: Mitarbeiter): void {
      this.mitarbeiterService.delete(mitarbeiter.id.toString());
    }

    select(mitarbeiter: Mitarbeiter): void {
      this.selectedMitarbeiter = mitarbeiter;
    }
    create(): void{
      this.mitarbeiterService.create(this.name,this.vorname);
    }
  */
}



