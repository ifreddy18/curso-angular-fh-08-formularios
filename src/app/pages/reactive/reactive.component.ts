import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validadoresService: ValidadoresService
  ) {

    this.crearFormulario();
    this.cargarDataFormulario();
    this.crearListeners();

  }

  ngOnInit(): void {
  }

  get pasatiempos(): FormArray {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreInvalid(): boolean {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoInvalid(): boolean {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get correoInvalid(): boolean {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get usuarioInvalid(): boolean {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }

  get pass1Invalid(): boolean {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2Invalid(): boolean {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return ( pass1 === pass2 ) ? false : true;
  }

  get distritoInvalid(): boolean {
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }

  get ciudadInvalid(): boolean {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }


  crearFormulario(): void {
    this.forma = this.fb.group({
      nombre  : ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5), this.validadoresService.noHerrera]],
      correo  : ['', [Validators.required, Validators.pattern('[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validadoresService.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['', [Validators.required, Validators.minLength(3)]],
        ciudad: ['', [Validators.required, Validators.minLength(3)]],
      }),
      pasatiempos: this.fb.array([])
    }, {
      validators: this.validadoresService.passwordsIguales('pass1', 'pass2')
    });
  }

  crearListeners(): void {
    // this.forma.valueChanges.subscribe( valor => {
    //     console.log({valor});
    // });

    // this.forma.statusChanges.subscribe( status => {
    //   console.log({status});
    // });

    // Sirve para obetener el valor del campo mientrasse cambia
    this.forma.get('nombre').valueChanges.subscribe(console.log);
  }

  guardar(): void {
    console.log( this.forma );

    if (this.forma.invalid){

      Object.values( this.forma.controls ).forEach( control => {

        if (control instanceof FormGroup){
          Object.values( control.controls ).forEach( controlSon => controlSon.markAsTouched());
        } else {
          control.markAsTouched();
        }

        console.log(control);

      });
    }

    this.forma.reset();

  }

  cargarDataFormulario(): void {
    // Al usar setValue se debe enviar toda la informacion de la forma
    // En cambio al usar el reset solo se puede resetear parte de la misma
    // this.forma.setValue({
      this.forma.reset({
        nombre: 'Freddy',
        apellido: 'Michelena',
        correo: 'freddyamm18@hotmail.com',
        pass1: '123',
        pass2: '123',
        direccion: {
          distrito: 'Carabobo',
          ciudad: 'Valencia'
        }
      });

      // Ejemplo de cargar pasatiempos
      // ['comer', 'dormir'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)));
  }

  agregarPasatiempo(): void {
    console.log(this.pasatiempos);
    this.pasatiempos.push( this.fb.control('', Validators.required));
  }

  borrarPasatiempo(i: number): void {
    this.pasatiempos.removeAt(i);
  }

}
