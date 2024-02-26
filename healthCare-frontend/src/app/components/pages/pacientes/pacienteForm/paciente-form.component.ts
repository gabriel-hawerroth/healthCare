import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment-timezone';

import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component';
import { Patient } from 'src/app/interfaces/Patient';
import { PatientService } from 'src/app/services/paciente/patient.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-paciente-form',
  templateUrl: 'paciente-form.component.html',
  styleUrls: ['paciente-form.component.scss'],
})
export class PacienteFormComponent implements OnInit {
  patientData: Patient | null = null;

  patientForm!: FormGroup;
  pageType!: string;
  patient?: Patient;
  showLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private userService: UserService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private http: HttpClient,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.showLoading = true;
    this.pageType = this.route.snapshot.paramMap.get('id') || 'Novo';

    this.buildForm();

    if (this.pageType !== 'Novo') {
      lastValueFrom(this.patientService.getById(+this.pageType)).then(
        (result) => {
          if (!result) return;

          this.patientData = result;
          this.patientForm.patchValue(this.patientData);

          if (this.patientForm.get('dt_nascimento')?.value) {
            this.patientForm
              .get('dt_nascimento')
              ?.setValue(moment(this.patientForm.value.dt_nascimento).toDate());
          }

          if (this.patientForm.get('dt_inicio_atend')?.value) {
            this.patientForm
              .get('dt_inicio_atend')
              ?.setValue(
                moment(this.patientForm.value.dt_inicio_atend).toDate()
              );
          }

          if (this.patientForm.get('dt_fim_atend')?.value) {
            this.patientForm
              .get('dt_fim_atend')
              ?.setValue(moment(this.patientForm.value.dt_fim_atend).toDate());
          }
        }
      );
    }

    this.showLoading = false;
  }

  buildForm() {
    this.patientForm = this.fb.group({
      id: null,
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
      permite_atend_online: false,
      obs_diagnostico: '',
      dt_inicio_atend: '',
      dt_fim_atend: '',
      estoque_empenhado: false,
      guarda_compartilhada: false,
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
      userId: this.userService.getLoggedUserId,
    });
  }

  newPatient() {
    if (this.patientForm.invalid) {
      for (const controlName in this.patientForm.controls) {
        if (this.patientForm.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      this.utilsService.showSimpleMessageWithDuration(
        'Não foi possível salvar as informações.',
        4500
      );
    } else {
      lastValueFrom(this.patientService.createPatient(this.patientForm.value))
        .then((result) => {
          this.utilsService.showSimpleMessageWithDuration(
            'Paciente criado com sucesso.',
            4000
          );
          this.router.navigate(['/paciente']);
        })
        .catch((error) => {
          console.log(error);
          this.utilsService.showSimpleMessageWithDuration(
            'Não foi possível salvar as informações.',
            500
          );
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
      this.utilsService.showSimpleMessageWithDuration(
        'Não foi possível salvar as informações.',
        4500
      );
    } else {
      lastValueFrom(this.patientService.updatePatient(this.patientForm.value))
        .then((result) => {
          this.utilsService.showSimpleMessageWithDuration(
            'Paciente salvo com sucesso.',
            4000
          );
          this.router.navigate(['/paciente']);
        })
        .catch((error) => {
          console.log(error);
          this.utilsService.showSimpleMessageWithDuration(
            'Não foi possível salvar as informações.',
            4500
          );
        });
    }
  }

  removePatient() {
    const id = +this.route.snapshot.paramMap.get('id')!;

    lastValueFrom(this.patientService.removePatient(id))
      .then(() => {
        this.utilsService.showSimpleMessageWithDuration(
          'Paciente removido com sucesso.',
          4500
        );
        this.router.navigate(['/paciente']);
      })
      .catch((error) => {
        console.log(error);
        this.utilsService.showSimpleMessageWithDuration(
          'Não foi possível excluir o paciente.',
          4500
        );
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

  async getAddress(cep: string) {
    if (cep.length === 9) {
      const url = `https://brasilapi.com.br/api/cep/v2/${cep}`;
      await lastValueFrom(this.http.get(url))
        .then((result: any) => {
          if (result) {
            this.patientForm.get('estado')?.setValue(result.state);
            this.patientForm.get('cidade')?.setValue(result.city);
            this.patientForm.get('bairro')?.setValue(result.neighborhood);
            this.patientForm.get('endereco')?.setValue(result.street);
          } else {
            this.patientForm.get('estado')?.setValue('');
            this.patientForm.get('cidade')?.setValue('');
            this.patientForm.get('bairro')?.setValue('');
            this.patientForm.get('endereco')?.setValue('');
          }
        })
        .catch(() => {
          this.patientForm.get('estado')?.setValue('');
          this.patientForm.get('cidade')?.setValue('');
          this.patientForm.get('bairro')?.setValue('');
          this.patientForm.get('endereco')?.setValue('');
        });
    } else {
      this.patientForm.get('estado')?.setValue('');
      this.patientForm.get('cidade')?.setValue('');
      this.patientForm.get('bairro')?.setValue('');
      this.patientForm.get('endereco')?.setValue('');
    }
  }
}
