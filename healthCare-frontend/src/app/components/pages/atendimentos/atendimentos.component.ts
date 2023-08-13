import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AtendsPerson } from 'src/app/AtendsPerson';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-atendimentos',
  templateUrl: './atendimentos.component.html',
  styleUrls: ['./atendimentos.component.scss'],
})
export class AtendimentosComponent implements OnInit, OnDestroy {
  allAtends: AtendsPerson[] = [];
  filteredAtends: AtendsPerson[] = [];

  subscriptions!: Subscription;

  constructor(
    private atendimentoService: AtendimentoService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.subscriptions = this.atendimentoService
      .getAtendimentos()
      .subscribe((items: any) => {
        this.allAtends = items;
        this.filteredAtends = items;
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  filterPatient(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.filteredAtends = this.allAtends.filter((atend) => {
      return atend.ds_paciente.toLowerCase().includes(value);
    });
  }

  filterUnit(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.filteredAtends = this.allAtends.filter((atend) => {
      return atend.ds_unidade.toLowerCase().includes(value);
    });
  }

  editAtend(event: any) {
    if (event.type === 'click') {
      const atendId = event.row.id;
      this.route.navigate([`/atendimento/${atendId}`]);
    }
  }
}
