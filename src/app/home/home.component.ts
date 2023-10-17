import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import {
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { EspecialidadMedico } from './../interfaces/PolizaMedConsultas';

declare global {
  interface Window {
    dataLayer: any[];
  }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
      userComment:
        'Muy sencillo el proceso logré hacerlo digitalmente y obtuve la póliza en 1 hora.',
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
      userComment:
        'Excelente servicio, requería la póliza para la firma del contrato y logré obtenerla rápido y sin salir de mi casa.',
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
   * @param router
   * @param dialog
   * @param route
   */

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {}


  ngOnInit(): void {
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
   * @method
   * @description Redirige a la página de cotización
   */
  enrutarAPaginaCotizacion() {
    console.log('rutaaa: ' + this.route.parent);
    this.router.navigate(['mostrar-cotizacion'], {
      relativeTo: this.route.parent,
    });
  }

  /**
   * @method
   * @description Verifica que el formulario se haya finalizado
   */
  formularioCotizacionFinalizado(finalizado: boolean) {
    if (finalizado) {
      this.enrutarAPaginaCotizacion();
    }
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
