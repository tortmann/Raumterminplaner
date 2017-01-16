
import {PipeTransform, Pipe} from "@angular/core";

@Pipe({
  name: 'bonusMiles',
  pure: true
})
export class BonusMilesPipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {

    let category;
    //let categoryFormat = args[0];

    if (value == 0) {
      category = 'NEW MEMBER';
    }
    if (value > 0) {
      category = 'SILVER MEMBER';
    }
    if (value >= 10000) {
      category = 'GOLD MEMBER';
    }
    if (value >= 100000) {
      category = 'DIAMOND MEMBER';
    }

    return category;

  }

}
