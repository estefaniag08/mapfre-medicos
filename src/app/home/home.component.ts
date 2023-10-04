import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { ConsultasPolizaMedicoService } from './../services/consultas-poliza-medico.service';
import { EspecialidadMedico } from './../interfaces/PolizaMedConsultas';

declare global {
  interface Window { dataLayer: any[]; }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  /**
   * @description Array de especialidades
   */
  especialidades: EspecialidadMedico[] = [];
  especialidadList: Observable<EspecialidadMedico[]>;

  /**
   * @description Controlador de validación para campos tipo SELECT
   */
  selectFormControl = new FormControl('', Validators.required);

  /**
   * @description Declaración de formulario
   */
  especialidadForm: FormGroup;

  /**
   * @description Valor que ingresa el usuario para filtrar
   */
  nombreEspecialidad: string;

  /**
   * @description Configuración de carousel de comentarios de usuarios
   */
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 100,
    navText: ['', ''],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };

  /**
   * @description Array de comentarios de usuarios
   */
  arrayComments = [
    {
      userIcon: 'mapfre-men-icon',
      userName: 'Edison Patiño',
      userPuntuacion: {
        puntuacionPath1: 'assets/iconos/star-filled.svg',
        puntuacionPath2: 'assets/iconos/star-filled.svg',
        puntuacionPath3: 'assets/iconos/star-filled.svg',
        puntuacionPath4: 'assets/iconos/star-filled.svg',
        puntuacionPath5: 'assets/iconos/star.svg',
      },
      userComment: 'Muy sencillo el proceso logré hacerlo digitalmente y obtuve la póliza en 1 hora.',
    },

    {
      userIcon: 'mapfre-women-icon',
      userName: 'María Camila Piedrahita',
      userPuntuacion: {
        puntuacionPath1: 'assets/iconos/star-filled.svg',
        puntuacionPath2: 'assets/iconos/star-filled.svg',
        puntuacionPath3: 'assets/iconos/star-filled.svg',
        puntuacionPath4: 'assets/iconos/star-filled.svg',
        puntuacionPath5: 'assets/iconos/star-filled.svg',
      },
      userComment: 'Excelente servicio, requería la póliza para la firma del contrato y logré obtenerla rápido y sin salir de mi casa.',
    },
  ];

  /**
   * @description Array de beneficios
   */

  arrayBeneficios = [
    {
      icon: 'mapfre-market-icon',
      title: 'Compra',
      description:
        'Accede a la forma seguro de comprar tu seguro en línea y sin complicaciones',
    },
    {
      icon: 'mapfre-history-icon',
      title: 'Tiempo',
      description: 'Cotiza tu seguro todo riesgo al instante',
    },
    {
      icon: 'mapfre-network-icon',
      title: 'Online',
      description:
        'Accede desde cualquier dispositivo móvil para adquirir tu seguro todo riesgo',
    },
    {
      icon: 'mapfre-headphone-icon',
      title: 'Asesoría Personalizada',
      description:
        'No dudes en contactarnos, siempre estaremos dispuestos a ayudarte y responder todas las dudas que tengas',
    },
  ];
  /**
   *
   * @param formBuilder
   * @param router
   * @param dialog
   * @param route
   */

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private medicoConsultaServ: ConsultasPolizaMedicoService
  ) {}

  /**
   * @method
   * @description Permite imprimir los mensajes de error, cuando los campos del formulario no cumplen con las validaciones
   * @returns Mensajes de error que se imprimirán en HTML bajo el campo de comentario
   */
  errorEspecialidad() {
    return 'Debes seleccionar una especialidad';
  }

  ngOnInit(): void {
    /**
     * @description Declaración de campos para cada formulario y validaciones
     * @var autocompleteValidator Recibe como parámetro el array local que contiene la información a filtrar
     */
    this.especialidadForm = this.formBuilder.group({
      especialidadMedico: ['', Validators.required],
      autorizacion: ['', Validators.required],
    });
    this.medicoConsultaServ
      .getEspecialidadesMedico()
      .subscribe((especialidades) => {
        especialidades.map((esp) => {
          this.especialidades.push(esp);
        });
        this.especialidades.sort((a,b) => {
          return a.nombre_especialidad.localeCompare(b.nombre_especialidad)
        })
        /**
         * @description Permite filtrar las especialidades a medida que el usuario escribe en el input
         */
        this.especialidadList = this.especialidadForm.controls[
          'especialidadMedico'
        ].valueChanges.pipe(
          startWith<string | EspecialidadMedico>(''),
          map((value) =>
            typeof value === 'string' ? value : value.id_especialidad_medico
          ),
          map((nombreEspecialidad) =>
            nombreEspecialidad
              ? this._filtroEspecialidad(nombreEspecialidad)
              : this.especialidades.slice()
          )
        );
      });
  }

  /**
   * @description Mostrar valores de la interface con Autocompletado
   * @param marca
   */
  displayEspecialidad(especialidad: EspecialidadMedico): string {
    return especialidad && especialidad.nombre_especialidad
      ? especialidad.nombre_especialidad
      : '';
  }

  /**
   * @description Permite filtar la especialidad escrita por el usuario dentro del listado
   * @param nombreEspecialidad
   */
  private _filtroEspecialidad(nombreEspecialidad: string): EspecialidadMedico[] { 
    const letraFiltro = nombreEspecialidad.toString().toLowerCase();
    return this.especialidades.filter((option) =>
    option.nombre_especialidad.toLowerCase().includes(letraFiltro)
    );
  }

  /**
   * Este método permite seleccionar e imprimir en el input type text la opción seleccionada cuando el usuario filtra y solo pulsa enter
   * @param key Permite capturar el código ASCII de la tecla presionada por el usuario
   * CÓDIGO ASCII DE ENTER = 13
   */

  seleccionEspecialidadEnter(key) {
    let char = key.keyCode;
    if (char === 13) {
      this.nombreEspecialidad = this.especialidadForm.controls[
        'especialidadMedico'
      ].value.nombre_especialidad;
    }
  }

  /**
   * Este método imprime en el input type text el texto de la opción seleccionada por el usuario
   */
  escribirEspecialidad() {
    this.nombreEspecialidad = this.especialidadForm.controls[
      'especialidadMedico'
    ].value.nombre_especialidad;    
  }

  /**
   * @method
   * @description Permite enviar la especialidad del médico siempre y cuando haya sido seleccionada
   */
  enviarEspecialidad() {
    if (this.especialidadForm.invalid) {
      
    } else {
            //Evento personalizado google tag
            window.dataLayer.push({
              event: 'especialidad_seleccionada',
              especialidad: this.especialidadForm.controls['especialidadMedico'].value.nombre_especialidad
            });
            
      this.medicoConsultaServ.setEspecialidadMedico(
        this.especialidadForm.controls['especialidadMedico'].value
          .id_especialidad_medico, this.especialidadForm.controls['especialidadMedico'].value
          .nombre_especialidad
      );
      this.router.navigate(['cotizacion'], { relativeTo: this.route.parent });
    }
  }
  /**
   * @method
   * @description Permite abrir el diálogo que contiene el tratamiento de datos personales del cotizador
   */
  atdp() {
    this.dialog.open(DialogATDP, {
      panelClass: 'custom-dialog-container',
    });
  }
  /**
   * @method
   * @description Permite abrir el diálogo que contiene los términos y condiciones del sitio
   */
  terminos() {
    this.dialog.open(DialogTerminos, {
      panelClass: 'custom-dialog-container',
    });
  }

  /**
   * @method
   * @description Este método permite cambiar el background-color del nav cuando se hace scroll en pantalla
   */
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let element = document.querySelector('.navigation-container');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('background-red');
    } else {
      element.classList.remove('background-red');
    }
  }
}

// COMPONENTE DE TÉRMINOS Y CONDICIONES DEL SITIO

@Component({
  selector: 'dialog-terminos',
  templateUrl: 'terminos.html',
})
export class DialogTerminos implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<DialogTerminos>
  ) {}

  /**
   * @method
   * @description Cierra el diálogo
   */
  close() {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
// COMPONENTE DE AUTORIZACIÓN DE TRATAMIENTO DE DATOS
@Component({
  selector: 'dialog-atdp',
  templateUrl: 'atdp.html',
})
export class DialogATDP implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<DialogTerminos>
  ) {}

  ngOnInit() {}

  /**
   * @method
   * @description Cierra el diálogo
   */
  close() {
    this.dialogRef.close();
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
