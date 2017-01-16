
import {Directive, forwardRef, Attribute} from "@angular/core";
import {Validator, AbstractControl, NG_VALIDATORS} from "@angular/forms";

@Directive({
  selector: 'input[passenger]',
  providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => PassengerValidator), multi:true}]
})
export class PassengerValidator implements Validator {


  constructor(@Attribute('passenger') private passenger: string) {

  }

  validate(p: AbstractControl): any {


    let allowedPassengers = this.passenger;

    if (allowedPassengers.indexOf(p.value) > -1) {
      return {};
    }

    return {
      passenger: "No passenger with with this name found!"
    };


  }

}

