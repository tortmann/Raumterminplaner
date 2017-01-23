import {Injectable, Inject} from "@angular/core";
import {Http, Headers, URLSearchParams} from "@angular/http";
import {Mitarbeiter} from "../../entities/mitarbeiter";
import {BASE_URL} from "../../app.tokens";
import {Observable} from "rxjs";
import {OAuthService} from "angular-oauth2-oidc";


@Injectable()
export class MitarbeiterService{

  classSuffix: string = 'mitarbeiters';
  mitarbeiters: Array<Mitarbeiter> = [];
  mitarbeitersSorted: Array<Mitarbeiter> = [];
  deleteResponse: number = 0;
  createResponse: number = 0;


  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    private http: Http,
    private oauthService: OAuthService
  ) {

  }

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

  public delete(id: string, name: string, vorname: string) {

    let url = this.baseUrl+this.classSuffix+'/'+id;

    this.mitarbeiters = [];
    this.mitarbeitersSorted = [];
    //this.deleteResponse = 0;

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    return this
      .http
      .delete(url, {headers})
      .map(resp => resp.json())
  }

}
