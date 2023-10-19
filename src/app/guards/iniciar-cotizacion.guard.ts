import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConsultasPolizaMedicoService } from './../services/consultas-poliza-medico.service';

@Injectable({
  providedIn: 'root'
})
export class IniciarCotizacionGuard implements CanActivate {
  
  constructor(private router: Router, private polizaService: ConsultasPolizaMedicoService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const existeEspecialidad = this.polizaService.getClaseNomb();
      
      if (existeEspecialidad == null) { 
        this.router.navigate(['']);
        // Si devolvemos FALSE no de permitirá el acceso
        return false;
      }
      // Si devolvemos TRUE si se permitirá el acceso.
      return true;
    }
}
