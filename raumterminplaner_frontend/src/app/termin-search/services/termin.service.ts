import {Injectable, Inject} from "@angular/core";
import {Http, Headers, URLSearchParams} from "@angular/http";
import {BASE_URL} from "../../app.tokens";
import {Observable} from "rxjs";
import {OAuthService} from "angular-oauth2-oidc";
import {Termin} from "../../entities/termin";

@Injectable()
export class TerminService{

  classSuffix: string = 'termins';
  mitarbeiterClassSuffix: string = 'mitarbeiters';
  raumClassSuffix: string = 'raums';
  termins: Array<any> = [];
  termineSorted: Array<any> = [];
  mitarbeiterUrl: string;
  raumUrl: string;
  mitarbeitersSearch: Array<any>;
  mitarbeitersSorted: Array<any>;
  raumsSearch: Array<any> = [];
  raumsSorted: Array<any> = [];
  messageFromService: string;

  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    private http: Http,
    private oauthService: OAuthService
  ) {}

  public displayMessage(message: string){

    this.messageFromService = message;

  }

  public find(datum: string) {

    console.log(datum);
    let url = this.baseUrl+this.classSuffix;
    this.termins = [];
    this.termineSorted = [];

    let search = new URLSearchParams();
    search.set('datum', datum);

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    return this
      .http
      .get(url, { headers, search })
      .map(resp => resp.json())
      .subscribe(
        (terminObj) => {
          this.termins = terminObj._embedded.termins;
          for (let termin of this.termins) {
            if (termin.datum == datum) {
              this.termineSorted.push(termin);

            }
            if (datum == 'all'){
              this.termineSorted.push(termin);
            }
          }
            for (let terminSorted of this.termineSorted){
              this.mitarbeiterUrl = this.baseUrl+this.classSuffix+"/"+terminSorted.id+"/mitarbeiter";
              this.http.get(this.mitarbeiterUrl, {headers}).map(resp=>resp.json())
                .subscribe((mitarbeiterObj) => {
                  let mitarbeiters = [];
                  mitarbeiters.push(mitarbeiterObj);
               this.raumUrl = this.baseUrl+this.classSuffix+"/"+terminSorted.id+"/raum";
               this.http.get(this.raumUrl, {headers}).map(resp => resp.json())
                 .subscribe((raumObj)=>{
                   let raums = [];
                   raums.push(raumObj);
                   for (var t=0; t<this.termineSorted.length;t++){
                     if (this.termineSorted[t].id == terminSorted.id){
                       this.termineSorted[t]['mitarbeiter'] = mitarbeiters;
                       this.termineSorted[t]['raum'] = raums;
                     }
                   }
                 })
                })
          }
          this.termins = this.termineSorted;
        });
  }


  public create(datum: string, kommentar: string, mitarbeiterId: string, raumId: string){

    let url = this.baseUrl+this.classSuffix;
    let id:number = 0;
    let mitarbeiter: string = this.baseUrl+this.mitarbeiterClassSuffix+'/'+mitarbeiterId;
    let raum: string = this.baseUrl+this.raumClassSuffix+'/'+raumId;

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    return this
      .http
      .post(url, {id,datum,kommentar,mitarbeiter,raum}, {headers})
      .map(resp => resp.json())
  }

  public save(termin: Termin): Observable<Termin> {

    let mitarbeiterId = termin.mitarbeiter;
    let datum = termin.datum;
    let kommentar = termin.kommentar;
    let url = this.baseUrl+this.classSuffix+'/'+termin.id;
    let mitarbeiter:string = this.baseUrl+this.mitarbeiterClassSuffix+'/'+mitarbeiterId;
    let raumId = termin.raum;
    let raum = this.baseUrl+this.raumClassSuffix+'/'+raumId;

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    return this
      .http
      .patch(url, {mitarbeiter,raum, datum, kommentar}, { headers })
      .map(resp => resp.json());

  }

  public findMitarbeiter(name: string) {

    let url = this.baseUrl+this.mitarbeiterClassSuffix;

    this.mitarbeitersSearch = [];
    this.mitarbeitersSorted = [];

    let search = new URLSearchParams();
    search.set('name', name);

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    return this
      .http
      .get(url, { headers, search })
      .map(resp => resp.json())
      .subscribe(
        (mitarbeiterObj) => {
          this.mitarbeitersSearch = mitarbeiterObj._embedded.mitarbeiters;
          for (let i of this.mitarbeitersSearch) {
            if (i.name == name) {
              this.mitarbeitersSorted.push(i);
            }
            if (name == 'all'){
              this.mitarbeitersSorted.push(i);
            }
          }
          this.mitarbeitersSearch = this.mitarbeitersSorted;

        });
  }

  public findRaum(bezeichnung: string) {

    let url = this.baseUrl+this.raumClassSuffix;
    this.raumsSearch = [];
    this.raumsSorted = [];

    let search = new URLSearchParams();
    search.set('bezeichnung', bezeichnung);

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    return this
      .http
      .get(url, { headers, search })
      .map(resp => resp.json())
      .subscribe(
        (raumObj) => {
          this.raumsSearch = raumObj._embedded.raums;
          for (let i of this.raumsSearch) {
            if (i.bezeichnung == bezeichnung) {
            }
            if (bezeichnung == 'all'){
              this.raumsSorted.push(i);
            }
          }
          this.raumsSearch = this.raumsSorted;
        });
  }



  public findById(id: number): Observable<Termin> {

      let url = this.baseUrl+this.classSuffix+'/'+id;
      let headers = new Headers();
      headers.set('Accept', 'application/json');
      headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

      return this
        .http
        .get(url, {headers})
        .map(resp => resp.json());

    }


    public delete(id: string,datum: string, kommentar: string) {

      let url = this.baseUrl+this.classSuffix+'/'+id;
      let headers = new Headers();
      headers.set('Accept', 'application/json');
      headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

      return this
        .http
        .delete(url, {headers})
        .map(resp => resp.json())

    }

}
