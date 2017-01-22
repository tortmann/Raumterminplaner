import {Injectable, Inject} from "@angular/core";
import {Http, Headers, URLSearchParams} from "@angular/http";
import {Mitarbeiter} from "../../entities/mitarbeiter";
import {BASE_URL} from "../../app.tokens";
import {Observable} from "rxjs";
import {OAuthService} from "angular-oauth2-oidc";

@Injectable()
export class MitarbeiterService{

  class_suffix: string = 'mitarbeiters';
  mitarbeiters: Array<Mitarbeiter> = [];
  mitarbeiter_obj: any = {};

  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    private http: Http,
    private oauthService: OAuthService
  ) {

  }

  public create(name: string, vorname: string){

    let url = this.baseUrl+this.class_suffix;

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

    let url = this.baseUrl+this.class_suffix;

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
        (mitarbeiter_obj) => {
          this.mitarbeiters = mitarbeiter_obj._embedded.mitarbeiters;
          console.debug(mitarbeiter_obj._embedded.mitarbeiters);
        },
        (err) => {
          console.error('Fehler beim Laden', err);
        }
      );

  }

  public findById(id: string): Observable<Mitarbeiter> {

    let url = this.baseUrl+this.class_suffix;

    let search = new URLSearchParams();
    search.set('id', id);

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    return this
      .http
      .get(url, { headers, search })
      .map(resp => resp.json());

  }

  public save(mitarbeiter: Mitarbeiter): Observable<Mitarbeiter> {

    let url = this.baseUrl+this.class_suffix;

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    return this
      .http
      .post(url, mitarbeiter, { headers })
      .map(resp => resp.json());

  }

}
