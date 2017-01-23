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

/*



  public create(name: string, vorname: string){

    let url = this.baseUrl+this.classSuffix;

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    let dummyMitarbeiter =  {
      "id": 0,
      "name": name,
      "vorname": vorname
    };

    return this
      .http
      .post(url, dummyMitarbeiter, {headers})
      .map(resp => resp.json())
      .subscribe(
        (mitarbeiter: Mitarbeiter) => {
          console.debug('sucess',mitarbeiter);
        },
        (err) => {
          console.error('Create Mitarbeiter - ERROR',err);
        })

  }


  public find(name: string) {

    let url = this.baseUrl+this.classSuffix;

    this.mitarbeiters = [];
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
          this.mitarbeiters = mitarbeiterObj._embedded.mitarbeiters;
          for (let i of this.mitarbeiters) {
            if(i.name == name) {
              this.mitarbeitersSorted.push(i);
              //console.log('Match found for:'+ i.name);
            }
          }
          this.mitarbeiters = this.mitarbeitersSorted;
        },
        (err) => {
          console.error('Fehler beim Laden', err);
        }
      );

  }

  public findById(id: number): Observable<Mitarbeiter> {

    let url = this.baseUrl+this.classSuffix+'/'+id;

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    return this
      .http
      .get(url, {headers})
      .map(resp => resp.json());

  }

  public save(mitarbeiter: Mitarbeiter, id:number): Observable<Mitarbeiter> {

    let url = this.baseUrl+this.classSuffix+'/'+id;

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    return this
      .http
      .put(url, mitarbeiter, { headers })
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
*/
}
