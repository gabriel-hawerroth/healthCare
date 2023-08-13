import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendimento } from 'src/app/Atendimento';
import { Patient } from 'src/app/Patient';
import { Unidade } from 'src/app/Unidade';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { PatientService } from 'src/app/services/paciente/patient.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-atendimento-form',
  templateUrl: './atendimento-form.component.html',
  styleUrls: ['./atendimento-form.component.scss'],
})
export class AtendimentoFormComponent implements OnInit {
  @Input() atendData: Atendimento | null = null;

  atendForm!: FormGroup;
  atend?: Atendimento;
  pageType?: string;

  patients: Patient[] = [];
  units: Unidade[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private atendService: AtendimentoService,
    private patientService: PatientService,
    private unitService: UnidadeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.pageType = this.route.snapshot.paramMap.get('id') || 'Novo';

    lastValueFrom(this.patientService.getPatients('', 'A')).then((result) => {
      this.patients = result;
    });

    lastValueFrom(this.unitService.getUnits('', 'A')).then((result) => {
      this.units = result;
    });

    this.atendForm = new FormGroup({
      id: new FormControl(this.atendData ? this.atendData.id : ''),
      id_paciente: new FormControl(
        this.atendData ? this.atendData.id_paciente : '',
        [Validators.required]
      ),
      id_unidade: new FormControl(
        this.atendData ? this.atendData.id_unidade : '',
        [Validators.required]
      ),
      dt_atendimento: new FormControl(
        this.atendData ? this.atendData.dt_atendimento : '',
        [Validators.required]
      ),
      status_atend: new FormControl(
        this.atendData ? this.atendData.status_atend : ''
      ),
      medico_responsavel: new FormControl(
        this.atendData ? this.atendData.medico_responsavel : ''
      ),
      hora_inicio: new FormControl(
        this.atendData ? this.atendData.hora_inicio : ''
      ),
      hora_fim: new FormControl(this.atendData ? this.atendData.hora_fim : ''),
      especialidade: new FormControl(
        this.atendData ? this.atendData.especialidade : ''
      ),
      tipo_atendimento: new FormControl(
        this.atendData ? this.atendData.tipo_atendimento : ''
      ),
      valor_atendimento: new FormControl(
        this.atendData ? this.atendData.valor_atendimento : ''
      ),
      forma_pagamento: new FormControl(
        this.atendData ? this.atendData.forma_pagamento : ''
      ),
      convenio: new FormControl(this.atendData ? this.atendData.convenio : ''),
      nr_carteirinha_convenio: new FormControl(
        this.atendData ? this.atendData.nr_carteirinha_convenio : ''
      ),
    });

    if (this.atendData) {
      this.atendForm.patchValue(this.atendData);
    }
  }

  newAtend() {
    if (this.atendForm.invalid) {
      console.log(this.atendForm.value);
      console.log('Formulário inválido.');
      this.snackBar.open('Não foi possível salvar as informações.', '', {
        duration: 4500,
      });
    } else {
      console.log(this.atendForm.value);

      lastValueFrom(this.atendService.createAtendimento(this.atendForm.value))
        .then((result) => {
          console.log(result);
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
      console.log('Formulário inválido.');
      this.snackBar.open('Não foi possível salvar as informações.', '', {
        duration: 4500,
      });
    } else {
      console.log(this.atendForm.value);

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