import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CambioRcComponent } from '../cambio-rc/cambio-rc.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RCMedico, ClaseMedico } from '../interfaces/PolizaMedConsultas';
import { ConsultasPolizaMedicoService } from './../services/consultas-poliza-medico.service';
import { PersonaSolicitudesService } from './../services/persona-solicitudes.service';
/**
 * @description Interface general que permite capturar el value y mostrar la información en un campo tipo select
 * @var value Corresponde al id del en BD
 * @var viewValue a los textos que se imprimirán en pantalla
 */
interface InterfaceGlobal {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-mostrar-cotizacion',
  templateUrl: './mostrar-cotizacion.component.html',
  styleUrls: ['./mostrar-cotizacion.component.scss'],
})
export class MostrarCotizacionComponent implements OnInit {
  // Array valor cotizaciones
  cotizaciones: RCMedico[] = [];
  especialidad: string;
  clase: string;
  idValorCotizado: number;
  cuarentaPor: number;
  /**
   * @description Objeto que permite configurar el diálogo
   * @type MatDialogConfig
   * @see Dialog Angular Material @link https://v9.material.angular.io/components/dialog/overview#specifying-global-configuration-defaults
   */
  dialogConfig = new MatDialogConfig();

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private consultaMedService: ConsultasPolizaMedicoService,
    private personaService: PersonaSolicitudesService
  ) {}
  /**
   * @description Este es el valor de la cotización
   */
  valorCotizacion: RCMedico = null;
  ngOnInit(): void {
    //this.personaService.anadirInformacionCotizacion(this.consultaMedService.getInformacionCotizacion());
    this.especialidad = this.consultaMedService.getEspecialidadNomb();
    this.clase = this.consultaMedService.getClaseNomb();
    this.valorCotizacion = this.consultaMedService.getValorSeleccionado();
    this.cotizaciones = this.consultaMedService.getArregloValoresRc();
    this.cuarentaPor =
      parseInt(this.valorCotizacion.rc_medico.numero_rc_medico) * 0.4;
  }

  cambiarValor(idClaseRc) {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;

    this.dialogConfig.data = {
      idClaseRc,
      arregloCotizaciones: this.cotizaciones,
    };

    /**
     * @description Envía los parámetros necesarios para ejecutar el diálogo
     * @param CambioRcComponent Componente que contiene el código HTML y funcionalidad que se insertará en el diálogo
     * @param dialogConfig Contiene la información cargada previamente
     */
    const dialogRef = this.dialog.open(CambioRcComponent, this.dialogConfig);

    /**
     * @description Recibe el valor actualizado en el diálogo para imprimirlo en pantalla
     */
    dialogRef.afterClosed().subscribe((data) => {
      this.valorCotizacion = this.consultaMedService.getValorSeleccionado();
      this.cuarentaPor =
        parseInt(this.valorCotizacion.rc_medico.numero_rc_medico) * 0.4;
    });
  }

  adquirirSeguro() {
    this.personaService.anadirInformacionCotizacionCorreo(
      this.consultaMedService.getInformacionCotizacion()
    );
    this.router.navigate(['identificacion-medico']);
  }
}
