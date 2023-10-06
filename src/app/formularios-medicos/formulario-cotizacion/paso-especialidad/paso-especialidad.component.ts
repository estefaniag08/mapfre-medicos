import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ConsultasPolizaMedicoService } from './../../../services/consultas-poliza-medico.service';
import { EspecialidadMedico } from './../../../interfaces/PolizaMedConsultas';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { RCMedico, ClaseMedico } from './../../../interfaces/PolizaMedConsultas';

import { FormularioCotizacionComponent } from './../formulario-cotizacion.component';

declare global {
  interface Window { dataLayer: any[]; }
}

@Component({
  selector: 'app-paso-especialidad',
  templateUrl: './paso-especialidad.component.html',
  styleUrls: ['./paso-especialidad.component.scss']
})
export class PasoEspecialidadComponent implements OnInit {
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
    private medicoConsultaServ: ConsultasPolizaMedicoService,
    private formularioMedicos: FormularioCotizacionComponent
  ) {}
  
  /**
   * @description Array de especialidades
   */
  especialidades: EspecialidadMedico[] = [];
  especialidadList: Observable<EspecialidadMedico[]>;
  nombreEspecialidad: string;

  /**
   * @description Declaración de formulario
   */
  especialidadForm: FormGroup;
  
  /**
   * @description Array de valores asegurados que están almacenados en BD
   */
  valorAsegurado: RCMedico[] = [];

  profesion: FormGroup;

  /**
   * @description Estados que permiten mostrar u ocultar aclaraciones
   */

  mostrarTextoGeneral = true;
  mostrarTipoProcedimientoText: boolean = false;
  mostrarValorAseguradoText: boolean = false;
  mostrarTextoPasoUno: boolean = true;

  

  /**
   * @description Array de tipo de médicos en BD
   */
  tipoMedicos: ClaseMedico[] = [];

  ngOnInit(): void {
    /**
     * @description Declaración de campos para cada formulario y validaciones
     * @var autocompleteValidator Recibe como parámetro el array local que contiene la información a filtrar
     */
    this.especialidadForm = this.formBuilder.group({
      especialidadMedico: ['', Validators.required],
      autorizacion: ['', Validators.required],
      tipoMedico: ['', Validators.required],
      valorAsegurado: ['', Validators.required],
    });

    /**
         * @description Permite filtrar las especialidades a medida que el usuario escribe en el input
         */
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
      })

      //Agregado de "Tu Profesión" ====================================
      /**
        * @description Declaración de campos para cada formulario y sus validaciones
        */
      /*this.profesion = this.formBuilder.group({
        tipoMedico: ['', Validators.required],
        valorAsegurado: ['', Validators.required],
      });*/
      /*this.medicoConsultaServ.getClasesPorEspecialidad().subscribe((clases) => {
        for (let i = 0; i < clases.length; i++) {
          this.tipoMedicos.push(clases[i]);
        }
      });*/

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
    if (this.especialidadForm.valid) {
      
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
      this.obtenerTiposDeProcedimientoPorEspecialidad();
      //this.router.navigate(['cotizacion'], { relativeTo: this.route.parent });
    }
  }
  /**
   * @method
   * @description Permite imprimir los mensajes de error, cuando los campos del formulario no cumplen con las validaciones
   * @returns Mensajes de error que se imprimirán en HTML bajo el campo de comentario
   */
  errorEspecialidad() {
    return 'Debes seleccionar una especialidad';
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
  //Agregado de "Tu Profesión ======================================================"
  
  //Sin descripción UnU
  limpiarRc() {
    this.valorAsegurado = [];
  }

  //Sin descripción UnU
  obtenerRcPorClase() {
    this.medicoConsultaServ
      .getRCPorClase(this.especialidadForm.controls['tipoMedico'].value.id_clase_medico)
      .subscribe((rc) => {
        this.medicoConsultaServ.setArregloValoresRc(rc);
        this.valorAsegurado = [];
        rc.map((rc) => {
          this.valorAsegurado.push(rc);
        });
      });
  }

  //Sin descripción UnU
  enviarProfesionForm() {
    if (this.especialidadForm.invalid) {

    } else {
      //Evento personalizado google tag
      window.dataLayer.push({
        event: 'clase_seleccionada',
        clase: this.especialidadForm.controls['tipoMedico'].value.nombre_clase
      });
      //Evento personalizado google tag
      let index = this.valorAsegurado.findIndex(valor => valor.id_clase_rc_medico === this.especialidadForm.controls['valorAsegurado'].value)
      console.log(index)
      window.dataLayer.push({
        event: 'rc_seleccionado',
        rc: this.valorAsegurado[index].rc_medico.numero_rc_medico
      });

      this.medicoConsultaServ.setClaseNomb(this.especialidadForm.controls['tipoMedico'].value.nombre_clase)
      this.medicoConsultaServ.setClaseRc(
      this.especialidadForm.controls['valorAsegurado'].value
      );
      this.mostrarTextoPasoUno = false;
    }
  }

  //Sin descripción UnU
  mostrarTextoTipoProcedimiento() {
    this.mostrarTipoProcedimientoText = true;
    this.mostrarTextoGeneral = false;
    this.mostrarValorAseguradoText = false;
  }

  //Sin descripción UnU
  mostrarTextoValorAsegurado() {
    this.mostrarValorAseguradoText = true;
    this.mostrarTextoGeneral = false;
    this.mostrarTipoProcedimientoText = false;
  }
  
  /**
   * @method
   * @description Permite imprimir los mensajes de error, cuando los campos del formulario no cumplen con las validaciones
   * @returns Mensajes de error que se imprimirán en HTML bajo el campo de comentario
   */
  errorSeleccion() {
    return 'Debes seleccionar una opción para continuar';
  }
  
  /**
   * @method
   * @description Realiza la consulta al api de los tipos de procedimiento por especialidad
   */
  obtenerTiposDeProcedimientoPorEspecialidad(){
    this.medicoConsultaServ.getClasesPorEspecialidad().subscribe((clases) => {
      for (let i = 0; i < clases.length; i++) {
        this.tipoMedicos.push(clases[i]);
      }
    });
  }

  /**
   * @method
   * @description Guarda los datos de del formulario en la base de datos
   * (realiza las verificaciones pertinentes para el guardado)
   */

  confirmarFormularioEspecialidad(){
    if(this.especialidadForm.invalid){
      
    }else{
      this.enviarEspecialidad();
      this.enviarProfesionForm();
      this.cambiarFormularioDeEspecialidadPorContacto();
    }
  }

  /**
   * @method
   * @description Gestiona el estado del cambio de formularios
   */
  cambiarFormularioDeEspecialidadPorContacto(){
    this.formularioMedicos.setMostrarFormularioEspecialidad(false);
  }
}
// COMPONENTE DE TÉRMINOS Y CONDICIONES DEL SITIO

@Component({
  selector: 'dialog-terminos',
  templateUrl: './../../../home/terminos.html',
  //Revisar con Estefanía. ruta otiginal:'terminos.html'===========================
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
  templateUrl: './../../../home/atdp.html',
  //Revisar con Estefanía. ruta otiginal:'atdp.html'===========================
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
