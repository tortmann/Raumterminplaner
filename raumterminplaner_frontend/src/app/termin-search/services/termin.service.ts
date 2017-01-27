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
  mitarbeiterClassSuffix: string = 'mitarbeiters';

  termins: Array<any> = [];
  termineSorted: Array<any> = [];
  mitarbeiterUrl: string;
  raumUrl: string;
  mitarbeitersSearch: Array<any>;
  mitarbeitersSorted: Array<any>;

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
                       console.log(this.termineSorted);
                       console.log('Raum');
                       console.log(raums);
                       console.log('Mitarbeiter');
                       console.log(mitarbeiters);

                     }
                   }
                 })
                })

          }
          this.termins = this.termineSorted;
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

    };

    return this
      .http
      .post(url, dummyTermin, {headers})
      .map(resp => resp.json())

  }

  public save(termin: Termin, id: number): Observable<Termin> {

    let mitarbeiterId = termin.mitarbeiter;
    let datum = termin.datum
    let kommentar = termin.kommentar;
    let url = this.baseUrl+this.classSuffix+'/'+id;
    let mitarbeiter:string = this.baseUrl+this.mitarbeiterClassSuffix+'/'+mitarbeiterId;
    console.log(mitarbeiter);


    //let raum = this.baseUrl+this.raumClassSuffix+'/'+raum.id;


    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() );

    return this.http.put(url, {mitarbeiter, datum, kommentar}, { headers }).map(resp => resp.json());




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
              console.log(this.mitarbeitersSorted);
            }
          }
          this.mitarbeitersSearch = this.mitarbeitersSorted;
          console.log(this.mitarbeitersSearch);

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
