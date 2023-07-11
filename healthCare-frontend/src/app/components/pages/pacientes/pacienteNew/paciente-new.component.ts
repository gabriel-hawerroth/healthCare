import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Patient } from 'src/app/Patient';
import { PatientService } from 'src/app/services/paciente/patient.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-paciente-new',
  templateUrl: './paciente-new.component.html',
  styleUrls: ['./paciente-new.component.scss'],
})
export class PacienteNewComponent {
  @Input() patientData: Patient | null = null;

  patientForm!: FormGroup;

  constructor(
    private route: Router,
    private patientService: PatientService,
    private snackBar: MatSnackBar
  ) {}

  savePatient(): void {
    if (this.patientForm.invalid) {
      this.snackBar.open('Há campos obrigatórios não preenchidos', '', {
        duration: 3000,
      });
      return;
    }

    const dataNascimento = this.patientForm.value.dt_nascimento;
    const dataNascimentoISO = new Date(dataNascimento).toISOString();
    // const dataNascimentoISO = moment(dataNascimento)
    //   .tz('America/Sao_Paulo')
    //   .format();
    this.patientForm.patchValue({ dt_nascimento: dataNascimentoISO });

    console.log(this.patientForm.value);

    this.patientService.createPatient(this.patientForm.value).subscribe(
      (result) =>
        this.snackBar.open('Paciente cadastro com sucesso', '', {
          duration: 3000,
        }),
      (error) => {
        this.snackBar.open('Erro ao salvar o paciente', '', {
          duration: 5000,
        });
      }
    );

    this.route.navigate(['/pacientes']);
  }
}
