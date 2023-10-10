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

  public mostrarFormularioEspecialidad: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  public setMostrarFormularioEspecialidad(valor: boolean) {
    this.mostrarFormularioEspecialidad = valor;
  }
}
