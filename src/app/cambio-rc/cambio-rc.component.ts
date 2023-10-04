import { Component, OnInit, forwardRef, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import {
  FormGroup,
  FormBuilder,
  Validators,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { RCMedico } from '../interfaces/PolizaMedConsultas';
import { ConsultasPolizaMedicoService } from '../services/consultas-poliza-medico.service';

@Component({
  selector: 'app-cambio-rc',
  templateUrl: './cambio-rc.component.html',
  styleUrls: ['./cambio-rc.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CambioRcComponent),
      multi: true,
    },
  ],
})
export class CambioRcComponent implements OnInit {
  /**
   * @description Array de valores asegurados que están almacenados en BD
   */
  valorAsegurado: RCMedico[] = [];

  idValorCotizado: string;
  cambioRC: FormGroup;

    /**
   * @description Corresponde a la descripción de la opción seleccionada
   */
  valorSeleccionado: string;

  /**
   * Parámetros que se implementarán para el funcionamiento de ControlValueAccessor
   * @var value
   * @var onTouched
   * @var onChange
   * @var disabled
   */
  value: string;
  onTouched: () => void;
  onChange(evt) {
    this.valorSeleccionado = evt.value;
  }
  disabled: boolean;
  claseRc;
  arregloCot;
  constructor(
    @Inject(MAT_DIALOG_DATA) { idClaseRc, arregloCotizaciones },
    public dialogRef: MatDialogRef<CambioRcComponent>,
    private formBuilder: FormBuilder,
    private consultaMedService: ConsultasPolizaMedicoService
  ) {
    this.claseRc = idClaseRc;
    this.arregloCot = arregloCotizaciones;
    //this.valorAsegurado = arregloCotizaciones;
  }

  /**
   * @method
   * @description Funcion obligatoria dentro de la interfaz ControlValueAccessor. Permite acceder al valor registrado en el formulario
   * @param value
   */
  writeValue(value: string): void {
    this.value = value ? value : '';
  }

  /**
   * @method
   * @description Funcion obligatoria dentro de la interfaz ControlValueAccessor. Permite identificar el valor del input
   * @param fn
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * @method
   * @description Funcion obligatoria dentro de la interfaz ControlValueAccessor. Función que se ejecutará cuando el input se encuentra en estado "touched"
   * @param fn
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * @method
   * @description Funcion obligatoria dentro de la interfaz ControlValueAccessor. Trae el estado "disabled" desde el formulario, si aplica
   * @param isDisable
   */
  setDisabledState?(isDisable: boolean): void {
    this.disabled = isDisable;
  }


  ngOnInit(): void {
    /**
     * @description Declaración de campos para cada formulario y sus validaciones
     */
    this.cambioRC = this.formBuilder.group({
      valorRC: [this.idValorCotizado,],
    });
    let posicionRc: number = -1;
    this.idValorCotizado = this.claseRc;
    for(let i = 0; i < this.arregloCot.length; i++){
      if(this.arregloCot[i].id_clase_rc_medico === this.idValorCotizado){
        posicionRc = i;
      }
    }
    if(posicionRc<2){
      for(let j = 0; j < (posicionRc+3); j++){
        this.valorAsegurado.push(this.arregloCot[j]);
      }
    } else if(posicionRc > 11) {
      for(let j = (posicionRc-3); j < this.arregloCot.length; j++){
        this.valorAsegurado.push(this.arregloCot[j]);
      }
    } else {
      for(let j = (posicionRc-2); j < (posicionRc+2); j++){
        this.valorAsegurado.push(this.arregloCot[j]);
      }
    }
    
  }

  enviarCambioRC() {
    this.consultaMedService.setClaseRc(this.cambioRC.controls['valorRC'].value)
    this.dialogRef.close(this.cambioRC.controls['valorRC'].value)
  }
}

