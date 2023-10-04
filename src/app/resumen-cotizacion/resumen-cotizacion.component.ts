import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaSolicitudesService } from '../services/persona-solicitudes.service';
import { InformacionCompletaFinal } from '../interfaces/PersonaCliente'
@Component({
  selector: 'app-resumen-cotizacion',
  templateUrl: './resumen-cotizacion.component.html',
  styleUrls: ['./resumen-cotizacion.component.scss']
})

export class ResumenCotizacionComponent implements OnInit {
  nombre: string;
  apellido: string;
  informacionR: InformacionCompletaFinal;
  constructor(private router: Router, private personaService: PersonaSolicitudesService) { }

  ngOnInit(): void {
    this.personaService.obtenerInformacionFinal().subscribe(informacion => {
      this.informacionR = informacion;
    });
  }

  volverAlInicio() {
    this.router.navigateByUrl('');
  }

}
