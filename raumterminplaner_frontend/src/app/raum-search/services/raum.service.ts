
import {Injectable, Inject} from "@angular/core";
import {BASE_URL} from "../../app.tokens";
import {Http, Headers, URLSearchParams} from "@angular/http";
import {OAuthService} from "angular-oauth2-oidc";
import {Raum} from "../../entities/raum";
import {Termin} from "../../entities/termin";

@Injectable()
export class RaumService{

  raums: Array<Raum> = [];
  raumsSorted: Array<Raum> = [];
  termins: Array<Termin> = [];
  terminsSorted: Array<Termin> = [];
  termineUrl: string;

  classSuffix: string = 'raums';

  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    private http: Http,
    private oauthService: OAuthService
  ) {

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
              this.termineUrl = this.baseUrl+this.classSuffix+'/'+raum.id+"/termine";
              this.http.get(this.termineUrl, {headers}).map(resp => resp.json())
                .subscribe((termineObj) => {
                  this.termins = termineObj._embedded.termins;
                  for (let termin of this.termins){
                    this.terminsSorted.push(termin);
                        for (var r=0; r < this.raumsSorted.length; r++){
                          if (this.raumsSorted[r].id == raum.id){
                            this.raumsSorted[r]['termin'] = this.termins;
                            }
                        }
                  }
                })
            }
          }
          this.raums = this.raumsSorted;
          this.termins = this.terminsSorted;
          console.log(this.terminsSorted);
          console.log(this.raumsSorted);
        }
      );
  }

}
