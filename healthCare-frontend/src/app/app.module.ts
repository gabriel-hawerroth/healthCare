import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PacientesComponent } from './components/pages/pacientes/pacientes.component';
import { UnidadesComponent } from './components/pages/unidades/unidades.component';
import { AtendimentosComponent } from './components/pages/atendimentos/atendimentos.component';
import { PacienteFormComponent } from './components/pages/pacientes/pacienteForm/paciente-form.component';
import { CpfMaskPipe } from 'src/app/utils/cpf-mask.pipe';
import { UnitFormComponent } from './components/pages/unidades/unitForm/unit-form.component';
import { AtendimentoFormComponent } from './components/pages/atendimentos/atendimento-form/atendimento-form.component';
import { CnpjMaskPipe } from './utils/cnpj-mask.pipe';
import { ConfirmationDialogComponent } from './utils/confirmation-dialog/confirmation-dialog.component';
import { UsuariosComponent } from './components/pages/usuarios/usuarios.component';
import { UserFormComponent } from './components/pages/usuarios/userForm/user-form.component';
import { LoginComponent } from './components/pages/login/login.component';
import { NewUserComponent } from './components/pages/login/components/new-user/new-user.component';
import { ResetPasswordComponent } from './components/pages/login/components/reset-password/reset-password.component';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { BottomSheetComponent } from './utils/bottom-sheet/bottom-sheet.component';
import { AccountActivateComponent } from './components/pages/login/components/account-activate/account-activate.component';
import { ChangePasswordComponent } from './components/pages/login/components/change-password/change-password.component';

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
    UnitFormComponent,
    AtendimentoFormComponent,
    CnpjMaskPipe,
    ConfirmationDialogComponent,
    UsuariosComponent,
    UserFormComponent,
    LoginComponent,
    NewUserComponent,
    ResetPasswordComponent,
    BottomSheetComponent,
    AccountActivateComponent,
    ChangePasswordComponent,
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
    MatToolbarModule,
    MatBottomSheetModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    provideNgxMask(),
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
