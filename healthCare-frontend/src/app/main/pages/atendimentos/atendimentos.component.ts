import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { AtendsPerson } from '../../../interfaces/atends_person';
import { AtendimentoService } from '../../../services/atendimento.service';
import { LoginService } from '../../../services/login.service';
import { UtilsService } from '../../../utils/utils.service';
import { AtendimentosListComponent } from './components/atendimentos-list/atendimentos-list.component';

@Component({
  selector: 'app-atendimentos',
  standalone: true,
  imports: [
    AtendimentosListComponent,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './atendimentos.component.html',
  styleUrls: ['./atendimentos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtendimentosComponent implements OnInit {
  filterForm!: FormGroup;

  atends: AtendsPerson[] = [];
  filteredAtends = signal<AtendsPerson[]>([]);

  constructor(
    private atendimentoService: AtendimentoService,
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      ds_paciente: '',
      ds_unidade: '',
      dt_inicial: null,
      dt_final: null,
    });

    this.listaAtendimentos();
  }

  listaAtendimentos() {
    this.atendimentoService
      .getAtends(this.loginService.getLoggedUserId!)
      .then((result) => {
        this.atends = result;
        this.filteredAtends.set(result);
        this.filterList();
      });
  }

  editAtend(event: any) {
    if (event.type === 'click') {
      const atendId = event.row.id;
      this.router.navigate([`atendimento/${atendId}`]);
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

    if (dsPaciente)
      rows = this.utilsService.filterList(rows, 'ds_paciente', dsPaciente);

    if (dsUnidade)
      rows = this.utilsService.filterList(rows, 'ds_unidade', dsUnidade);

    if (dtInicial || dtFinal) {
      rows = this.utilsService.filterListByDate(
        rows,
        'dt_atendimento',
        dtInicial,
        dtFinal
      );
    }

    this.filteredAtends.set(rows);
  }
}
