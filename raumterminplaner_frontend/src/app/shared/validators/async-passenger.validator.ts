
import {Directive, forwardRef} from "@angular/core";
import {AbstractControl, NG_ASYNC_VALIDATORS} from "@angular/forms";

@Directive({
  selector: 'input[asyncPassenger]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => AsyncPassengerValidator ), multi:true}]
})
export class AsyncPassengerValidator {

  validate(p: AbstractControl): Promise<any> {

    return new Promise((resolve) => {
      setTimeout(() => {

        if (p.value == 'Muster' || p.value == 'Sorglos' || p.value == 'Doe' || p.value == 'Test' || p.value == 'Blauensteiner') {
          resolve({});
        }
        else {
          resolve({asyncPassenger: true});
        }

      }, 1000)
    })

  }

}

