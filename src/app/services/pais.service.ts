import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  getPaises(): Observable<{nombre: any, codigo: any}[]> {
    console.log('GetPaises');

    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
      .pipe(
        map( (resp: any[]) => { // Mapear el resultado del observable
          // console.log(resp);
          return resp.map( pais => { // Mapear el arreglo de pais
            return { nombre: pais.name, codigo: pais.alpha3Code };
          });
        })
      );
  }
}
