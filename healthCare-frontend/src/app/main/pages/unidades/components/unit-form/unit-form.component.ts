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
import { CommonModule, DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { Unidade } from '../../../../../interfaces/unidade';
import { UnidadeService } from '../../../../../services/unidade/unidade.service';
import { ConfirmationDialogComponent } from '../../../../../utils/confirmation-dialog/confirmation-dialog.component';
import { UtilsService } from '../../../../../utils/utils.service';
import { NgxMaskDirective } from 'ngx-mask';
import { LoginService } from '../../../../../services/user/login.service';

@Component({
  selector: 'app-unit-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatExpansionModule,
    DatePipe,
    NgxMaskDirective,
  ],
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitFormComponent implements OnInit {
  unitId: number | null = +this.route.snapshot.paramMap.get('id')! || null;
  unitData: Unidade | null = null;

  unitForm!: FormGroup;

  invalidCep: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private unitService: UnidadeService,
    private loginService: LoginService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.buildForm();

    if (this.unitId) {
      this.unitService.getById(this.unitId).then((result) => {
        this.unitData = result;
        this.unitForm.patchValue(this.unitData);
      });
    }
  }

  buildForm() {
    this.unitForm = this.fb.group({
      id: null,
      ds_nome: ['', Validators.required],
      cnpj: ['', Validators.required],
      nr_telefone: null,
      email: ['', Validators.required],
      ie_situacao: ['A', Validators.required],
      capacidade_atendimento: null,
      horario_funcionamento: null,
      tipo: ['', Validators.required],
      especialidades_oferecidas: null,
      nr_cep: [null, Validators.required],
      estado: null,
      cidade: null,
      bairro: null,
      endereco: null,
      nr_endereco: null,
      complemento: null,
      como_chegar: null,
      dt_criacao: null,
      user_id: this.loginService.getLoggedUserId,
    });

    this.unitForm.markAllAsTouched();
  }

  saveUnit() {
    if (this.unitForm.invalid) {
      for (const controlName in this.unitForm.controls) {
        if (this.unitForm.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      this.utilsService.showSimpleMessage('Formulário inválido');
      return;
    }

    this.unitService
      .saveUnit(this.unitForm.getRawValue())
      .then(() => {
        this.utilsService.showSimpleMessage('Unidade salva com sucesso');
        this.router.navigate(['unidade']);
      })
      .catch(() => {
        this.utilsService.showSimpleMessage('Erro ao tentar salvar a unidade');
      });
  }

  removeUnit() {
    this.unitService
      .removeUnit(this.unitId!)
      .then(() => {
        this.utilsService.showSimpleMessage(
          'Unidade removida com sucesso.',
          4500
        );
        this.router.navigate(['/unidade']);
      })
      .catch(() => {
        this.utilsService.showSimpleMessage(
          'Não foi possível excluir a unidade.',
          4500
        );
      });
  }

  openConfirmationDialog(): void {
    lastValueFrom(
      this.dialog.open(ConfirmationDialogComponent).afterClosed()
    ).then((result) => {
      if (result === true) {
        this.removeUnit();
      }
    });
  }

  getAddress(cep: string) {
    if (cep.length === 9) {
      this.clearAddress();
      return;
    }

    this.utilsService
      .findAddress(cep)
      .then((result: any) => {
        if (!result) {
          this.clearAddress();
          return;
        }

        this.unitForm.get('estado')?.setValue(result.state);
        this.unitForm.get('cidade')?.setValue(result.city);
        this.unitForm.get('bairro')?.setValue(result.neighborhood);
        this.unitForm.get('endereco')?.setValue(result.street);
        this.invalidCep = false;
      })
      .catch(() => {
        this.clearAddress();
      });
  }

  clearAddress() {
    this.unitForm.get('estado')?.setValue('');
    this.unitForm.get('cidade')?.setValue('');
    this.unitForm.get('bairro')?.setValue('');
    this.unitForm.get('endereco')?.setValue('');
    this.invalidCep = true;
  }
}
