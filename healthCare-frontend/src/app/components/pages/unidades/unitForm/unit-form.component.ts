import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component';
import { Unidade } from 'src/app/interfaces/Unidade';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.scss'],
})
export class UnitFormComponent implements OnInit {
  unitData: Unidade | null = null;

  unitForm!: FormGroup;
  pageType?: string;
  unit?: Unidade;

  invalidCep: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private unitService: UnidadeService,
    private userService: UserService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private http: HttpClient,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.pageType = this.route.snapshot.paramMap.get('id') || 'Novo';

    this.buildForm();

    if (this.pageType !== 'Novo') {
      lastValueFrom(this.unitService.getById(+this.pageType)).then((result) => {
        if (!result) return;

        this.unitData = result;
        this.unitForm.patchValue(this.unitData);
      });
    }
  }

  buildForm() {
    this.unitForm = this.fb.group({
      id: '',
      dsNome: ['', Validators.required],
      cnpj: ['', Validators.required],
      nr_telefone: '',
      nr_cep: ['', Validators.required],
      email: ['', Validators.required],
      ieSituacao: ['', Validators.required],
      capacidade_atendimento: '',
      horario_funcionamento: '',
      tipo: ['', Validators.required],
      especialidades_oferecidas: '',
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

  newUnit() {
    if (this.unitForm.invalid) {
      for (const controlName in this.unitForm.controls) {
        if (this.unitForm.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      this.utilsService.showSimpleMessageWithDuration(
        'Não foi possível salvar as informações.',
        4500
      );
    } else {
      lastValueFrom(this.unitService.createUnit(this.unitForm.value))
        .then(() => {
          this.utilsService.showSimpleMessageWithDuration(
            'Unidade criada com sucesso.',
            4000
          );
          this.router.navigate(['/unidade']);
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

  editUnit() {
    if (this.unitForm.invalid) {
      for (const controlName in this.unitForm.controls) {
        if (this.unitForm.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      this.utilsService.showSimpleMessageWithDuration(
        'Não foi possível salvar as informações.',
        4500
      );
    } else {
      lastValueFrom(this.unitService.updateUnit(this.unitForm.value))
        .then(() => {
          this.utilsService.showSimpleMessageWithDuration(
            'Unidade salva com sucesso.',
            4000
          );
          this.router.navigate(['/unidade']);
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

  removeUnit() {
    const id = +this.route.snapshot.paramMap.get('id')!;

    lastValueFrom(this.unitService.removeUnit(id))
      .then(() => {
        this.utilsService.showSimpleMessageWithDuration(
          'Unidade removida com sucesso.',
          4500
        );
        this.router.navigate(['/unidade']);
      })
      .catch((error) => {
        console.log(error);
        this.utilsService.showSimpleMessageWithDuration(
          'Não foi possível excluir a unidade.',
          4500
        );
      });
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    lastValueFrom(dialogRef.afterClosed()).then((result) => {
      if (result === true) {
        this.removeUnit();
      }
    });
  }

  getAddress(cep: string) {
    if (cep.length === 9) {
      const url = `https://brasilapi.com.br/api/cep/v2/${cep}`;

      lastValueFrom(this.http.get(url))
        .then((result: any) => {
          if (result) {
            this.unitForm.get('estado')?.setValue(result.state);
            this.unitForm.get('cidade')?.setValue(result.city);
            this.unitForm.get('bairro')?.setValue(result.neighborhood);
            this.unitForm.get('endereco')?.setValue(result.street);
            this.invalidCep = false;
          } else {
            this.unitForm.get('estado')?.setValue('');
            this.unitForm.get('cidade')?.setValue('');
            this.unitForm.get('bairro')?.setValue('');
            this.unitForm.get('endereco')?.setValue('');
            this.invalidCep = true;
          }
        })
        .catch(() => {
          this.unitForm.get('estado')?.setValue('');
          this.unitForm.get('cidade')?.setValue('');
          this.unitForm.get('bairro')?.setValue('');
          this.unitForm.get('endereco')?.setValue('');
          this.invalidCep = true;
        });
    } else {
      this.unitForm.get('estado')?.setValue('');
      this.unitForm.get('cidade')?.setValue('');
      this.unitForm.get('bairro')?.setValue('');
      this.unitForm.get('endereco')?.setValue('');
      this.invalidCep = true;
    }
  }
}
