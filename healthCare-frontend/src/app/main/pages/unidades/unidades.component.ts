import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UnitListComponent } from './components/unit-list/unit-list.component';
import { MatIconModule } from '@angular/material/icon';
import { Unidade } from '../../../interfaces/unidade';
import { UnidadeService } from '../../../services/unidade/unidade.service';
import { UtilsService } from '../../../utils/utils.service';
import { LoginService } from '../../../services/user/login.service';

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
export class UnidadesComponent implements OnInit {
  filterForm!: FormGroup;

  units: Unidade[] = [];
  filteredUnits = signal<Unidade[]>([]);

  constructor(
    private unidadeService: UnidadeService,
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      ds_nome: '',
      ie_situacao: 'A',
    });

    this.listaUnidades();
  }

  listaUnidades() {
    this.unidadeService
      .getUnits(this.loginService.getLoggedUserId!)
      .then((result) => {
        this.units = result;
        this.filteredUnits.set(result);
        this.filterList();
      });
  }

  editUnit(event: any) {
    if (event.type === 'click') {
      const unitId = event.row.id;
      this.router.navigate([`unidade/${unitId}`]);
    }
  }

  filterList() {
    let rows = this.units.slice();
    const dsNome = this.filterForm.value.ds_nome;
    const ieSituacao = this.filterForm.value.ie_situacao;

    if (dsNome) {
      rows = this.utilsService.filterList(rows, 'ds_nome', dsNome);
    }

    if (ieSituacao) {
      rows = this.utilsService.filterList(rows, 'ie_situacao', ieSituacao);
    }

    this.filteredUnits.set(rows);
  }
}
