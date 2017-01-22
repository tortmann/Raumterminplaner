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

  select(mitarbeiter: Mitarbeiter): void {
    this.selectedMitarbeiter = mitarbeiter;
  }
  create(): void{
    this.mitarbeiterService.create(this.name,this.vorname);
  }

}
