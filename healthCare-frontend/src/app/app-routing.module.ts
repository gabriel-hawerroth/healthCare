import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { UnidadesComponent } from './components/pages/unidades/unidades.component';
import { AtendimentosComponent } from './components/pages/atendimentos/atendimentos.component';
import { PacientesComponent } from './components/pages/pacientes/pacientes.component';
import { PacienteFormComponent } from './components/pages/pacientes/pacienteForm/paciente-form.component';
import { EditPatientComponent } from './components/pages/pacientes/editPatient/edit-patient.component';
import { UnitFormComponent } from './components/pages/unidades/unitForm/unit-form.component';
import { EditUnitComponent } from './components/pages/unidades/editUnit/edit-unit.component';
import { AtendimentoFormComponent } from './components/pages/atendimentos/atendimento-form/atendimento-form.component';
import { EditAtendComponent } from './components/pages/atendimentos/edit-atend/edit-atend.component';
import { UsuariosComponent } from './components/pages/usuarios/usuarios.component';
import { UserFormComponent } from './components/pages/usuarios/userForm/user-form.component';
import { EditUserComponent } from './components/pages/usuarios/editUser/edit-user.component';
import { NewUserComponent } from './components/pages/login/components/new-user/new-user.component';
import { ResetPasswordComponent } from './components/pages/login/components/reset-password/reset-password.component';
import { LoginComponent } from './components/pages/login/login.component';
import { unauthenticatedUserGuard } from './services/guards/unauthenticated-user.guard';
import { authenticatedUserGuard } from './services/guards/authenticated-user.guard';
import { AccountActivateComponent } from './components/pages/login/components/account-activate/account-activate.component';
import { ChangePasswordComponent } from './components/pages/login/components/change-password/change-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [unauthenticatedUserGuard],
  },
  {
    path: 'novo-usuario',
    component: NewUserComponent,
    canActivate: [unauthenticatedUserGuard],
  },
  {
    path: 'esqueci-minha-senha',
    component: ResetPasswordComponent,
    canActivate: [unauthenticatedUserGuard],
  },
  {
    path: 'ativacao-da-conta',
    component: AccountActivateComponent,
    canActivate: [unauthenticatedUserGuard],
  },
  {
    path: 'recuperacao-da-senha/:id',
    component: ChangePasswordComponent,
    canActivate: [unauthenticatedUserGuard],
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [authenticatedUserGuard],
  },
  {
    path: 'paciente',
    component: PacientesComponent,
    canActivate: [authenticatedUserGuard],
  },
  {
    path: 'paciente/novo',
    component: PacienteFormComponent,
    canActivate: [authenticatedUserGuard],
  },
  {
    path: 'paciente/:id',
    component: EditPatientComponent,
    canActivate: [authenticatedUserGuard],
  },
  {
    path: 'unidade',
    component: UnidadesComponent,
    canActivate: [authenticatedUserGuard],
  },
  {
    path: 'unidade/novo',
    component: UnitFormComponent,
    canActivate: [authenticatedUserGuard],
  },
  {
    path: 'unidade/:id',
    component: EditUnitComponent,
    canActivate: [authenticatedUserGuard],
  },
  {
    path: 'atendimento',
    component: AtendimentosComponent,
    canActivate: [authenticatedUserGuard],
  },
  {
    path: 'atendimento/novo',
    component: AtendimentoFormComponent,
    canActivate: [authenticatedUserGuard],
  },
  {
    path: 'atendimento/:id',
    component: EditAtendComponent,
    canActivate: [authenticatedUserGuard],
  },
  {
    path: 'usuario',
    component: UsuariosComponent,
    canActivate: [authenticatedUserGuard],
  },
  {
    path: 'usuario/novo',
    component: UserFormComponent,
    canActivate: [authenticatedUserGuard],
  },
  {
    path: 'usuario/:id',
    component: EditUserComponent,
    canActivate: [authenticatedUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
