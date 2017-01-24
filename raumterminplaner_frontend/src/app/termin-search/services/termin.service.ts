import {Injectable, Inject} from "@angular/core";
import {Http, Headers, URLSearchParams} from "@angular/http";
import {Mitarbeiter} from "../../entities/mitarbeiter";
import {BASE_URL} from "../../app.tokens";
import {Observable} from "rxjs";
import {OAuthService} from "angular-oauth2-oidc";
import {find} from "rxjs/operator/find";
import {Termin} from "../../entities/termin";

@Injectable()
export class TerminService{

  classSuffix: string = 'termins';
  termins: Array<Termin> = [];
  termineSorted: Array<Termin> = [];
  mitarbeiters: Array<any> =[];
  mitarbeiterUrl: string;
  raums: Array<any> = [];
  raumUrl: string;

  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    private http: Http,
    private oauthService: OAuthService
  ) {}

  public find(datum: string) {

    let url = this.baseUrl+this.classSuffix;

    this.termins = [];
    this.termineSorted = [];
    this.mitarbeiters = [];
    this.raums = [];

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
            if(termin.datum == datum) {
              this.termineSorted.push(termin);
              this.mitarbeiterUrl = this.baseUrl+this.classSuffix+"/"+termin.id+"/mitarbeiter";
              this.http.get(this.mitarbeiterUrl, {headers}).map(resp=>resp.json())
                .subscribe((mitarbeiterObj) => {
                  this.mitarbeiters = mitarbeiterObj;

               this.raumUrl = this.baseUrl+this.classSuffix+"/"+termin.id+"/raum";
               this.http.get(this.raumUrl, {headers}).map(resp => resp.json())
                 .subscribe((raumObj)=>{
                   this.raums = raumObj;

                   for (var t=0; t<this.termineSorted.length;t++){
                     if (this.termineSorted[t].id == termin.id){
                       this.termineSorted[t]['mitarbeiter'] = this.mitarbeiters;
                       this.termineSorted[t]['raum'] = this.raums;

                     }
                   }
                 })
                })
            }
          }
          this.termins = this.termineSorted;
          console.log('Termine');
          console.log(this.termineSorted);
          console.log('Raum');
          console.log(this.raums);
          console.log('Mitarbeiter');
          console.log(this.mitarbeiters);
          console.log(this.mitarbeiters);
        });
  }


  public create(datum: string, kommentar: string){

    let url = this.baseUrl+this.classSuffix;

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    let dummyTermin =  {
      "id": 0,
      "datum": datum,
      "kommentar": kommentar,
     // "mitarbeiter_id":mitarbeiter_id,
      //"raum_id":raum_id,

    };

    return this
      .http
      .post(url, dummyTermin, {headers})
      .map(resp => resp.json())

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

    public save(termin: Termin, id:number): Observable<Termin> {

      let url = this.baseUrl+this.classSuffix+'/'+id;

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

      return this
        .http
        .put(url, termin, { headers })
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
