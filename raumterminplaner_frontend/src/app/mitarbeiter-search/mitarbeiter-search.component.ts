import {
  Component, OnInit
} from "@angular/core";
import {Mitarbeiter} from "../entities/mitarbeiter";
import {MitarbeiterService} from "./services/mitarbeiter.service";
import {Termin} from "../entities/termin";
import {Router} from "@angular/router";
import {OAuthService} from "angular-oauth2-oidc";


@Component({
  selector: 'mitarbeiter-search',
  templateUrl: 'mitarbeiter-search.component.html',
  styleUrls: ['../css/custom.css']
})

export class MitarbeiterSearchComponent implements OnInit{

  public menu: number = 1;
  public messageExists: boolean = false;
  public errorMessageExists: boolean = false;
  public id: number;
  public name: string;
  public vorname: string;
  public selectedMitarbeiter: Mitarbeiter;
  public message: string;
  public errorMessage: string;

  constructor (private mitarbeiterService: MitarbeiterService, private router: Router, private oauthService: OAuthService){}

  ngOnInit(){
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
    return this.mitarbeiterService.messageFromService;
  }

  public get mitarbeiters(): Array<Mitarbeiter> {
    return this.mitarbeiterService.mitarbeiters;
  }

  public get termins(): Array<Termin> {
    return this.mitarbeiterService.termins;
  }

  search(): void {
    this.mitarbeiterService.find(this.name);
    setTimeout(() => {
      if(this.mitarbeiterService.mitarbeiters.length == 0){
        this.errorMessage = 'Es wurde kein Mitarbeiter mit dem Namen "'+this.name+'" gefunden!';
        this.errorMessageExists = true;
        setTimeout(() => {
          this.errorMessageExists = false;
        }, 5000)
      }else{
        let numberOfSearchResults = this.mitarbeiterService.mitarbeiters.length;
        this.errorMessageExists = false;
        this.messageExists = true;
          this.message = 'Es wurde(n) '+numberOfSearchResults+' Mitarbeiter mit dem Namen "'+this.name+'" gefunden'
        setTimeout(() => {
          this.messageExists = false;
        }, 5000)
      }
    }, 500)
  }

  searchAll(): void {
    this.mitarbeiterService.find('all');
    setTimeout(() => {
      let numberOfSearchResults = this.mitarbeiterService.mitarbeiters.length;
      this.errorMessageExists = false;
      this.messageExists = true;
      this.message = 'Es wurden '+numberOfSearchResults+' Mitarbeiter gefunden'
      setTimeout(() => {
        this.messageExists = false;
      }, 5000)
    }, 500)
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
    }, 5000)
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
