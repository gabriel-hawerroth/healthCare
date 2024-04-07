import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Atendimento } from '../../../../../interfaces/atendimento';
import { Patient } from '../../../../../interfaces/patient';
import { Unidade } from '../../../../../interfaces/unidade';
import { AtendimentoService } from '../../../../../services/atendimento.service';
import { PatientService } from '../../../../../services/patient.service';
import { UnidadeService } from '../../../../../services/unidade.service';
import { ConfirmationDialogComponent } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { UtilsService } from '../../../../../utils/utils.service';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective } from 'ngx-mask';
import { LoginService } from '../../../../../services/login.service';

@Component({
  selector: 'app-atendimento-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    DatePipe,
    NgxMatSelectSearchModule,
    MatButtonModule,
    NgxMaskDirective,
  ],
  templateUrl: './atendimento-form.component.html',
  styleUrls: ['./atendimento-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtendimentoFormComponent implements OnInit {
  atendId: number | null = +this.route.snapshot.paramMap.get('id')! || null;
  atendData: Atendimento | null = null;

  atendForm!: FormGroup;
  atend?: Atendimento;

  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  units: Unidade[] = [];
  filteredUnits: Unidade[] = [];

  patientsList: FormControl = new FormControl();
  unitsList: FormControl = new FormControl();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private atendService: AtendimentoService,
    private patientService: PatientService,
    private unitService: UnidadeService,
    private loginService: LoginService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    const userId = this.loginService.getLoggedUserId!;

    this.buildForm();

    if (this.atendId) {
      this.atendService.getById(this.atendId).then((result) => {
        if (!result) return;

        this.atendData = result;
        this.atendForm.patchValue(this.atendData);

        this.atendForm
          .get('dt_atendimento')!
          .setValue(new Date(this.atendForm.value.dt_atendimento));
      });
    }

    this.getValues(userId);
  }

  buildForm() {
    this.atendForm = this.fb.group({
      id: null,
      id_paciente: [null, Validators.required],
      id_unidade: [null, Validators.required],
      dt_atendimento: ['', Validators.required],
      status_atend: null,
      medico_responsavel: null,
      hora_inicio: null,
      hora_fim: null,
      especialidade: null,
      tipo_atendimento: null,
      valor_atendimento: null,
      forma_pagamento: null,
      convenio: null,
      nr_carteirinha_convenio: null,
      user_id: this.loginService.getLoggedUserId,
    });

    this.atendForm.markAllAsTouched();
  }

  async getValues(userId: number) {
    const [patients, units] = await Promise.all([
      this.patientService.getPatients(userId),
      this.unitService.getUnits(userId),
    ]);

    this.patients = this.utilsService.filterList(patients, 'ie_situacao', 'A');
    this.units = this.utilsService.filterList(units, 'ie_situacao', 'A');

    this.filteredPatients = this.patients;
    this.filteredUnits = this.units;

    this.atendForm.get('id_paciente')!.updateValueAndValidity();
    this.atendForm.get('id_unidade')!.updateValueAndValidity();
  }

  saveAttendance() {
    if (this.atendForm.invalid) {
      for (const controlName in this.atendForm.controls) {
        if (this.atendForm.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      this.utilsService.showSimpleMessage('Formulário inválido');
      return;
    }

    this.atendService
      .saveAttendance(this.atendForm.getRawValue())
      .then(() => {
        this.utilsService.showSimpleMessage('Atendimento salvo com sucesso');
        this.router.navigate(['atendimento']);
      })
      .catch(() => {
        this.utilsService.showSimpleMessage(
          'Erro ao tentar salvar o atendimento'
        );
      });
  }

  removeAtend() {
    const id = +this.atendForm.value.id;

    this.atendService
      .removeAtendimento(id)
      .then(() => {
        this.utilsService.showSimpleMessage(
          'Atendimento removido com sucesso.'
        );
        this.router.navigate(['atendimento']);
      })
      .catch(() => {
        this.utilsService.showSimpleMessage(
          'Não foi possível excluir o atendimento'
        );
      });
  }

  openConfirmationDialog(): void {
    lastValueFrom(
      this.dialog.open(ConfirmationDialogComponent).afterClosed()
    ).then((result) => {
      if (result === true) {
        this.removeAtend();
      }
    });
  }

  filterPatientList(word: string) {
    let rows = this.patients.slice();

    rows = this.utilsService.filterList(rows, 'ds_nome', word);

    this.filteredPatients = rows;
  }

  filterUnitList(word: string) {
    let rows = this.units.slice();

    rows = this.utilsService.filterList(rows, 'ds_nome', word);

    this.filteredUnits = rows;
  }
}
