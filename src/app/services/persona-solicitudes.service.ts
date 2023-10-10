import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  InfoPersonalPersona,
  ClienteInfo,
  PersonaCedula,
  RespuestaPersona,
  InformacionCompletaFinal,
  InformacionUrl,
  RespuestaUrl,
} from '../interfaces/PersonaCliente';
import {
  InformacionCotizacionMedico,
  RespuestaPolizaMedico,
  SarlafPreguntas,
} from './../interfaces/PolizaMedConsultas';
@Injectable({
  providedIn: 'root',
})
export class PersonaSolicitudesService {
  private idRegistroPersona: number;
  private idCotizacionMedico: number;
  private path = environment.api;
  constructor(private http: HttpClient) {}

  anadirPersona(infoPersona: InfoPersonalPersona) {
    const url = this.path + '/clientes';
    return this.http.post<RespuestaPersona>(url, infoPersona);
  }

  anadirInformacionContacto(infoContacto: ClienteInfo) {
    const url = this.path + `/polizas-medicos/${this.idRegistroPersona}`;
    return this.http.post<RespuestaPolizaMedico>(url, infoContacto);
  }
  setIdCotizacionMedico(idCot: number) {
    this.idCotizacionMedico = idCot;
  }

  setIdRegistroPersona(idRegistroPersona: number) {
    this.idRegistroPersona = idRegistroPersona;
  }
  anadirInformacionCotizacion(infoCotizacion: InformacionCotizacionMedico) {
    const url =
      this.path +
      `/polizas-medicos/${this.idCotizacionMedico}/informacion-adicional`;
    this.http
      .put(url, {
        id_clase_rc: infoCotizacion.id_clase_rc,
        id_especialidad: infoCotizacion.id_especialidad,
      })
      .subscribe((respuesta) => {});
  }

  anadirInformacionCotizacionCorreo(
    infoCotizacion: InformacionCotizacionMedico
  ) {
    const url =
      this.path +
      `/polizas-medicos/${this.idCotizacionMedico}/informacion-adicional`;
    this.http
      .put(url, {
        id_clase_rc: infoCotizacion.id_clase_rc,
        id_especialidad: infoCotizacion.id_especialidad,
        selecciona_seguro: true,
      })
      .subscribe((respuesta) => {
        const url2 =
          this.path + `/polizas-medicos/${this.idCotizacionMedico}/correo`;
        this.http.post(url2, {}).subscribe((rta) => {});
      });
  }
  anadirInfoDocumentoPersona(infoDocumento: PersonaCedula) {
    const url =
      this.path + `/clientes/informacion-personal/${this.idRegistroPersona}`;
    this.http.put(url, infoDocumento).subscribe((respuesta) => {});
  }

  anadirInformacionAdicional(infoCotizacion: InformacionCotizacionMedico) {
    const url =
      this.path +
      `/polizas-medicos/${this.idCotizacionMedico}/informacion-adicional`;

    return this.http.put(url, {
      hospital: infoCotizacion.hospital,
      id_ciudad: infoCotizacion.id_ciudad,
      direccion: infoCotizacion.direccion,
    });
  }
  anadirRespuestaPreguntas(infoPreguntas: SarlafPreguntas) {
    const url =
      this.path +
      `/polizas-medicos/${this.idCotizacionMedico}/sarlaf/preguntas`;
    this.http.post(url, infoPreguntas).subscribe((rta) => {});
  }

  obtenerInformacionFinal() {
    const url = this.path + `/polizas-medicos/${this.idCotizacionMedico}`;
    return this.http.get<InformacionCompletaFinal>(url);
  }

  obtenerUrlDocumentos() {
    const url =
      this.path + `/polizas-medicos/${this.idCotizacionMedico}/documentos`;
    return this.http.get<InformacionUrl>(url);
  }

  adjuntarArchivo(cualDocumento: string, archivo: any, urlDoc: string) {
    let formData: any = new FormData();

    if (
      this.idCotizacionMedico === undefined ||
      this.idCotizacionMedico === null
    ) {
      const url = this.path + `/polizas-medicos/documentos/${urlDoc}`;
      this.http.get<RespuestaUrl>(url).subscribe((rta) => {
        this.idCotizacionMedico = rta.id_poliza_medico;

        const url =
          this.path +
          `/polizas-medicos/${this.idCotizacionMedico}/documentos/${cualDocumento}`;
        formData.append('file', archivo);

        return this.http.post(url, formData);
      });
    } else {
      const url =
        this.path +
        `/polizas-medicos/${this.idCotizacionMedico}/documentos/${cualDocumento}`;
      formData.append('file', archivo);

      return this.http.post(url, formData);
    }
  }
}
