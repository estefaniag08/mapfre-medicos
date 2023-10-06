import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { PersonaSolicitudesService } from './../../../services/persona-solicitudes.service';

import {
  InfoPersonalPersona,
} from './../../../interfaces/PersonaCliente';
@Component({
  selector: 'app-paso-contacto',
  templateUrl: './paso-contacto.component.html',
  styleUrls: ['./paso-contacto.component.scss']
})
export class PasoContactoComponent implements OnInit {
  sobreTi: FormGroup;

  /**
   * @description Variable que permite definir la fecha mínima para iniciar la selección en el calendario
   * @type Date
   */
  minDate: Date;
  /**
   * @description Variable que permite definir la fecha máxima de selección en el calendario
   * @type Date
   */
  maxDate: Date;

  /**
   *
   * @param _formBuilder declaración de la agrupación de campos para los formularios que se utilizarán
   */
  constructor(
    private formBuilder: FormBuilder,
    private personaSolicServ: PersonaSolicitudesService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 70, 0, 0);
    this.maxDate = new Date(currentYear - 18, 12, 0);
  }

  ngOnInit(): void {
    this.sobreTi = this.formBuilder.group({
      nombresMedico: ['', Validators.required],
      apellidosMedico: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
    });
  }

  //Sin descripción
  enviarSobreTiForm() {
    if (this.sobreTi.invalid) {
    } else {
      const infoPersona: InfoPersonalPersona = {
        id_persona: '000000',
        id_tipo_identificacion: 1,
        nombre: this.sobreTi.controls['nombresMedico'].value,
        apellidos: this.sobreTi.controls['apellidosMedico'].value,
        fecha_nacimiento: this.sobreTi.controls['fechaNacimiento'].value,
        id_genero: this.sobreTi.controls['genero'].value,
      };
      this.personaSolicServ.anadirPersona(infoPersona);
    }
  }

  /**
   * @method
   * @description Permite imprimir los mensajes de error, cuando los campos del formulario no cumplen con las validaciones
   * @returns Mensajes de error que se imprimirán en HTML bajo el campo de comentario
   */

  errorNombre() {
    return 'Ingresa tu nombre para continuar';
  }

  errorApellido() {
    return 'Ingresa tu apellido para continuar';
  }

  errorFecha() {
    return 'Selecciona una fecha para continuar';
  }
}
