import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject, lastValueFrom, takeUntil } from 'rxjs';

import { Unidade } from 'src/app/interfaces/Unidade';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss'],
})
export class UnidadesComponent implements OnInit, OnDestroy {
  filterForm!: FormGroup;
  units: Unidade[] = [];
  filteredUnits: BehaviorSubject<Unidade[]>;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private unidadeService: UnidadeService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {
    this.filteredUnits = new BehaviorSubject<Unidade[]>([]);
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      dsNome: '',
      ieSituacao: 'A',
    });

    this.listaUnidades();

    this.filterForm.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.filterList();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }

  listaUnidades() {
    lastValueFrom(
      this.unidadeService.getUnits(this.userService.getLoggedUserId!)
    ).then((result) => {
      this.units = result;
      this.filteredUnits.next(result);
      this.filterList();
    });
  }

  editUnit(event: any) {
    if (event.type === 'click') {
      const unitId = event.row.id;
      this.router.navigate([`/unidade/${unitId}`]);
    }
  }

  filterList() {
    let rows = this.units.slice();
    const dsNome = this.filterForm.get('dsNome')!.value;
    const ieSituacao = this.filterForm.get('ieSituacao')!.value;

    if (dsNome) {
      rows = this.utilsService.filterList(rows, 'dsNome', dsNome);
    }

    if (ieSituacao) {
      rows = this.utilsService.filterList(rows, 'ieSituacao', ieSituacao);
    }

    this.filteredUnits.next(rows);
  }
}
