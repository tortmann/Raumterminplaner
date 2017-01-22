
import {Directive, forwardRef} from "@angular/core";
import {AbstractControl, NG_ASYNC_VALIDATORS} from "@angular/forms";

@Directive({
  selector: 'input[asyncMitarbeiter]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => AsyncMitarbeiterValidator ), multi:true}]
})
export class AsyncMitarbeiterValidator {

  validate(m: AbstractControl): Promise<any> {

    return new Promise((resolve) => {
      setTimeout(() => {

        if (m.value == 'Doe' || m.value == 'Test' || m.value == 'Skerbinz' || m.value == 'Ortmann') {
          resolve({});
        }
        else {
          resolve({asyncMitarbeiter: true});
        }

      }, 1000)
    })

  }

}

