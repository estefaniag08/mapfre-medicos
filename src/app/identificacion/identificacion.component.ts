import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, } from '@angular/material-moment-adapter';
import { ActivatedRoute, Router, } from '@angular/router';
import { TipoIdentificacion, Ciudad } from '../interfaces/Consultas';
import { ConsultasService } from '../services/consultas.service';
import { ConsultasPolizaMedicoService } from '../services/consultas-poliza-medico.service';
import { PersonaSolicitudesService } from '../services/persona-solicitudes.service';
import { SarlafPreguntas } from '../interfaces/PolizaMedConsultas';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class IdentificacionComponent implements OnInit {
  identificacionForm: FormGroup;
  preguntasAdicionalesForm: FormGroup;

  /**
   * @description Array de tipo de médicos en BD
   */
  tipoDocumento: TipoIdentificacion[] = [];

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

  userId: string = '';
  preguntas: SarlafPreguntas;
  

  /** @description Array de ciudades
  */
  ciudades: Ciudad[] = [];
  ciudadesList: Observable<Ciudad[]>;

  /**
  * @description Valor que ingresa el usuario para filtrar
  */
  nombreCiudad: string;
  PreguntasAdicionales: boolean = false;
  FormIdentifiacion: boolean = true;

  private routeSub: Subscription;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
    private consultasService: ConsultasService, private polizaConsultasService: ConsultasPolizaMedicoService,
    private personaService: PersonaSolicitudesService) {
    const currentYear = new Date().getFullYear();
    //this.minDate = new Date(currentYear - 70, 0, 0);
    //this.maxDate = new Date(currentYear - 18, 12, 0);
    
  }

  ngOnInit(): void {
    /**
     * @description Declaración de campos para cada formulario y sus validaciones
     */
    this.identificacionForm = this.formBuilder.group({
      tipoIdentificacion: ['', Validators.required,],
      numeroIdentificacion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      fechaExpedicionDocumento: ['', Validators.required],
      lugarTrabajo: ['', Validators.required],
      ciudad: ['', Validators.required,],
      direccion: ['', Validators.required]
    });

    this.preguntasAdicionalesForm = this.formBuilder.group({
      preguntaUno: ['', Validators.required],
      preguntaDos: ['', Validators.required],
      preguntaTres: ['', Validators.required],
      preguntaCuatro: ['', Validators.required],
      preguntaCinco: ['', Validators.required],
      preguntaSeis: ['', Validators.required],
      preguntaSiete: ['', Validators.required]
    })

    this.consultasService.getTiposIdentificacion().subscribe(tipos => {
      tipos.map(tipo => {
        this.tipoDocumento.push(tipo);
      });
    });
    this.consultasService.getCiudadesCirculacion().subscribe(ciudades => {
      ciudades.map(ciudad => {
        this.ciudades.push(ciudad);
      })
      /**
           * @description Permite filtrar las ciudades a medida que el usuario escribe en el input
           */
      this.ciudadesList = this.identificacionForm.controls[
        'ciudad'
      ].valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value.value)),
        map((nombreEspecialidad) =>
          nombreEspecialidad
            ? this._filtroCiudad(nombreEspecialidad)
            : this.ciudades.slice()
        )
      );
    }) 
  }

  /**
    * @description Mostrar valores de la interface con Autocompletado
    * @param marca
    */
  displayEspecialidad(ciudad: Ciudad): string {
    return ciudad && ciudad.nombre_ciudad ? ciudad.nombre_ciudad : '';
  }
  /**
   * @description Permite filtar la especialidad escrita por el usuario dentro del listado
   * @param nombreMarca
   */
  private _filtroCiudad(nombreCiudad: string): Ciudad[] {
    const letraFiltro = nombreCiudad.toLowerCase();
    return this.ciudades.filter((option) =>
      option.nombre_ciudad.toLowerCase().includes(letraFiltro)
    );
  }

  /**
   * Este método imprime en el input type text el texto de la opción seleccionada por el usuario
   */
  escribirCiudad() {
    this.nombreCiudad = this.identificacionForm.controls[
      'ciudad'
    ].value.nombre_ciudad;
  }

  /**
   * @method
   * @description Permite imprimir los mensajes de error, cuando los campos del formulario no cumplen con las validaciones
   * @returns Mensajes de error que se imprimirán en HTML bajo el campo de comentario
   */
  errorDocumento() {
    return 'Debes seleccionar un documento para continuar';
  }
  errorNumeroDocumento() {
    return 'Debes ingresar tu número de documento para continuar';
  }

  errorFechaExpedicion() {
    if (
      this.identificacionForm.controls['fechaExpedicionDocumento'].hasError(
        'required'
      )
    ) {
      return 'Selecciona tu fecha de nacimineto para continuar';
    } else if (
      this.identificacionForm.controls['fechaExpedicionDocumento'].hasError
    ) {
      return 'Debes ser mayor de edad para cotizar con nosotros';
    }
  }

  errorFecha() {
    return 'Selecciona una fecha para continuar';
  }

  errorLugarTrabajo() {
    return 'Ingresa tu lugar de trabajo para continuar';
  }

  errorDireccion() {
    return 'Ingresa tu dirección para continuar';
  }

  mostrarPreguntasAdicionales() {
    if (this.identificacionForm.controls['lugarTrabajo'].invalid || this.identificacionForm.controls['ciudad'].invalid) {

    } else {
      this.PreguntasAdicionales = true;
      this.FormIdentifiacion = false;
      this.polizaConsultasService.setInfoAdicional(
        this.identificacionForm.controls['lugarTrabajo'].value,
        this.identificacionForm.controls['ciudad'].value.codigo_ciudad,
        this.identificacionForm.controls['direccion'].value);
      this.personaService.anadirInfoDetallada({
        id_persona: this.identificacionForm.controls['numeroIdentificacion'].value,
        id_tipo_identificacion: this.identificacionForm.controls['tipoIdentificacion'].value,
        fecha_expedicion_documento: this.identificacionForm.controls['fechaExpedicionDocumento'].value,
        id_genero: this.identificacionForm.controls['genero'].value,
        fecha_nacimiento: this.identificacionForm.controls['fechaNacimiento'].value
      });
      this.personaService.anadirInformacionAdicional(this.polizaConsultasService.getInformacionCotizacion()).subscribe(rta => {
      })
    }
  }
  /**
   * @method
   * @description Permite enviar al siguiente paso del proceso
   */

  enviarIdentificacionForm() {
    if (this.identificacionForm.invalid) {
    } else {
      this.preguntas = {
        pregunta_1: this.preguntasAdicionalesForm.controls['preguntaUno'].value === '1' ? true : false,
        pregunta_2: this.preguntasAdicionalesForm.controls['preguntaDos'].value === '1' ? true : false,
        pregunta_3: this.preguntasAdicionalesForm.controls['preguntaTres'].value === '1' ? true : false,
        pregunta_4: this.preguntasAdicionalesForm.controls['preguntaCuatro'].value === '1' ? true : false,
        pregunta_5: this.preguntasAdicionalesForm.controls['preguntaCinco'].value === '1' ? true : false,
        pregunta_6: this.preguntasAdicionalesForm.controls['preguntaSeis'].value === '1' ? true : false,
        pregunta_7: this.preguntasAdicionalesForm.controls['preguntaSiete'].value === '1' ? true : false,
      }      
    }
  }

  adjuntarDocumentos() {
    this.enviarIdentificacionForm();
    this.personaService.anadirRespuestaPreguntas(this.preguntas);
    this.personaService.obtenerUrlDocumentos().subscribe( respuesta => {
      this.userId = respuesta.url;
      this.router.navigate(['adjuntar-documentos/' + this.userId], {relativeTo: this.route.parent});
    });
  }
}


/**
 * @method
 * @description Este método permite validar si es posible autocompletar la opción escrita por el usuario en el input, de lo contrario, retornará un mensaje de error como 'Valor inexistente'
 * @param Services
 */
export function autocompleteValidator(Services: any[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const index = Services.findIndex((Service) => {
      return new RegExp('^' + Service.viewValue + '$').test(
        control.value.viewValue
      );
    });
    return index < 0 ? { valorInexistente: { value: control.value } } : null;
  };
}
