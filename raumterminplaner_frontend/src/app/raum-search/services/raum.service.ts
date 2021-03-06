
import {Injectable, Inject} from "@angular/core";
import {BASE_URL} from "../../app.tokens";
import {Http, Headers, URLSearchParams} from "@angular/http";
import {OAuthService} from "angular-oauth2-oidc";
import {Raum} from "../../entities/raum";
import {Termin} from "../../entities/termin";
import {Observable} from "rxjs";

@Injectable()
export class RaumService{

  raums: Array<Raum> = [];
  raumsSorted: Array<Raum> = [];
  termins: Array<Termin> = [];
  terminsSorted: Array<Termin> = [];
  termineUrl: string;
  classSuffix: string = 'raums';
  messageFromService: string;

  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    private http: Http,
    private oauthService: OAuthService
  ) {

  }

  public displayMessage(message: string){

    this.messageFromService = message;

  }

  public create(bezeichnung: string){

    let url = this.baseUrl+this.classSuffix;

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    let dummyRaum =  {
      "id": 0,
      "bezeichnung": bezeichnung,

    };

    return this
      .http
      .post(url, dummyRaum, {headers})
      .map(resp => resp.json())
  }


  public find(bezeichnung: string) {

    let url = this.baseUrl+this.classSuffix;

    this.raums = [];
    this.raumsSorted = [];
    this.termins = [];
    this.terminsSorted = [];


    let search = new URLSearchParams();
    search.set('bezeichnung', bezeichnung);

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    // http-GET returns all mitarbeiter
    return this
      .http
      .get(url, { headers, search })
      .map(resp => resp.json())
      .subscribe(
        (raumObj) => {
          this.raums = raumObj._embedded.raums;
          for (let raum of this.raums) {
            if (raum.bezeichnung == bezeichnung) {
              this.raumsSorted.push(raum);
            }
            if (bezeichnung == 'all'){
              this.raumsSorted.push(raum);
            }
          }
            for (let raumSorted of this.raumsSorted){
              this.termineUrl = this.baseUrl+this.classSuffix+'/'+raumSorted.id+"/termine";
              this.http.get(this.termineUrl, {headers}).map(resp => resp.json())
                .subscribe((termineObj) => {
                  this.termins = termineObj._embedded.termins;
                  for (let termin of this.termins){
                    this.terminsSorted.push(termin);
                        for (var r=0; r < this.raumsSorted.length; r++){
                          if (this.raumsSorted[r].id == raumSorted.id){
                            this.raumsSorted[r]['termin'] = this.termins;
                            }
                        }
                  }
                })
            }

          this.raums = this.raumsSorted;
          this.termins = this.terminsSorted;
        }
      );
  }

  public findById(id: number): Observable<Raum> {

    let url = this.baseUrl+this.classSuffix+'/'+id;

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    return this
      .http
      .get(url, {headers})
      .map(resp => resp.json());

  }

  public save(raum: Raum, id:number): Observable<Raum> {

    let url = this.baseUrl+this.classSuffix+'/'+id;

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    return this
      .http
      .patch(url, raum, { headers })
      .map(resp => resp.json());

  }

  public delete(id: string, bezeichnung: string) {

    let url = this.baseUrl+this.classSuffix+'/'+id;

    this.raums = [];
    this.raumsSorted = [];

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    return this
      .http
      .delete(url, {headers})
      .map(resp => resp.json())
  }
}
