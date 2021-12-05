import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Freddy',
    apellido: 'Michelena',
    correo: 'freddy@gmail.com',
    pais: 'VEN',
    genero: ''
  };

  paises: any[] = [];

  constructor(public paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe( paises => {
      // console.log(paises);
      this.paises = paises;

      // Colocar un valor en la primera opcion
      this.paises.unshift({
        nombre: 'Seleccione un pais...',
        codigo: ''
      });
    });
  }

  guardar(forma: NgForm): void {
    console.log('Submit disparado');
    console.log(forma);
    console.log(forma.value);

    // console.log('Object: ');
    Object.values( forma.controls ).forEach( control => {
      // console.log(control);
      control.markAsTouched();
    });
  }
}
