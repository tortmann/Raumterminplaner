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
    this.deleteResponse = 0;
    this.deleteResponse = this.mitarbeiterService.delete(mitarbeiter.id.toString(),mitarbeiter.name, mitarbeiter.vorname);
    if(this.deleteResponse = 1){
      setTimeout(() => {
        this.mitarbeiterService.find(mitarbeiter.name);
        this.message = 'Mitarbeiter '+ mitarbeiter.vorname + ' ' +mitarbeiter.name + ' wurde gelöscht!';
      }, 1000)
    }
  }

  select(mitarbeiter: Mitarbeiter): void {
    this.selectedMitarbeiter = mitarbeiter;
  }
  create(): void {
    this.createResponse = 0;
    this.createResponse = this.mitarbeiterService.create(this.name, this.vorname);
    if (this.createResponse = 1) {
      setTimeout(() => {
        this.mitarbeiterService.find(this.name);
        this.message = this.vorname + ' ' + this.name +' wurde als neuer Mitarbeiter angelegt!';
      }, 1000)
    }
  }
}
