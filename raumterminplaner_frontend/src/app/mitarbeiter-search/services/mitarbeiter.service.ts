import {Injectable, Inject} from "@angular/core";
import {Http, Headers, URLSearchParams} from "@angular/http";
import {Mitarbeiter} from "../../entities/mitarbeiter";
import {BASE_URL} from "../../app.tokens";
import {Observable} from "rxjs";
import {OAuthService} from "angular-oauth2-oidc";
import {Termin} from "../../entities/termin";


@Injectable()
export class MitarbeiterService{

  classSuffix: string = 'mitarbeiters';
  mitarbeiters: Array<Mitarbeiter> = [];
  termins: Array<Termin> = [];
  raums: Array<any>;
  mitarbeitersSorted: Array<Mitarbeiter> = [];
  urlTermine: string;
  urlRaum: string;
  messageFromService: string;
  terminClassSuffix: string = 'termine';
  terminClassPrefix: string = 'termins';
  raumClassSuffix: string = 'raum';

  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    private http: Http,
    private oauthService: OAuthService
  ) {

  }

  public displayMessage(message: string){
    this.messageFromService = message;

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
      this.termins = [];
      this.raums = [];

      let search = new URLSearchParams();
      search.set('name', name);

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

      // http-GET returns all mitarbeiter
      return this
        .http
        .get(url, { headers, search })
        .map(resp => resp.json())
        .subscribe(
          (mitarbeiterObj) => {
            // mitarbeiters is of type Array<Mitarbeiter> so we have to go a bit deepr into the return obj(mitarbeiterObj) to match the data type
            this.mitarbeiters = mitarbeiterObj._embedded.mitarbeiters;
            // loop over all objects in the mitarbeiter Array
            for (let i of this.mitarbeiters) {
              // if the name attribute (i.name) in the respective object matches the user input (name) add it to a new sorted array
              if (i.name == name) {
                // push correct objects<Mitarbeiter> (i) into sorted array
                this.mitarbeitersSorted.push(i);
              }
              if (name == 'all'){
                this.mitarbeitersSorted.push(i);
              }
            }
            // only make the http-request for the necessary mitarbeiters --> all mitarbeiters that match the
            // search criteria (they are all in this.mitarbeitersSorted --> optimize the number of http-requests
            for (let x of this.mitarbeitersSorted){
                // modifiy url for next http-GET - http://localhost:8080/api/mitarbeiters/id/termine
                // the part /id/ is variable and matches the id of the mitarbeiter object (i.id)
                this.urlTermine = this.baseUrl+this.classSuffix+'/'+x.id+'/'+this.terminClassSuffix;
                // http-GET returns all termine of the respective mitarbeiter (current mitarbeiter = i)
                this.http.get(this.urlTermine, {headers}).map(resp => resp.json())
                  .subscribe((termineObj) => {
                    // same as above - match data type of http return and termins Array
                    this.termins = termineObj._embedded.termins;
                    // iterate over all termins found for the current mitarbeiter
                    for (let j of this.termins){
                      // add the termins to a sorted array
                      let terminsSorted = [];
                      terminsSorted.push(j);
                      // http-GET returns the raum of the respective termin (current termin = j)
                      // proceed to build url similar to getting termins
                      this.urlRaum = this.baseUrl+this.terminClassPrefix+'/'+j.id+'/'+this.raumClassSuffix;
                      this.http.get(this.urlRaum, {headers}).map(resp => resp.json())
                        .subscribe((raumObj) => {
                            // this time the data types match receive Object from response this.raums expects an array of raum objects
                            this.raums = raumObj;
                            // iterate over the sorted mitarbeiters array
                            for (let k = 0; k < this.mitarbeitersSorted.length; k++) {
                              // check if the id of the mitarbeiter in the sorted mitarbeiter array matches the id of the current mitarbeiter (i)
                              if (this.mitarbeitersSorted[k].id == x.id) {
                                // if the ids match then this termin belongs to exactly this mitarbeiter and can therefore be added to the sorted mitarbeiter array
                                this.mitarbeitersSorted[k]['termin'] = terminsSorted;
                                // iterate once again - this time iterate over all the termins of the current user
                                for (let n = 0; n < this.mitarbeitersSorted[k]['termin'].length; n++) {
                                  // append the raums object to the respective users termins
                                  this.mitarbeitersSorted[k]['termin'][n].raum = this.raums;
                                }
                              }
                            }
                        // Ende des callbacks von http-GET raum
                        })
                    }
                  // Ende des callbacks von http-GET termins
                  })
            }
            // save the sorted data into the main array for mitarbeiter and termin
            // these are used to display the data in the frontend
            this.mitarbeiters = this.mitarbeitersSorted;
        // Ende des callbacks von http-GET mitarbeiters
        });
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
      .patch(url, mitarbeiter, { headers })
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
