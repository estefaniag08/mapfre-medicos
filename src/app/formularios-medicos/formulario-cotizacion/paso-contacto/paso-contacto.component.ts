import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PersonaSolicitudesService } from './../../../services/persona-solicitudes.service';
import { ConsultasPolizaMedicoService } from './../../../services/consultas-poliza-medico.service';
import {
  InfoPersonalPersona,
  ClienteInfo,
} from './../../../interfaces/PersonaCliente';
@Component({
  selector: 'app-paso-contacto',
  templateUrl: './paso-contacto.component.html',
  styleUrls: ['./paso-contacto.component.scss'],
})
export class PasoContactoComponent implements OnInit {
  sobreTi: FormGroup;

  @Output() formularioContactoFinalizado = new EventEmitter<boolean>();

  /**
   * @description Metodo encargado de emitir al padre el momento en que el formulario finaliza
   */
  emitirFormularioFinalizado(finalizado: boolean) {
    this.formularioContactoFinalizado.emit(finalizado);
  }

  contacto: FormGroup;
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
   * @description Variable que identifica de cara al ciudadano si el valor que intenta ingresar en alfabético
   */
  esLetra: boolean;
  mobilePhonePattern = '^(?=.*[0-9]).{7,10}$';
  // emailPattern ="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.a-zA-Z]$"
  emailPattern: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  /**
   *
   * @param _formBuilder declaración de la agrupación de campos para los formularios que se utilizarán
   */
  constructor(
    private formBuilder: FormBuilder,
    private personaSolicServ: PersonaSolicitudesService,
    private medicoConsultaServ: ConsultasPolizaMedicoService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 70, 0, 0);
    this.maxDate = new Date(currentYear - 18, 12, 0);
  }

  ngOnInit(): void {
    this.contacto = this.formBuilder.group({
      nombresMedico: ['', Validators.required],
      apellidosMedico: ['', Validators.required],
      numeroCelular: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.mobilePhonePattern),
        ]),
      ],
      correo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.emailPattern),
        ]),
      ],
    });
  }

  //Sin descripción
  enviarSobreTiForm() {
    if (this.contacto.valid) {
      const infoPersona: InfoPersonalPersona = {
        id_persona: '000000',
        id_tipo_identificacion: 1,
        nombre: this.contacto.controls['nombresMedico'].value,
        apellidos: this.contacto.controls['apellidosMedico'].value,
        fecha_nacimiento: new Date('02/02/2022'),
      };
      const infoCliente: ClienteInfo = {
        correo: this.contacto.controls['correo'].value,
        celular: this.contacto.controls['numeroCelular'].value,
      };
      this.personaSolicServ
        .anadirPersona(infoPersona)
        .subscribe((respuesta) => {
          this.personaSolicServ.setIdRegistroPersona(respuesta.id_persona);
          this.personaSolicServ
            .anadirInformacionContacto(infoCliente)
            .subscribe((respuesta) => {
              this.personaSolicServ.setIdCotizacionMedico(
                respuesta.id_poliza_medico
              );
              this.personaSolicServ.anadirInformacionCotizacion(
                this.medicoConsultaServ.getInformacionCotizacion()
              );
            });
        });
      this.emitirFormularioFinalizado(true);
    }
  }

  //Sin descripción
  errorCelular() {
    if (this.contacto.controls['numeroCelular'].hasError('required')) {
      return 'Ingresa un número de celular para continuar';
    }
    if (this.contacto.controls['numeroCelular'].hasError('pattern')) {
      return 'Ingresa un número de celular válido para continuar';
    }
  }

  //Sin descripción
  errorCorreo() {
    if (this.contacto.controls['correo'].hasError('required')) {
      return 'Ingresa un correo para continuar';
    }
    if (this.contacto.controls['correo'].hasError('pattern')) {
      return 'Ingresa un correo válido para continuar';
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

  /**
   * @method
   * @description Bloquea las letras en los campos que solo pueden recibir números del formulario
   * @param key Permite capturar el código ASCII de la tecla presionada por el usuario
   * CÓDIGOS ASCCII DE TECLAS A TENER EN CUENTA
   * Código 48 al 57 && 96 al 105: Corresponden a los números del 0 al 9
   * Código 8: Corresponde al backspace o borrar
   * Código 39: Corresponde a la tecla de flecha izquierda
   * Código 37: Corresponde a la tecla de flecha derecha
   * Código 9: Corresponde a la tecla tab
   */
  bloquearLetras(key) {
    let char = key.keyCode;
    if (
      !(
        (char > 47 && char < 58) ||
        (char > 94 && char < 106) ||
        char == 8 ||
        char == 39 ||
        char == 37 ||
        char == 9
      )
    ) {
      key.preventDefault();
      this.esLetra = false;
    }
    this.esLetra = true;
  }
}
