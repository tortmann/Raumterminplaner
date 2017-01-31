
import {PipeTransform, Pipe} from "@angular/core";
import {TerminService} from "../../termin-search/services/termin.service";

@Pipe({
  name: 'raumBezeichnung',
  pure: true
})
export class RaumBezeichnungPipe implements PipeTransform {

  constructor (private terminService: TerminService){

  }

  public get raumsSearch():Array<any>{
    return this.terminService.raumsSearch;

  }

  transform(value: number, ...args: any[]): any {

    let raumBezeichnung;

    for (var i=0; i<this.raumsSearch.length;i++){
      if (this.raumsSearch[i].id == value){
        raumBezeichnung = this.raumsSearch[i].bezeichnung;
      }
    }

    return raumBezeichnung;

  }

}
