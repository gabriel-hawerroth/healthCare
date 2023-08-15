import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PacientesComponent } from './components/pages/pacientes/pacientes.component';
import { UnidadesComponent } from './components/pages/unidades/unidades.component';
import { AtendimentosComponent } from './components/pages/atendimentos/atendimentos.component';
import { PacienteFormComponent } from './components/pages/pacientes/pacienteForm/paciente-form.component';
import { CpfMaskPipe } from 'src/app/utils/cpf-mask.pipe';
import { EditPatientComponent } from './components/pages/pacientes/editPatient/edit-patient.component';
import { UnitFormComponent } from './components/pages/unidades/unitForm/unit-form.component';
import { EditUnitComponent } from './components/pages/unidades/editUnit/edit-unit.component';
import { AtendimentoFormComponent } from './components/pages/atendimentos/atendimento-form/atendimento-form.component';
import { EditAtendComponent } from './components/pages/atendimentos/edit-atend/edit-atend.component';
import { CnpjMaskPipe } from './utils/cnpj-mask.pipe';
import { ConfirmationDialogComponent } from './utils/confirmation-dialog/confirmation-dialog.component';
import { UsuariosComponent } from './components/pages/usuarios/usuarios.component';
import { UserFormComponent } from './components/pages/usuarios/userForm/user-form/user-form.component';
import { EditUserComponent } from './components/pages/usuarios/editUser/edit-user/edit-user.component';
import { LoginComponent } from './components/pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PacientesComponent,
    UnidadesComponent,
    AtendimentosComponent,
    PacienteFormComponent,
    CpfMaskPipe,
    EditPatientComponent,
    UnitFormComponent,
    EditUnitComponent,
    AtendimentoFormComponent,
    EditAtendComponent,
    CnpjMaskPipe,
    ConfirmationDialogComponent,
    UsuariosComponent,
    UserFormComponent,
    EditUserComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSnackBarModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatMenuModule,
    MatDialogModule,
    MatTooltipModule,
    NgxMatSelectSearchModule,
  ],

  providers: [
    provideNgxMask(),
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
