import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import * as moment from 'moment';

import { Atendimento } from 'src/app/interfaces/Atendimento';
import { Patient } from 'src/app/interfaces/Patient';
import { Unidade } from 'src/app/interfaces/Unidade';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { PatientService } from 'src/app/services/paciente/patient.service';
import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-atendimento-form',
  templateUrl: './atendimento-form.component.html',
  styleUrls: ['./atendimento-form.component.scss'],
})
export class AtendimentoFormComponent implements OnInit, OnDestroy {
  @Input() atendData: Atendimento | null = null;

  atendForm!: FormGroup;
  atend?: Atendimento;
  pageType?: string;

  patients: Patient[] = [];
  units: Unidade[] = [];

  patientsList: FormControl = new FormControl();
  unitsList: FormControl = new FormControl();

  private _unsubscribeAll: Subject<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private atendService: AtendimentoService,
    private patientService: PatientService,
    private unitService: UnidadeService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.pageType = this.route.snapshot.paramMap.get('id') || 'Novo';
    const userId = this.userService.getLoggedUserId!;

    lastValueFrom(this.patientService.getPatients(userId)).then((result) => {
      this.patients = result;
    });

    lastValueFrom(this.unitService.getUnits(userId)).then((result) => {
      this.units = result;
    });

    this.patientsList.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((word: string) => {
        lastValueFrom(this.patientService.getPatients(userId)).then(
          (result) => {
            this.patients = result;
          }
        );
      });

    this.unitsList.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((word: string) => {
        lastValueFrom(this.unitService.getUnits(userId)).then((result) => {
          this.units = result;
        });
      });

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

    if (this.atendData) {
      this.atendForm.patchValue(this.atendData);
      this.atendForm
        .get('dt_atendimento')
        ?.setValue(moment(this.atendForm.value.dt_atendimento).toDate());
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }

  newAtend() {
    if (this.atendForm.invalid) {
      for (const controlName in this.atendForm.controls) {
        if (this.atendForm.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      this.snackBar.open('Não foi possível salvar as informações.', '', {
        duration: 4500,
      });
    } else {
      lastValueFrom(this.atendService.createAtendimento(this.atendForm.value))
        .then((result) => {
          this.snackBar.open('Atendimento criado com sucesso.', '', {
            duration: 4000,
          });
          this.router.navigate(['/atendimento']);
        })
        .catch((error) => {
          console.log(error);
          this.snackBar.open('Não foi possível salvar as informações.', '', {
            duration: 4500,
          });
        });
    }
  }

  editAtend() {
    if (this.atendForm.invalid) {
      for (const controlName in this.atendForm.controls) {
        if (this.atendForm.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      this.snackBar.open('Não foi possível salvar as informações.', '', {
        duration: 4500,
      });
    } else {
      lastValueFrom(this.atendService.updateAtendimento(this.atendForm.value))
        .then((result) => {
          this.snackBar.open('Atendimento salvo com sucesso.', '', {
            duration: 4000,
          });
          this.router.navigate(['/atendimento']);
        })
        .catch((error) => {
          console.log(error);
          this.snackBar.open('Não foi possível salvar as informações.', '', {
            duration: 4500,
          });
        });
    }
  }

  removeAtend() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    lastValueFrom(this.atendService.removeAtendimento(id))
      .then((result) => {
        this.snackBar.open('Atendimento removido com sucesso.', '', {
          duration: 4500,
        });
        this.router.navigate(['/atendimento']);
      })
      .catch((error) => {
        console.log(error);
        this.snackBar.open('Não foi possível excluir o atendimento.', '', {
          duration: 4500,
        });
      });
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    lastValueFrom(dialogRef.afterClosed()).then((result) => {
      if (result === true) {
        this.removeAtend();
      }
    });
  }
}
