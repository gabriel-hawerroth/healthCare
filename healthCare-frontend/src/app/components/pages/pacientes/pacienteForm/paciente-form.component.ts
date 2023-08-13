import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.pageType = this.route.snapshot.paramMap.get('id') || 'Novo';

    this.patientForm = new FormGroup({
      id: new FormControl(this.patientData ? this.patientData.id : ''),
      dsNome: new FormControl(this.patientData ? this.patientData.dsNome : '', [
        Validators.required,
      ]),
      nr_cpf: new FormControl(this.patientData ? this.patientData.nr_cpf : '', [
        Validators.required,
      ]),
      dt_nascimento: new FormControl(
        this.patientData ? this.patientData.dt_nascimento : '',
        [Validators.required]
      ),
      nr_celular: new FormControl(
        this.patientData ? this.patientData.nr_celular : ''
      ),
      status: new FormControl(this.patientData ? this.patientData.status : ''),
      ieSituacao: new FormControl(
        this.patientData ? this.patientData.ieSituacao : 'A',
        [Validators.required]
      ),
      nome_mae: new FormControl(
        this.patientData ? this.patientData.nome_mae : ''
      ),
      nome_pai: new FormControl(
        this.patientData ? this.patientData.nome_pai : ''
      ),
      genero: new FormControl(this.patientData ? this.patientData.genero : ''),
      estado_civil: new FormControl(
        this.patientData ? this.patientData.estado_civil : ''
      ),
      nacionalidade: new FormControl(
        this.patientData ? this.patientData.nacionalidade : ''
      ),
      etnia: new FormControl(this.patientData ? this.patientData.etnia : ''),
      religiao: new FormControl(
        this.patientData ? this.patientData.religiao : ''
      ),
      peso_kg: new FormControl(
        this.patientData ? this.patientData.peso_kg : ''
      ),
      altura_cm: new FormControl(
        this.patientData ? this.patientData.altura_cm : ''
      ),
      email: new FormControl(this.patientData ? this.patientData.email : ''),
      alergias: new FormControl(
        this.patientData ? this.patientData.alergias : ''
      ),
      dependencia: new FormControl(
        this.patientData ? this.patientData.dependencia : ''
      ),
      permite_atend_online: new FormControl(
        this.patientData ? this.patientData.permite_atend_online : ''
      ),
      obs_diagnostico: new FormControl(
        this.patientData ? this.patientData.obs_diagnostico : ''
      ),
      dt_inicio_atend: new FormControl(
        this.patientData ? this.patientData.dt_inicio_atend : ''
      ),
      dt_fim_atend: new FormControl(
        this.patientData ? this.patientData.dt_fim_atend : ''
      ),
      estoque_empenhado: new FormControl(
        this.patientData ? this.patientData.estoque_empenhado : ''
      ),
      guarda_compartilhada: new FormControl(
        this.patientData ? this.patientData.guarda_compartilhada : ''
      ),
      genero_pref: new FormControl(
        this.patientData ? this.patientData.genero_pref : ''
      ),
      idade_min: new FormControl(
        this.patientData ? this.patientData.idade_min : ''
      ),
      idade_max: new FormControl(
        this.patientData ? this.patientData.idade_max : ''
      ),
      obs_preferencias: new FormControl(
        this.patientData ? this.patientData.obs_preferencias : ''
      ),
      nr_cep: new FormControl(this.patientData ? this.patientData.nr_cep : '', [
        Validators.required,
      ]),
      estado: new FormControl(this.patientData ? this.patientData.estado : ''),
      cidade: new FormControl(this.patientData ? this.patientData.cidade : ''),
      bairro: new FormControl(this.patientData ? this.patientData.bairro : ''),
      endereco: new FormControl(
        this.patientData ? this.patientData.endereco : ''
      ),
      nr_endereco: new FormControl(
        this.patientData ? this.patientData.nr_endereco : ''
      ),
      complemento: new FormControl(
        this.patientData ? this.patientData.complemento : ''
      ),
      como_chegar: new FormControl(
        this.patientData ? this.patientData.como_chegar : ''
      ),
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
