/**
 * Esta clase permite bloquear las funciones de copiar, pegar y cortar donde sea necesario
 */

import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[paste-directive]'
})
export class PasteDirective {
  constructor() { }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }
}