import {Injectable, Inject} from "@angular/core";
import {Http, Headers, URLSearchParams} from "@angular/http";
import {Passenger} from "../../entities/passenger";
import {BASE_URL} from "../../app.tokens";
import {Observable} from "rxjs";
import {OAuthService} from "angular-oauth2-oidc";

@Injectable()
export class PassengerService{

  passengers: Array<Passenger> = [];
  passengers_new: any = {};

  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    private http: Http,
    private oauthService: OAuthService
  ) {

  }

  public create(name: string, firstName: string, bonusMiles: number){

    let url = this.baseUrl;

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    let dummyPassenger =  {
      "id": 0,
      "name": name,
      "firstName": firstName,
      "bonusMiles": bonusMiles,
      "passengerStatus": "B"
    };

    return this
      .http
      .post(url, dummyPassenger, {headers})
      .map(resp => resp.json())
      .subscribe(
        (passenger: Passenger) => {
          console.debug('sucess',passenger);
        },
        (err) => {
      console.error('Create Passenger - ERROR',err);
    })

  }


  public find(name: string) {

    let url = this.baseUrl;

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
        (passengers_new) => {
          this.passengers = passengers_new._embedded.mitarbeiters;
          console.debug(passengers_new._embedded.mitarbeiters);
        },
        (err) => {
          console.error('Fehler beim Laden', err);
        }
      );

  }

  public findById(id: string): Observable<Passenger> {

    let url = this.baseUrl;

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

  public save(passenger: Passenger): Observable<Passenger> {

    let url = this.baseUrl;

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    return this
      .http
      .post(url, passenger, { headers })
      .map(resp => resp.json());

  }

}
