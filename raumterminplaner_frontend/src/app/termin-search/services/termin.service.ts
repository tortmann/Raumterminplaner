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


  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    private http: Http,
    private oauthService: OAuthService
  ) {}

  public find(datum: string) {

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
          for (let i of this.termins) {
            if(i.datum == datum) {
              this.termineSorted.push(i);
              //console.log('Match found for:'+ i.name);
            }
          }
          this.termins = this.termineSorted;
        },
        (err) => {
          console.error('Fehler beim Laden', err);
        }
      );

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
      .subscribe(
        (termin: Termin) => {
          console.debug('sucess',termin);
        },
        (err) => {
          console.error('Create Termin - ERROR',err);
        })

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

    public delete(id: string,) {

      let url = this.baseUrl+this.classSuffix+'/'+id;

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

      console.debug('ID: '+id);
      console.debug('URL: '+url);

      return this
        .http
        .delete(url, {headers})
        .map(resp => resp.json())
        .subscribe((res) => {
        });


    }

}
