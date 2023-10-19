import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaSolicitudesService } from '../services/persona-solicitudes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adjuntar-documentos',
  templateUrl: './adjuntar-documentos.component.html',
  styleUrls: ['./adjuntar-documentos.component.scss'],
})
export class AdjuntarDocumentosComponent implements OnInit {
  public href: string = '';
  adjuntarDocumentosForm: FormGroup;

  fileNameCed = 'Ningún archivo seleccionado';
  fileSelectedCed: string;
  labelCedula = 'Copia de tu cédula de ciudadanía';
  errorCedula: string = '';
  fileNameTarProf = 'Ningún archivo seleccionado';
  fileSelectedTarProf: string;
  labelTarProf = 'Copia de tu tarjeta profesional';
  errorTarProf: string = '';
  fileNameDipGrad = 'Ningún archivo seleccionado';
  fileSelectedDipGrad: string;
  labelDiploma = 'Diploma de grado';
  errorDiploma: string = '';
  fileNameActGrad = 'Ningún archivo seleccionado';
  fileSelectedActGrad: string;
  labelActa = 'Acta de grado';
  errorActa: string = '';
  urlDoc: string = '';
  arrayUrl: string[] = [];

  error: boolean = false;
  errorImagen: boolean = false;
  errorPdf: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private personaService: PersonaSolicitudesService
  ) {}

  ngOnInit(): void {
    this.adjuntarDocumentosForm = this.formBuilder.group({
      copiaCedula: [null],
      copiaTarjetaProfesional: [null],
      diplomaGrado: [null],
      actaGrado: [null],
    });
    this.arrayUrl = this.router.url.split('/');
    if (this.arrayUrl[2] === 'adjuntar-documentos') {
      this.urlDoc = this.arrayUrl[3];
    } else {
      this.urlDoc = this.arrayUrl[2];
    }
  }

  onFileChangeCel(event) {
    let reader = new FileReader();
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      reader.readAsDataURL(file);
      if (file.size < 5500000 && file.type == 'application/pdf') {
        this.fileNameCed = file.name;
        this.fileSelectedCed = 'ok';
        reader.onload = () => {
          this.adjuntarDocumentosForm.patchValue({
            copiaCedula: file,
          });
          this.adjuntarDocumentosForm
            .get('copiaCedula')
            .updateValueAndValidity();
          this.cd.markForCheck();
          this.labelCedula = 'Copia de tu cédula de ciudadanía';
          this.errorCedula = '';
        };
      } else if (
        file.size < 4500000 &&
        (file.type == 'image/jpeg' ||
          file.type == 'image/jpg' ||
          file.type == 'image/png')
      ) {
        this.fileNameCed = file.name;
        this.fileSelectedCed = 'ok';
        reader.onload = () => {
          this.adjuntarDocumentosForm.patchValue({
            copiaCedula: file,
          });
          this.adjuntarDocumentosForm
            .get('copiaCedula')
            .updateValueAndValidity();
          this.cd.markForCheck();
        };
        this.labelCedula = 'Copia de tu cédula de ciudadanía';
        this.errorCedula = '';
      } else if (
        file.type == 'image/jpeg' ||
        file.type == 'image/jpg' ||
        file.type == 'image/png'
      ) {
        this.fileNameCed = 'Ningún archivo seleccionado';
        this.fileSelectedCed = 'error';
        this.labelCedula = 'Selecciona otro archivo';
        this.errorCedula = 'El peso máximo para las imágenes es de 4MB';
      } else {
        this.fileNameCed = 'Ningún archivo seleccionado';
        this.fileSelectedCed = 'error';
        this.labelCedula = 'Selecciona otro archivo';
        this.errorCedula = 'El peso máximo para los archivos PDF es de 5MB';
      }
    }
  }

  onFileChangeTarProf(event) {
    let reader = new FileReader();
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      reader.readAsDataURL(file);
      if (file.size < 5500000 && file.type == 'application/pdf') {
        this.fileNameTarProf = file.name;
        this.fileSelectedTarProf = 'ok';
        reader.onload = () => {
          this.adjuntarDocumentosForm.patchValue({
            copiaTarjetaProfesional: file,
          });
          this.adjuntarDocumentosForm
            .get('copiaTarjetaProfesional')
            .updateValueAndValidity();
          this.cd.markForCheck();
        };
        this.labelTarProf = 'Copia de tu tarjeta profesional';
        this.errorTarProf = '';
      } else if (
        file.size < 4500000 &&
        (file.type == 'image/jpeg' ||
          file.type == 'image/jpg' ||
          file.type == 'image/png')
      ) {
        this.fileNameTarProf = file.name;
        this.fileSelectedTarProf = 'ok';
        reader.onload = () => {
          this.adjuntarDocumentosForm.patchValue({
            copiaTarjetaProfesional: file,
          });
          this.adjuntarDocumentosForm
            .get('copiaTarjetaProfesional')
            .updateValueAndValidity();
          this.cd.markForCheck();
        };
        this.labelTarProf = 'Copia de tu tarjeta profesional';
        this.errorTarProf = '';
      } else if (
        file.type == 'image/jpeg' ||
        file.type == 'image/jpg' ||
        file.type == 'image/png'
      ) {
        this.fileNameTarProf = 'Ningún archivo seleccionado';
        this.fileSelectedTarProf = 'error';
        this.labelTarProf = 'Selecciona otro archivo';
        this.errorTarProf = 'El peso máximo para las imágenes es de 4MB';
      } else {
        this.fileNameTarProf = 'Ningún archivo seleccionado';
        this.fileSelectedTarProf = 'error';
        this.labelTarProf = 'Selecciona otro archivo';
        this.errorTarProf = 'El peso máximo para los archivos PDF es de 5MB';
      }
    }
  }

  onFileChangeDipGrad(event) {
    let reader = new FileReader();
    const file = event.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
      if (file.size < 5500000 && file.type == 'application/pdf') {
        this.fileNameDipGrad = event.target.files[0].name;
        this.fileSelectedDipGrad = 'ok';
        reader.onload = () => {
          this.adjuntarDocumentosForm.patchValue({
            diplomaGrado: file,
          });
          this.adjuntarDocumentosForm
            .get('diplomaGrado')
            .updateValueAndValidity();
          this.cd.markForCheck();
        };
        this.labelDiploma = 'Diploma de grado';
        this.errorDiploma = '';
      } else if (
        file.size < 4500000 &&
        (file.type == 'image/jpeg' ||
          file.type == 'image/jpg' ||
          file.type == 'image/png')
      ) {
        this.fileNameDipGrad = file.name;
        this.fileSelectedDipGrad = 'ok';
        reader.onload = () => {
          this.adjuntarDocumentosForm.patchValue({
            diplomaGrado: file,
          });
          this.adjuntarDocumentosForm
            .get('diplomaGrado')
            .updateValueAndValidity();
          this.cd.markForCheck();
        };
        this.labelDiploma = 'Diploma de grado';
        this.errorDiploma = '';
      } else if (
        file.type == 'image/jpeg' ||
        file.type == 'image/jpg' ||
        file.type == 'image/png'
      ) {
        this.fileNameDipGrad = 'Ningún archivo seleccionado';
        this.fileSelectedDipGrad = 'error';
        this.labelDiploma = 'Selecciona otro archivo';
        this.errorDiploma = 'El peso máximo para las imágenes es de 4MB';
      } else {
        this.fileNameDipGrad = 'Ningún archivo seleccionado';
        this.fileSelectedDipGrad = 'error';
        this.labelDiploma = 'Selecciona otro archivo';
        this.errorDiploma = 'El peso máximo para los archivos PDF es de 5MB';
      }
    }
  }

  onFileChangeActGrad(event) {
    let reader = new FileReader();
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      reader.readAsDataURL(file);
      if (file.size < 5500000 && file.type == 'application/pdf') {
        this.fileNameActGrad = file.name;
        this.fileSelectedActGrad = 'ok';
        reader.onload = () => {
          this.adjuntarDocumentosForm.patchValue({
            actaGrado: file,
          });
          this.adjuntarDocumentosForm.get('actaGrado').updateValueAndValidity();
          this.cd.markForCheck();
        };
        this.labelActa = 'Acta de grado';
        this.errorActa = '';
      } else if (
        file.size < 4500000 &&
        (file.type == 'image/jpeg' ||
          file.type == 'image/jpg' ||
          file.type == 'image/png')
      ) {
        this.fileNameActGrad = file.name;
        this.fileSelectedActGrad = 'ok';
        reader.onload = () => {
          this.adjuntarDocumentosForm.patchValue({
            actaGrado: file,
          });
          this.adjuntarDocumentosForm.get('actaGrado').updateValueAndValidity();
          this.cd.markForCheck();
        };
        this.labelActa = 'Acta de grado';
        this.errorActa = '';
      } else if (
        file.type == 'image/jpeg' ||
        file.type == 'image/jpg' ||
        file.type == 'image/png'
      ) {
        this.fileNameActGrad = 'Ningún archivo seleccionado';
        this.fileSelectedActGrad = 'error';
        this.labelActa = 'Selecciona otro archivo';
        this.errorActa = 'El peso máximo para las imágenes es de 4MB';
      } else {
        this.fileNameActGrad = 'Ningún archivo seleccionado';
        this.fileSelectedActGrad = 'error';
        this.labelActa = 'Selecciona otro archivo';
        this.errorActa = 'El peso máximo para los archivos PDF es de 5MB';
      }
    }
  }

  sendDocumentosForm() {
    if (this.adjuntarDocumentosForm.invalid) {
    } else {
      if (this.adjuntarDocumentosForm.controls['copiaCedula'].value !== null) {
        this.personaService
          .adjuntarArchivo(
            'documento_identidad',
            this.adjuntarDocumentosForm.get('copiaCedula').value,
            this.urlDoc
          )
          .subscribe((rta) => {});
      }
      if (
        this.adjuntarDocumentosForm.controls['copiaTarjetaProfesional']
          .value !== null
      ) {
        this.personaService
          .adjuntarArchivo(
            'tarjeta_profesional',
            this.adjuntarDocumentosForm.get('copiaTarjetaProfesional').value,
            this.urlDoc
          )
          .subscribe((rta2) => {});
      }
      if (this.adjuntarDocumentosForm.controls['diplomaGrado'].value !== null) {
        this.personaService
          .adjuntarArchivo(
            'diploma_de_grado',
            this.adjuntarDocumentosForm.get('diplomaGrado').value,
            this.urlDoc
          )
          .subscribe((rta3) => {});
      }
      if (this.adjuntarDocumentosForm.controls['actaGrado'].value !== null) {
        this.personaService
          .adjuntarArchivo(
            'acta_de_grado',
            this.adjuntarDocumentosForm.get('actaGrado').value,
            this.urlDoc
          )
          .subscribe((rta4) => {});
      }

      if (this.arrayUrl[2] === 'adjuntar-documentos') {
        this.router.navigate(['resumen-cotizacion']);
      } else {
        Swal.fire('Subiste tus documentos con éxito.', ' ', 'success').then(
          (res) => {
            this.router.navigate(['']);
          }
        );
      }
    }
  }

  adjuntarDocumentosDespues() {
    if (this.arrayUrl[2] === 'adjuntar-documentos') {
      this.router.navigate(['resumen-cotizacion']);
    } else {
      this.router.navigate(['']);
    }
  }
}
