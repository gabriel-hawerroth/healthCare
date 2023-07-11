import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { UnidadesComponent } from './components/pages/unidades/unidades.component';
import { AtendimentosComponent } from './components/pages/atendimentos/atendimentos.component';
import { PacientesComponent } from './components/pages/pacientes/pacientes.component';
import { PacienteFormComponent } from './components/pages/pacientes/pacienteForm/paciente-form.component';
import { PacienteNewComponent } from './components/pages/pacientes/pacienteNew/paciente-new.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'paciente', component: PacientesComponent },
  { path: 'paciente/novo', component: PacienteNewComponent },
  { path: 'paciente/:id', component: PacienteFormComponent },
  { path: 'unidade', component: UnidadesComponent },
  { path: 'atendimento', component: AtendimentosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
