import { Injectable } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface errorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  /**
   * Validador que verifique que el valor del controlador apellido sea diferene de 'herrera'
   */
  noHerrera(control: FormControl): errorValidate {

    if (control.value?.toLowerCase() === 'herrera'){
      return {
        noHerrera: true
      };
    }

    return null;
  }

  // Clase 208
  passwordsIguales(pass1Name: string, pass2Name: string): (fg: FormGroup) => void {

    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if (pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }

    };
  }

  existeUsuario(control: FormControl): Promise<errorValidate> | Observable<errorValidate> {

    // Condicion para evitar que la promesa se resuelva al recargar la pagina
    // y espere a que el usuario escriba algo en el input
    if (!control.value){
      return Promise.resolve(null);
    }

    return new Promise( (resolve, reject) => {

      setTimeout(() => {

        if (control.value === 'strider'){
          resolve({existe: true});
        } else {
          resolve(null);
        }

      }, 3500);


    });

  }

}
