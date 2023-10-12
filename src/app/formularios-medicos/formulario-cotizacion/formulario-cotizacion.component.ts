import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-formulario-cotizacion',
  templateUrl: './formulario-cotizacion.component.html',
  styleUrls: ['./formulario-cotizacion.component.scss'],
})
export class FormularioCotizacionComponent implements OnInit {
  /**
   * @description Estado que controla el formulario que se muestra
   * (si es falso, muestra el formulario de contacto)
   */

  public pasoDelFormulario: number = 0;

  /**
   * @param formularioCotizacionFinalizado
   * 
   */
  @Output() formularioCotizacionFinalizado = new EventEmitter<boolean>();

  /**
   * @description Estado que controla el formulario que se muestra
   * 
   */

  emitirFormularioCotizacionFinalizado(finalizado:boolean){
    this.formularioCotizacionFinalizado.emit(finalizado);
  }
  constructor() {}

  ngOnInit(): void {}

  formularioEspecialidadFinalizado(finalizado: boolean) {
    if (finalizado) {
      this.pasoDelFormulario = 1;
    }
  }
  formularioContactoFinalizado(finalizado: boolean) {
    if (finalizado) {
      this.pasoDelFormulario = 2;
      this.emitirFormularioCotizacionFinalizado(true);
    }
  }
}
