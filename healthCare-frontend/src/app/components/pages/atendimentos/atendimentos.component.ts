import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Subject, lastValueFrom, takeUntil } from 'rxjs';

import { AtendsPerson } from 'src/app/interfaces/AtendsPerson';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-atendimentos',
  templateUrl: './atendimentos.component.html',
  styleUrls: ['./atendimentos.component.scss'],
})
export class AtendimentosComponent implements OnInit, OnDestroy {
  filterForm!: FormGroup;
  atends: AtendsPerson[] = [];
  filteredAtends: BehaviorSubject<AtendsPerson[]>;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private atendimentoService: AtendimentoService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {
    this.filteredAtends = new BehaviorSubject<AtendsPerson[]>([]);
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      ds_paciente: '',
      ds_unidade: '',
      dt_inicial: null,
      dt_final: null,
    });

    this.listaAtendimentos();

    this.filterForm.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.filterList();
      });
  }

  ngOnDestroy() {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }

  listaAtendimentos() {
    lastValueFrom(
      this.atendimentoService.getAtendsPerson(this.userService.getLoggedUserId!)
    ).then((result) => {
      this.atends = result;
      this.filteredAtends.next(result);
      this.filterList();
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
    this.filterList();
  }

  filterList() {
    let rows = this.atends.slice();
    const dsPaciente = this.filterForm.get('ds_paciente')!.value;
    const dsUnidade = this.filterForm.get('ds_unidade')!.value;
    const dtInicial = this.filterForm.get('dt_inicial')!.value;
    const dtFinal = this.filterForm.get('dt_final')!.value;

    if (dsPaciente) {
      rows = this.utilsService.filterList(rows, 'ds_paciente', dsPaciente);
    }

    if (dsUnidade) {
      rows = this.utilsService.filterList(rows, 'ds_unidade', dsUnidade);
    }

    if (dtInicial || dtFinal)
      rows = this.utilsService.filterListByDate(
        rows,
        'dt_atendimento',
        dtInicial,
        dtFinal
      );

    this.filteredAtends.next(rows);
  }
}
