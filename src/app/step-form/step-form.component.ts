import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ActivatedRoute, Router } from '@angular/router';

import { ConsultasPolizaMedicoService } from './../services/consultas-poliza-medico.service';
import { PersonaSolicitudesService } from './../services/persona-solicitudes.service';

import { RCMedico, ClaseMedico } from './../interfaces/PolizaMedConsultas';
import {
  InfoPersonalPersona,
  ClienteInfo,
} from './../interfaces/PersonaCliente';

declare global {
  interface Window { dataLayer: any[]; }
}

@Component({
  selector: 'app-step-form',
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true, displayDefaultIndicatorType: false },
    },
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class StepFormComponent implements OnInit {
  profesion: FormGroup;
  sobreTi: FormGroup;
  contacto: FormGroup;

  /**
   * @description Array de tipo de médicos en BD
   */
  tipoMedicos: ClaseMedico[] = [];

  /**
   * @description Array de valores asegurados que están almacenados en BD
   */
  valorAsegurado: RCMedico[] = [];

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
   * @description Estados que permiten mostrar u ocultar aclaraciones
   */

  mostrarTextoGeneral = true;
  mostrarTipoProcedimientoText: boolean = false;
  mostrarValorAseguradoText: boolean = false;
  mostrarTextoPasoUno: boolean = true;

  /**
   * @description Variable que identifica de cara al ciudadano si el valor que intenta ingresar en alfabético
   */
  esLetra: boolean;
  mobilePhonePattern = "^(?=.*[0-9]).{7,10}$";
  // emailPattern ="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.a-zA-Z]$"
  emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /**
   *
   * @param _formBuilder declaración de la agrupación de campos para los formularios que se utilizarán
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private medicoConsultaServ: ConsultasPolizaMedicoService,
    private personaSolicServ: PersonaSolicitudesService,
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 70, 0, 0);
    this.maxDate = new Date(currentYear - 18, 12, 0);
  }

  ngOnInit(): void {
    /**
     * @description Declaración de campos para cada formulario y sus validaciones
     */
    this.profesion = this.formBuilder.group({
      tipoMedico: ['', Validators.required],
      valorAsegurado: ['', Validators.required],
    });
    this.sobreTi = this.formBuilder.group({
      nombresMedico: ['', Validators.required],
      apellidosMedico: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
    });
    this.contacto = this.formBuilder.group({
      numeroCelular: ['', Validators.compose([  Validators.required, Validators.pattern(this.mobilePhonePattern)]),],
      correo: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      confirmacionCorreo: [
        '',
        Validators.compose([Validators.required, Validators.pattern(this.emailPattern)]),
      ],
    });
    this.medicoConsultaServ.getClasesPorEspecialidad().subscribe((clases) => {
      for (let i = 0; i < clases.length; i++) {
        this.tipoMedicos.push(clases[i]);
      }
    });
  }

  obtenerRcPorClase() {
    this.medicoConsultaServ
      .getRCPorClase(this.profesion.controls['tipoMedico'].value.id_clase_medico)
      .subscribe((rc) => {
        this.medicoConsultaServ.setArregloValoresRc(rc);
        this.valorAsegurado = [];
        rc.map((rc) => {
          this.valorAsegurado.push(rc);
        });
      });
  }

  enviarProfesionForm() {
    if (this.profesion.invalid) {

    } else {
      //Evento personalizado google tag
      window.dataLayer.push({
        event: 'clase_seleccionada',
        clase: this.profesion.controls['tipoMedico'].value.nombre_clase
      });
      //Evento personalizado google tag
      let index = this.valorAsegurado.findIndex(valor => valor.id_clase_rc_medico === this.profesion.controls['valorAsegurado'].value)
      console.log(index)
      window.dataLayer.push({
        event: 'rc_seleccionado',
        rc: this.valorAsegurado[index].rc_medico.numero_rc_medico
      });

      this.medicoConsultaServ.setClaseNomb(this.profesion.controls['tipoMedico'].value.nombre_clase)
      this.medicoConsultaServ.setClaseRc(
        this.profesion.controls['valorAsegurado'].value
      );
      this.mostrarTextoPasoUno = false;
    }
  }

  enviarSobreTiForm() {
    if (this.sobreTi.invalid) {
    } else {
      //const infoPersona: InfoPersonalPersona = {
      //id_persona: '000000',
      //  id_tipo_identificacion: 1,
      //  nombre: this.sobreTi.controls['nombresMedico'].value,
      //  apellidos: this.sobreTi.controls['apellidosMedico'].value,
      //  fecha_nacimiento: this.sobreTi.controls['fechaNacimiento'].value,
      //  id_genero: this.sobreTi.controls['genero'].value,
      //};
      //this.personaSolicServ.anadirPersona(infoPersona);
    }
  }

  enviarContactoForm() {
    if (
      this.contacto.value.correo !=
      this.contacto.value.confirmacionCorreo
    ) {
      this.contacto.invalid
    }
    if (this.contacto.invalid) {

    } else {
      const infoCliente: ClienteInfo = {
        correo: this.contacto.controls['correo'].value,
        celular: this.contacto.controls['numeroCelular'].value,
      };
      this.personaSolicServ.anadirInformacionContacto(infoCliente).subscribe(respuesta => {
        this.personaSolicServ.setIdCotizacionMedico(respuesta.id_poliza_medico);
        this.personaSolicServ.anadirInformacionCotizacion(this.medicoConsultaServ.getInformacionCotizacion());
      })
      this.router.navigate(['mostrar-cotizacion'], {
        relativeTo: this.route.parent,
      });
    }
  }
  limpiarRc() {
    this.valorAsegurado = [];
  }
  mostrarTextoTipoProcedimiento() {
    this.mostrarTipoProcedimientoText = true;
    this.mostrarTextoGeneral = false;
    this.mostrarValorAseguradoText = false;
  }

  mostrarTextoValorAsegurado() {
    this.mostrarValorAseguradoText = true;
    this.mostrarTextoGeneral = false;
    this.mostrarTipoProcedimientoText = false;
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

  /**
   * @method
   * @description Permite imprimir los mensajes de error, cuando los campos del formulario no cumplen con las validaciones
   * @returns Mensajes de error que se imprimirán en HTML bajo el campo de comentario
   */
  errorSeleccion() {
    return 'Debes seleccionar una opción para continuar';
  }

  errorNombre() {
    return 'Ingresa tu nombre para continuar';
  }

  errorApellido() {
    return 'Ingresa tu apellido para continuar';
  }

  errorFecha() {
    return 'Selecciona una fecha para continuar';
  }

  errorCelular() {
    return 'Ingresa tu número de celular para continuar';
  }

  errorCorreo() {
    if (this.contacto.controls['correo'].hasError('required')) {
      return 'Ingresa un correo para continuar';
    }
    if(this.contacto.controls['correo'].hasError('pattern')) {
      return "Ingresa un correo válido para continuar"
    }
  }

  errorConfirmacionCorreo() {
    if (this.contacto.controls['confirmacionCorreo'].hasError('required')) {
      return 'Ingresa un correo para continuar';
    }
    if(this.contacto.controls['confirmacionCorreo'].hasError('pattern')) {
      return "Ingresa un correo válido para continuar"
    }
  }

  /**
   * @method
   * @description Permite validar que el correo ingresado en el campo de correo y confirmación de correo sean el mismo
   */
  validarConfirmacionCorreo() {
    if (
      this.contacto.controls['correo'].touched &&
      this.contacto.controls['confirmacionCorreo'].touched
    ) {
      if (
        this.contacto.value.correo !=
        this.contacto.value.confirmacionCorreo
      )
        return 'Los valores deben coincidir';
    }
  }
}

