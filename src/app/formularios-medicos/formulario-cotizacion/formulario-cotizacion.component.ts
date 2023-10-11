import { Component, OnInit } from '@angular/core';

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

  public formularioEspecialidadFinalizado: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  setFormularioEspecialidadFinalizado(valor: boolean) {
    this.formularioEspecialidadFinalizado = valor;
  }
}
