import { Routes } from '@angular/router';
import { authenticatedUserGuard } from './services/guards/authenticated-user.guard';
import { unauthenticatedUserGuard } from './services/guards/unauthenticated-user.guard';
import { AtendimentosComponent } from './main/pages/atendimentos/atendimentos.component';
import { AtendimentoFormComponent } from './main/pages/atendimentos/components/atendimento-form/atendimento-form.component';
import { HomeComponent } from './main/pages/home/home.component';
import { AccountActivateComponent } from './main/pages/login/components/account-activate/account-activate.component';
import { ChangePasswordComponent } from './main/pages/login/components/change-password/change-password.component';
import { NewUserComponent } from './main/pages/login/components/new-user/new-user.component';
import { ResetPasswordComponent } from './main/pages/login/components/reset-password/reset-password.component';
import { LoginComponent } from './main/pages/login/login.component';
import { PacienteFormComponent } from './main/pages/pacientes/components/paciente-form/paciente-form.component';
import { PacientesComponent } from './main/pages/pacientes/pacientes.component';
import { UnidadesComponent } from './main/pages/unidades/unidades.component';
import { UnitFormComponent } from './main/pages/unidades/components/unit-form/unit-form.component';
import { UserFormComponent } from './main/pages/usuarios/components/user-form/user-form.component';
import { UsuariosComponent } from './main/pages/usuarios/usuarios.component';

export const routes: Routes = [
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
    component: PacienteFormComponent,
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
    component: UnitFormComponent,
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
    component: AtendimentoFormComponent,
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
    component: UserFormComponent,
    canActivate: [authenticatedUserGuard],
  },
];
