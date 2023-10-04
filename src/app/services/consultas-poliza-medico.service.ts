import { Injectable } from '@angular/core';

import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

import {EspecialidadMedico, RCMedico, ClaseMedico, InformacionCotizacionMedico} from './../interfaces/PolizaMedConsultas';
@Injectable({
  providedIn: 'root'
})
export class ConsultasPolizaMedicoService {

  private path = environment.api
  private valoresRc: RCMedico[] = [];
  private informacionCotizacion: InformacionCotizacionMedico = {
    hospital: '',
    id_clase_rc: -1,
    id_especialidad: -1,
    id_ciudad: -1,
    direccion: ''
  };
  private especialidad : string
  private clase : string;
  constructor(private http: HttpClient) { }


  getEspecialidadNomb(){
    return this.especialidad;
  }
  setClaseNomb(clas: string){
    this.clase = clas;
  }
  getClaseNomb(){
    return this.clase;
  }
  getEspecialidadesMedico(){
    const url = this.path +'/especialidades-medico';
    const headers= new HttpHeaders();
    //.set('Access-Control-Allow-Origin', '*');

    return this.http.get<EspecialidadMedico[]>(url, {'headers': headers});
  }

  getClasesPorEspecialidad(){
    const url = this.path +`/clases/especialidades-medico/${this.informacionCotizacion.id_especialidad}`;
    return this.http.get<ClaseMedico[]>(url);
  }

  getRCPorClase(idClase:number){
    const url = this.path +`/clases/${idClase}/rc`;
    return this.http.get<RCMedico[]>(url);
  }

  getValorSeleccionado(){
    for(let i=0; this.valoresRc.length; i++){
      if(this.valoresRc[i].id_clase_rc_medico === this.informacionCotizacion.id_clase_rc){
        return this.valoresRc[i];
      }
    }
  }

  getInformacionCotizacion(){
    return this.informacionCotizacion;
  }

  setEspecialidadMedico(idEspecialidad:number, esp: string){
    this.informacionCotizacion.id_especialidad = idEspecialidad;
    this.especialidad = esp;
  }

  setClaseRc(idClaseRc: number,){
    this.informacionCotizacion.id_clase_rc = idClaseRc;
  }

  setInfoAdicional(hospital: string, ciudad: number, direccion: string){
    this.informacionCotizacion.hospital = hospital;
    this.informacionCotizacion.id_ciudad = ciudad;
    this.informacionCotizacion.direccion = direccion;
  }

  setArregloValoresRc(arregloRc: RCMedico[]){
    this.valoresRc = arregloRc;
  }

  getArregloValoresRc(){
    return this.valoresRc;
  }

}
