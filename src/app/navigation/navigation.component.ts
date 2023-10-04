import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
} from '@angular/material/tooltip';

/**
 * @description Configuración del tooltip que saldrá cuando el usuario copie el correo en el portapapeles
 */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 500,
  hideDelay: 1000,
  touchendHideDelay: 0,
};

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults },
  ],
})
export class NavigationComponent {
  /**
   * @description Configuración de observable que permite identificar cuándo y si el usuario ha copiado el correo en el portapapeles
   */
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  /**
   *
   * @param breakpointObserver Observable configurado anteriormente
   */
  constructor(private breakpointObserver: BreakpointObserver) {}
  /**
   * @description correo alseguros
   */
  value = 'contacto@alseguros.co';
  /**
   * @description Mensaje que se mostrará cuando el usuario copie el correo
   */
  correo = 'El correo ha sido copiado en el portapapeles';

  ngOnInit(): void {}
}
