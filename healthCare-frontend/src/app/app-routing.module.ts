import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { UnidadesComponent } from './components/pages/unidades/unidades.component';
import { AtendimentosComponent } from './components/pages/atendimentos/atendimentos.component';
import { PacientesComponent } from './components/pages/pacientes/pacientes.component';
import { PacienteFormComponent } from './components/pages/pacientes/pacienteForm/paciente-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pacientes', component: PacientesComponent },
  { path: 'unidades', component: UnidadesComponent },
  { path: 'atendimentos', component: AtendimentosComponent },
  { path: 'pacienteForm', component: PacienteFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
