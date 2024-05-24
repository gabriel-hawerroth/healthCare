import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { lastValueFrom } from 'rxjs';
import { Unidade } from '../../../../../interfaces/unidade';
import { LoginService } from '../../../../../services/login.service';
import { UnidadeService } from '../../../../../services/unidade.service';
import { ConfirmationDialogComponent } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { UtilsService } from '../../../../../utils/utils.service';

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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      autoFocus: false,
    });

    lastValueFrom(dialogRef.afterClosed()).then((result) => {
      if (result === true) {
        this.removeUnit();
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
        if (!result) {
          this.utilsService.showSimpleMessage('Endereço não encontrado');
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
        this.utilsService.showSimpleMessage('Endereço não encontrado');
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
