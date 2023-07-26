import { Component, OnInit } from '@angular/core';

import { Atendimento } from 'src/app/Atendimento';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-atendimentos',
  templateUrl: './atendimentos.component.html',
  styleUrls: ['./atendimentos.component.scss'],
})
export class AtendimentosComponent implements OnInit {
  allAtends: Atendimento[] = [];
  atends: Atendimento[] = [];

  constructor(
    private atendimentoService: AtendimentoService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.atendimentoService.getAtendimentos().subscribe((items: any) => {
      this.allAtends = items;
      this.atends = items;
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;
  }

  editAtend(event: any) {
    if (event.type == 'click') {
      const patientId = event.row.id;
      this.route.navigate([`/paciente/${patientId}`]);
    }
  }
}
