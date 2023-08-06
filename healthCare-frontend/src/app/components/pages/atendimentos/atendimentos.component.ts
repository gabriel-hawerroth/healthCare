import { Component, OnInit } from '@angular/core';

import { Atendimento } from 'src/app/Atendimento';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { PatientService } from 'src/app/services/paciente/patient.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';

import { Router } from '@angular/router';
import { Patient } from 'src/app/Patient';
import { Unidade } from 'src/app/Unidade';

@Component({
  selector: 'app-atendimentos',
  templateUrl: './atendimentos.component.html',
  styleUrls: ['./atendimentos.component.scss'],
})
export class AtendimentosComponent implements OnInit {
  allAtends: Atendimento[] = [];
  filteredAtends: Atendimento[] = [];

  constructor(
    private atendimentoService: AtendimentoService,
    private patientService: PatientService,
    private unitService: UnidadeService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.atendimentoService.getAtendimentos().subscribe((items: any) => {
      this.allAtends = items;
      this.filteredAtends = items;
    });
  }

  filterPatient(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value.toLowerCase();
  }

  filterUnit(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value.toLowerCase();
  }

  editAtend(event: any) {
    if (event.type == 'click') {
      const atendId = event.row.id;
      this.route.navigate([`/atendimento/${atendId}`]);
    }
  }
}
