import { Injectable } from '@angular/core';

import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';

import {TipoIdentificacion, Ciudad} from './../interfaces/Consultas';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  private path = environment.api
  constructor(private http: HttpClient) { }

  /**
   * @method
   * @description Obtiene los tipos de identificación disponibles para el usuario
   * @returns {TipoIdentificacion} Array de Json con el nombre y el id del tipo de identificación
   */
  getTiposIdentificacion(){
    const url = this.path +'/tipos-identificacion';
    return this.http.get<TipoIdentificacion[]>(url); 
  }

  /**
   * @method
   * @description Obtiene las ciudades  disponibles 
   * @return {Ciudad} Array con el nombre y el id de la ciudad 
   */
  getCiudadesCirculacion(){
    const url = this.path + '/ciudades-circulacion'
    return this.http.get<Ciudad[]>(url);
  }

}
