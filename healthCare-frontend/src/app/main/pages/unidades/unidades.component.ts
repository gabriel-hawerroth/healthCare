import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UnitListComponent } from './components/unit-list/unit-list.component';
import { MatIconModule } from '@angular/material/icon';
import { Unidade } from '../../../interfaces/unidade';
import { UnidadeService } from '../../../services/unidade/unidade.service';
import { UserService } from '../../../services/user/user.service';
import { UtilsService } from '../../../utils/utils.service';

@Component({
  selector: 'app-unidades',
  standalone: true,
  imports: [
    UnitListComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnidadesComponent implements OnInit, OnDestroy {
  filterForm!: FormGroup;

  units: Unidade[] = [];
  filteredUnits = signal<Unidade[]>([]);

  private _unsubscribeAll: Subject<any>;

  constructor(
    private unidadeService: UnidadeService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {
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
    this._unsubscribeAll.unsubscribe();
  }

  listaUnidades() {
    this.unidadeService
      .getUnits(this.userService.getLoggedUserId!)
      .then((result) => {
        this.units = result;
        this.filteredUnits.set(result);
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

    this.filteredUnits.set(rows);
  }
}
