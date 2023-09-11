import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject, lastValueFrom, takeUntil } from 'rxjs';

import { AtendsPerson } from 'src/app/interfaces/AtendsPerson';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-atendimentos',
  templateUrl: './atendimentos.component.html',
  styleUrls: ['./atendimentos.component.scss'],
})
export class AtendimentosComponent implements OnInit, OnDestroy {
  allAtends: AtendsPerson[] = [];
  filteredAtends: AtendsPerson[] = [];

  filterForm!: FormGroup;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private atendimentoService: AtendimentoService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      nm_paciente: '',
      nm_unidade: '',
      dt_inicial: null,
      dt_final: null,
    });

    this.filterForm.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.listaAtendimentos();
      });

    this.listaAtendimentos();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }

  listaAtendimentos() {
    const nm_paciente = this.filterForm.get('nm_paciente')?.value.toLowerCase();
    const nm_unidade = this.filterForm.get('nm_unidade')?.value.toLowerCase();
    const dt_inicial = this.filterForm.get('dt_inicial')?.value;
    const dt_final = this.filterForm.get('dt_final')?.value;

    lastValueFrom(
      this.atendimentoService.getAtendsPerson(
        nm_paciente,
        nm_unidade,
        dt_inicial,
        dt_final,
        this.userService.getLoggedUserId!
      )
    ).then((result) => {
      this.filteredAtends = result;
    });
  }

  editAtend(event: any) {
    if (event.type === 'click') {
      const atendId = event.row.id;
      this.router.navigate([`/atendimento/${atendId}`]);
    }
  }

  clearDateFilters() {
    this.filterForm.get('dt_inicial')?.setValue(null);
    this.filterForm.get('dt_final')?.setValue(null);
    this.listaAtendimentos();
  }
}
