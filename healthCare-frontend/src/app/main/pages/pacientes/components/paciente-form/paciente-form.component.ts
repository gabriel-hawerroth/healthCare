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
import { PatientService } from '../../../../../services/paciente/patient.service';
import { UserService } from '../../../../../services/user/user.service';
import { ConfirmationDialogComponent } from '../../../../../utils/confirmation-dialog/confirmation-dialog.component';
import { UtilsService } from '../../../../../utils/utils.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMaskDirective } from 'ngx-mask';

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
    private userService: UserService,
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
      this.utilsService.showSimpleMessage(
        'Não foi possível salvar as informações.',
        4500
      );
      return;
    }

    this.patientService
      .createPatient(this.patientForm.value)
      .then(() => {
        this.utilsService.showSimpleMessage(
          'Paciente criado com sucesso.',
          4000
        );
        this.router.navigate(['/paciente']);
      })
      .catch(() => {
        this.utilsService.showSimpleMessage(
          'Não foi possível salvar as informações.',
          500
        );
      });
  }

  editPatient() {
    if (this.patientForm.invalid) {
      for (const controlName in this.patientForm.controls) {
        if (this.patientForm.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      this.utilsService.showSimpleMessage(
        'Não foi possível salvar as informações.',
        4500
      );
      return;
    }

    this.patientService
      .updatePatient(this.patientForm.value)
      .then(() => {
        this.utilsService.showSimpleMessage(
          'Paciente salvo com sucesso.',
          4000
        );
        this.router.navigate(['/paciente']);
      })
      .catch(() => {
        this.utilsService.showSimpleMessage(
          'Não foi possível salvar as informações.',
          4500
        );
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
    console.log('entrou no get address');
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
