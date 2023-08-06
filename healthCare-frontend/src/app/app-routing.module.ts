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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'paciente', component: PacientesComponent },
  { path: 'paciente/novo', component: PacienteFormComponent },
  { path: 'paciente/:id', component: EditPatientComponent },
  { path: 'unidade', component: UnidadesComponent },
  { path: 'unidade/novo', component: UnitFormComponent },
  { path: 'unidade/:id', component: EditUnitComponent },
  { path: 'atendimento', component: AtendimentosComponent },
  { path: 'atendimento/novo', component: AtendimentoFormComponent },
  { path: 'atendimento/:id', component: EditAtendComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
