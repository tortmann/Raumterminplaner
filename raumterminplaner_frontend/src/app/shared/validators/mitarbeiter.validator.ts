
import {Directive, forwardRef, Attribute} from "@angular/core";
import {Validator, AbstractControl, NG_VALIDATORS} from "@angular/forms";

@Directive({
  selector: 'input[mitarbeiter]',
  providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => MitarbeiterValidator), multi:true}]
})
export class MitarbeiterValidator implements Validator {


  constructor(@Attribute('mitarbeiter') private mitarbeiter: string) {

  }

  validate(m: AbstractControl): any {


    let allowedMitarbeiters = this.mitarbeiter;

    if (allowedMitarbeiters.indexOf(m.value) > -1) {
      return {};
    }

    return {
      passenger: "Es wurde kein Mitarbeiter mit diesem Namen gefunden!"
    };


  }

}

