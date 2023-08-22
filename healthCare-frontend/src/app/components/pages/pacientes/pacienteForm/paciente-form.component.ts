import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import * as moment from 'moment-timezone';
import { HttpClient } from '@angular/common/http';

import { Patient } from 'src/app/models/Patient';
import { PatientService } from 'src/app/services/paciente/patient.service';
import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-paciente-form',
  templateUrl: 'paciente-form.component.html',
  styleUrls: ['paciente-form.component.scss'],
})
export class PacienteFormComponent implements OnInit {
  @Input() patientData: Patient | null = null;

  patientForm!: FormGroup;
  pageType?: string;
  patient?: Patient;

  endereco?: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    this.pageType = this.route.snapshot.paramMap.get('id') || 'Novo';

    this.patientForm = this.fb.group({
      id: '',
      dsNome: ['', Validators.required],
      nr_cpf: ['', Validators.required],
      dt_nascimento: [null, Validators.required],
      nr_celular: '',
      status: '',
      ieSituacao: ['', Validators.required],
      nome_mae: '',
      nome_pai: '',
      genero: '',
      estado_civil: '',
      nacionalidade: '',
      etnia: '',
      religiao: '',
      peso_kg: '',
      altura_cm: '',
      email: '',
      alergias: '',
      dependencia: '',
      permite_atend_online: '',
      obs_diagnostico: '',
      dt_inicio_atend: '',
      dt_fim_atend: '',
      estoque_empenhado: '',
      guarda_compartilhada: '',
      genero_pref: '',
      idade_min: '',
      idade_max: '',
      obs_preferencias: '',
      nr_cep: ['', Validators.required],
      estado: '',
      cidade: '',
      bairro: '',
      endereco: '',
      nr_endereco: '',
      complemento: '',
      como_chegar: '',
    });

    if (this.patientData) {
      this.patientForm.patchValue(this.patientData);
      if (this.patientForm.get('dt_nascimento')?.value) {
        this.patientForm
          .get('dt_nascimento')
          ?.setValue(moment(this.patientForm.value.dt_nascimento).toDate());
      }

      if (this.patientForm.get('dt_inicio_atend')?.value) {
        this.patientForm
          .get('dt_inicio_atend')
          ?.setValue(moment(this.patientForm.value.dt_inicio_atend).toDate());
      }

      if (this.patientForm.get('dt_fim_atend')?.value) {
        this.patientForm
          .get('dt_fim_atend')
          ?.setValue(moment(this.patientForm.value.dt_fim_atend).toDate());
      }
    }
  }

  newPatient() {
    if (this.patientForm.invalid) {
      for (const controlName in this.patientForm.controls) {
        if (this.patientForm.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      this.snackBar.open('Não foi possível salvar as informações.', '', {
        duration: 4500,
      });
    } else {
      console.log(this.patientForm.value);

      lastValueFrom(this.patientService.createPatient(this.patientForm.value))
        .then((result) => {
          this.snackBar.open('Paciente criado com sucesso.', '', {
            duration: 4000,
          });
          this.router.navigate(['/paciente']);
        })
        .catch((error) => {
          this.snackBar.open('Não foi possível salvar as informações.', '', {
            duration: 4500,
          });
        });
    }
  }

  editPatient() {
    if (this.patientForm.invalid) {
      for (const controlName in this.patientForm.controls) {
        if (this.patientForm.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      this.snackBar.open('Não foi possível salvar as informações.', '', {
        duration: 4500,
      });
    } else {
      console.log(this.patientForm.value);

      lastValueFrom(this.patientService.updatePatient(this.patientForm.value))
        .then((result) => {
          this.snackBar.open('Paciente salvo com sucesso.', '', {
            duration: 4000,
          });
          this.router.navigate(['/paciente']);
        })
        .catch((error) => {
          this.snackBar.open('Não foi possível salvar as informações.', '', {
            duration: 4500,
          });
        });
    }
  }

  removePatient() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    lastValueFrom(this.patientService.removePatient(id))
      .then((result) => {
        this.snackBar.open('Paciente removido com sucesso.', '', {
          duration: 4500,
        });
        this.router.navigate(['/paciente']);
      })
      .catch((error) => {
        this.snackBar.open('Não foi possível excluir o paciente.', '', {
          duration: 4500,
        });
      });
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    lastValueFrom(dialogRef.afterClosed()).then((result) => {
      if (result === true) {
        this.removePatient();
      }
    });
  }

  async getAddress(event: Event) {
    const cep: string = this.patientForm.value.nr_cep;
    if (cep.length === 8) {
      const url = `https://brasilapi.com.br/api/cep/v2/${cep}`;
      await lastValueFrom(this.http.get(url))
        .then((result) => {
          this.endereco = result;
          if (!result) {
            this.patientForm.get('estado')?.setValue('');
            this.patientForm.get('cidade')?.setValue('');
            this.patientForm.get('bairro')?.setValue('');
            this.patientForm.get('endereco')?.setValue('');
            this.endereco = null;
            return;
          }
        })
        .catch(() => {});

      this.patientForm.get('estado')?.setValue(this.endereco.state);
      this.patientForm.get('cidade')?.setValue(this.endereco.city);
      this.patientForm.get('bairro')?.setValue(this.endereco.neighborhood);
      this.patientForm.get('endereco')?.setValue(this.endereco.street);
      return;
    } else {
      this.patientForm.get(['estado'])?.setValue('');
      this.patientForm.get('cidade')?.setValue('');
      this.patientForm.get('bairro')?.setValue('');
      this.patientForm.get('endereco')?.setValue('');
      this.endereco = null;
    }
  }
}
