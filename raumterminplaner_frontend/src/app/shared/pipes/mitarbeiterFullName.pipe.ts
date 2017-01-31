
import {PipeTransform, Pipe} from "@angular/core";
import {TerminService} from "../../termin-search/services/termin.service";

@Pipe({
  name: 'mitarbeiterFullName',
  pure: true
})
export class MitarbeiterFullNamePipe implements PipeTransform {

  constructor (private terminService: TerminService){

  }

  public get mitarbeitersSearch():Array<any>{
    return this.terminService.mitarbeitersSearch;
  }

  transform(value: number, ...args: any[]): any {

    let mitarbeiterName;
    let mitarbeiterVorname;
    let mitarbeiterFullName;

    for (var i=0; i<this.mitarbeitersSearch.length;i++){
      if (this.mitarbeitersSearch[i].id == value){
        mitarbeiterName = this.mitarbeitersSearch[i].name;
        mitarbeiterVorname = this.mitarbeitersSearch[i].vorname;
      }
    }

    mitarbeiterFullName = mitarbeiterVorname+' '+mitarbeiterName;

    return mitarbeiterFullName;

  }

}
