import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  formularioEspecialidadFinalizado(finalizado: boolean) {
    if (finalizado) {
      this.pasoDelFormulario = 1;
    } else {
      this.pasoDelFormulario = 0;
    }
  }
  formularioContactoFinalizado(finalizado: boolean) {
    if (finalizado) {
      this.pasoDelFormulario = 2;
      this.enrutarAPaginaCotización();
    } else {
      this.pasoDelFormulario = 0;
    }
  }
  enrutarAPaginaCotización() {
    this.router.navigate(['mostrar-cotizacion'], {
      relativeTo: this.route.parent,
    });
  }
}
