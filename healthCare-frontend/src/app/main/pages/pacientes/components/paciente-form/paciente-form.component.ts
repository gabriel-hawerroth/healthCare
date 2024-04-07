import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Patient } from '../../../../../interfaces/patient';
import { PatientService } from '../../../../../services/patient.service';
import { ConfirmationDialogComponent } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { UtilsService } from '../../../../../utils/utils.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMaskDirective } from 'ngx-mask';
import { LoginService } from '../../../../../services/login.service';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatCheckboxModule,
    NgxMaskDirective,
  ],
  templateUrl: 'paciente-form.component.html',
  styleUrls: ['paciente-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PacienteFormComponent implements OnInit {
  patientId: number | null = +this.route.snapshot.paramMap.get('id')! || null;
  patientData: Patient | null = null;

  patientForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private loginService: LoginService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.buildForm();

    if (this.patientId) {
      this.patientService.getById(this.patientId).then((result) => {
        if (!result) return;

        this.patientData = result;
        this.patientForm.patchValue(this.patientData);

        if (this.patientData.dt_nascimento) {
          this.patientForm
            .get('dt_nascimento')!
            .setValue(new Date(this.patientForm.value.dt_nascimento));
        }

        if (this.patientData.dt_inicio_atend) {
          this.patientForm
            .get('dt_inicio_atend')!
            .setValue(new Date(this.patientForm.value.dt_inicio_atend));
        }

        if (this.patientData.dt_fim_atend) {
          this.patientForm
            .get('dt_fim_atend')!
            .setValue(new Date(this.patientForm.value.dt_fim_atend));
        }
      });
    }
  }

  buildForm() {
    this.patientForm = this.fb.group({
      id: null,
      ds_nome: ['', Validators.required],
      nr_cpf: ['', Validators.required],
      dt_nascimento: [null, Validators.required],
      nr_celular: null,
      status: null,
      ie_situacao: ['A', Validators.required],
      nome_mae: null,
      nome_pai: null,
      genero: null,
      estado_civil: null,
      nacionalidade: null,
      etnia: null,
      religiao: null,
      peso_kg: null,
      altura_cm: null,
      email: null,
      alergias: null,
      dependencia: null,
      permite_atend_online: false,
      obs_diagnostico: null,
      dt_inicio_atend: null,
      dt_fim_atend: null,
      estoque_empenhado: false,
      guarda_compartilhada: false,
      genero_pref: null,
      idade_min: null,
      idade_max: null,
      obs_preferencias: null,
      nr_cep: ['', Validators.required],
      estado: null,
      cidade: null,
      bairro: null,
      endereco: null,
      nr_endereco: null,
      complemento: null,
      como_chegar: null,
      user_id: this.loginService.getLoggedUserId,
      dt_criacao: null,
    });

    this.patientForm.markAllAsTouched();
  }

  savePatient() {
    if (this.patientForm.invalid) {
      for (const controlName in this.patientForm.controls) {
        if (this.patientForm.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      this.utilsService.showSimpleMessage('Formulário inválido');
      return;
    }

    this.patientService
      .savePatient(this.patientForm.getRawValue())
      .then(() => {
        this.utilsService.showSimpleMessage('Paciente salvo com sucesso');
        this.router.navigate(['/paciente']);
      })
      .catch(() => {
        this.utilsService.showSimpleMessage('Erro ao tentar salvar o paciente');
      });
  }

  removePatient() {
    const id = +this.route.snapshot.paramMap.get('id')!;

    this.patientService
      .removePatient(id)
      .then(() => {
        this.utilsService.showSimpleMessage(
          'Paciente removido com sucesso.',
          4500
        );
        this.router.navigate(['/paciente']);
      })
      .catch(() => {
        this.utilsService.showSimpleMessage(
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

  getAddress(cep: string) {
    if (cep.length < 9) {
      this.clearAddress();
      return;
    }

    this.utilsService
      .findAddress(cep)
      .then((result: any) => {
        if (result) {
          this.utilsService.showSimpleMessage('Endereço não encontrado');
          return;
        }

        this.patientForm.get('estado')!.setValue(result.state);
        this.patientForm.get('cidade')!.setValue(result.city);
        this.patientForm.get('bairro')!.setValue(result.neighborhood);
        this.patientForm.get('endereco')!.setValue(result.street);
      })
      .catch(() => {
        this.utilsService.showSimpleMessage('Endereço não encontrado');
        this.clearAddress();
      });
  }

  clearAddress() {
    this.patientForm.get('estado')!.setValue('');
    this.patientForm.get('cidade')!.setValue('');
    this.patientForm.get('bairro')!.setValue('');
    this.patientForm.get('endereco')!.setValue('');
  }
}
