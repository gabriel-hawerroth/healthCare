import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component';

import { Patient } from 'src/app/Patient';
import { PatientService } from 'src/app/services/paciente/patient.service';
import { lastValueFrom } from 'rxjs';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.pageType = this.route.snapshot.paramMap.get('id') || 'Novo';

    this.patientForm = this.fb.group({
      id: '',
      dsNome: ['', Validators.required],
      nr_cpf: ['', Validators.required],
      dt_nascimento: ['', Validators.required],
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
    }
  }

  newPatient() {
    if (this.patientForm.invalid) {
      console.log(this.patientForm);
      console.log('Formulário inválido.');
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
      console.log('Formulário inválido.');
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
}
