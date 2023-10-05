// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule}  from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CurrencyPipe } from '@angular/common';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatIconModule } from '@angular/material/icon';

// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StepFormComponent } from './step-form/step-form.component';
import { MostrarCotizacionComponent } from './mostrar-cotizacion/mostrar-cotizacion.component';
import { CambioRcComponent } from './cambio-rc/cambio-rc.component';
import { IdentificacionComponent } from './identificacion/identificacion.component';
import { AdjuntarDocumentosComponent } from './adjuntar-documentos/adjuntar-documentos.component';
import { ResumenCotizacionComponent } from './resumen-cotizacion/resumen-cotizacion.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { PasteDirective } from './step-form/paste-directive';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { FormularioCotizacionComponent } from './formularios-medicos/formulario-cotizacion/formulario-cotizacion.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StepFormComponent,
    MostrarCotizacionComponent,
    CambioRcComponent,
    IdentificacionComponent,
    AdjuntarDocumentosComponent,
    ResumenCotizacionComponent,
    NavigationComponent,
    FooterComponent,
    PasteDirective,
    ErrorpageComponent,
    FormularioCotizacionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule, 
    MatFormFieldModule, MatSelectModule, MatAutocompleteModule, 
    MatInputModule, MatButtonModule, MatStepperModule, MatDatepickerModule, ClipboardModule, MatTabsModule, MatIconModule,
    MatMomentDateModule, MatRadioModule, MatDialogModule, MatCheckboxModule, MatTooltipModule, MatToolbarModule, MatCardModule, CarouselModule ,
  ],
  providers: [CurrencyPipe],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
