import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component';

import { Unidade } from 'src/app/Unidade';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.scss'],
})
export class UnitFormComponent implements OnInit {
  @Input() unitData: Unidade | null = null;

  unitForm!: FormGroup;
  pageType?: string;
  unit?: Unidade;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private unitService: UnidadeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.pageType = this.route.snapshot.paramMap.get('id') || 'Novo';

    this.unitForm = new FormGroup({
      id: new FormControl(this.unitData ? this.unitData.id : ''),
      ds_nome: new FormControl(this.unitData ? this.unitData.ds_nome : '', [
        Validators.required,
      ]),
      cnpj: new FormControl(this.unitData ? this.unitData.cnpj : '', [
        Validators.required,
      ]),
      nr_telefone: new FormControl(
        this.unitData ? this.unitData.nr_telefone : ''
      ),
      nr_cep: new FormControl(this.unitData ? this.unitData.nr_cep : '', [
        Validators.required,
      ]),
      email: new FormControl(this.unitData ? this.unitData.email : '', [
        Validators.required,
      ]),
      ie_situacao: new FormControl(
        this.unitData ? this.unitData.ieSituacao : 'A',
        [Validators.required]
      ),
      capacidade_atendimento: new FormControl(
        this.unitData ? this.unitData.capacidade_atendimento : ''
      ),
      horario_funcionamento: new FormControl(
        this.unitData ? this.unitData.horario_funcionamento : ''
      ),
      tipo: new FormControl(this.unitData ? this.unitData.tipo : '', [
        Validators.required,
      ]),
      especialidades_oferecidas: new FormControl(
        this.unitData ? this.unitData.especialidades_oferecidas : ''
      ),
      estado: new FormControl(this.unitData ? this.unitData.estado : ''),
      cidade: new FormControl(this.unitData ? this.unitData.cidade : ''),
      bairro: new FormControl(this.unitData ? this.unitData.bairro : ''),
      endereco: new FormControl(this.unitData ? this.unitData.endereco : ''),
      nr_endereco: new FormControl(
        this.unitData ? this.unitData.nr_endereco : ''
      ),
      complemento: new FormControl(
        this.unitData ? this.unitData.complemento : ''
      ),
      como_chegar: new FormControl(
        this.unitData ? this.unitData.como_chegar : ''
      ),
    });

    if (this.unitData) {
      this.unitForm.patchValue(this.unitData);
    }
  }

  newUnit() {
    if (this.unitForm.invalid) {
      console.log('Formulário inválido.');
      console.log(this.unitForm.value);
      this.snackBar.open('Não foi possível salvar as informações.', '', {
        duration: 4500,
      });
    } else {
      console.log(this.unitForm.value);

      lastValueFrom(this.unitService.createUnit(this.unitForm.value))
        .then((result) => {
          this.snackBar.open('Unidade criada com sucesso.', '', {
            duration: 4000,
          });
          this.router.navigate(['/unidade']);
        })
        .catch((error) => {
          this.snackBar.open('Não foi possível salvar as informações.', '', {
            duration: 4500,
          });
        });
    }
  }

  editUnit() {
    if (this.unitForm.invalid) {
      console.log('Formulário inválido.');
      console.log(this.unitForm.value);
      this.snackBar.open('Não foi possível salvar as informações.', '', {
        duration: 4500,
      });
    } else {
      console.log(this.unitForm.value);

      lastValueFrom(this.unitService.updateUnit(this.unitForm.value))
        .then((result) => {
          this.snackBar.open('Unidade salva com sucesso.', '', {
            duration: 4000,
          });
          this.router.navigate(['/unidade']);
        })
        .catch((error) => {
          this.snackBar.open('Não foi possível salvar as informações.', '', {
            duration: 4500,
          });
        });
    }
  }

  removeUnit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    lastValueFrom(this.unitService.removeUnit(id))
      .then((result) => {
        this.snackBar.open('Unidade removida com sucesso.', '', {
          duration: 4500,
        });
        this.router.navigate(['/unidade']);
      })
      .catch((error) => {
        this.snackBar.open('Não foi possível excluir a unidade.', '', {
          duration: 4500,
        });
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
}
