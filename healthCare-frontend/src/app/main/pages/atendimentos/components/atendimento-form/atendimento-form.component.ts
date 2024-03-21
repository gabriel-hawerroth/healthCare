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
import { AtendimentoService } from '../../../../../services/atendimento/atendimento.service';
import { PatientService } from '../../../../../services/paciente/patient.service';
import { UnidadeService } from '../../../../../services/unidade/unidade.service';
import { UserService } from '../../../../../services/user/user.service';
import { ConfirmationDialogComponent } from '../../../../../utils/confirmation-dialog/confirmation-dialog.component';
import { UtilsService } from '../../../../../utils/utils.service';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatButtonModule } from '@angular/material/button';

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
    private userService: UserService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    const userId = this.userService.getLoggedUserId!;

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

    this.patientService.getPatients(userId).then((result) => {
      this.patients = this.utilsService.filterList(result, 'ieSituacao', 'A');
      this.filteredPatients = this.patients;
      this.atendForm.get('id_paciente')!.updateValueAndValidity();
    });

    this.unitService.getUnits(userId).then((result) => {
      this.units = this.utilsService.filterList(result, 'ieSituacao', 'A');
      this.filteredUnits = this.units;
      this.atendForm.get('id_unidade')!.updateValueAndValidity();
    });
  }

  buildForm() {
    this.atendForm = this.fb.group({
      id: '',
      id_paciente: ['', Validators.required],
      id_unidade: ['', Validators.required],
      dt_atendimento: ['', Validators.required],
      status_atend: '',
      medico_responsavel: '',
      hora_inicio: '',
      hora_fim: '',
      especialidade: '',
      tipo_atendimento: '',
      valor_atendimento: '',
      forma_pagamento: '',
      convenio: '',
      nr_carteirinha_convenio: '',
      userId: this.userService.getLoggedUserId,
    });
  }

  newAtend() {
    if (this.atendForm.invalid) {
      for (const controlName in this.atendForm.controls) {
        if (this.atendForm.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      this.utilsService.showSimpleMessage(
        'Não foi possível salvar as informações.',
        4500
      );
      return;
    }

    this.atendService
      .createAtendimento(this.atendForm.value)
      .then(() => {
        this.utilsService.showSimpleMessage('Atendimento criado com sucesso.');
        this.router.navigate(['/atendimento']);
      })
      .catch(() => {
        this.utilsService.showSimpleMessage(
          'Não foi possível salvar as informações.',
          4500
        );
      });
  }

  editAtend() {
    if (this.atendForm.invalid) {
      for (const controlName in this.atendForm.controls) {
        if (this.atendForm.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      this.utilsService.showSimpleMessage(
        'Não foi possível salvar as informações.',
        4500
      );
      return;
    }

    this.atendService
      .updateAtendimento(this.atendForm.value)
      .then(() => {
        this.utilsService.showSimpleMessage('Atendimento salvo com sucesso.');
        this.router.navigate(['/atendimento']);
      })
      .catch(() => {
        this.utilsService.showSimpleMessage(
          'Não foi possível salvar as informações.',
          4500
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
        this.router.navigate(['/atendimento']);
      })
      .catch(() => {
        this.utilsService.showSimpleMessage(
          'Não foi possível excluir o atendimento.',
          4500
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

    rows = this.utilsService.filterList(rows, 'dsNome', word);

    this.filteredPatients = rows;
  }

  filterUnitList(word: string) {
    let rows = this.units.slice();

    rows = this.utilsService.filterList(rows, 'dsNome', word);

    this.filteredUnits = rows;
  }
}
