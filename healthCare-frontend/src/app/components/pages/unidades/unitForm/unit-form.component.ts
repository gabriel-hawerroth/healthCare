import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component';

import { Unidade } from 'src/app/interfaces/Unidade';
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
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.pageType = this.route.snapshot.paramMap.get('id') || 'Novo';

    this.unitForm = this.fb.group({
      id: '',
      ds_nome: ['', Validators.required],
      cnpj: ['', Validators.required],
      nr_telefone: '',
      nr_cep: ['', Validators.required],
      email: ['', Validators.required],
      ie_situacao: ['', Validators.required],
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
    });

    if (this.unitData) {
      this.unitForm.patchValue(this.unitData);
    }
  }

  newUnit() {
    if (this.unitForm.invalid) {
      for (const controlName in this.unitForm.controls) {
        if (this.unitForm.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      this.snackBar.open('Não foi possível salvar as informações.', '', {
        duration: 4500,
      });
    } else {
      lastValueFrom(this.unitService.createUnit(this.unitForm.value))
        .then((result) => {
          this.snackBar.open('Unidade criada com sucesso.', '', {
            duration: 4000,
          });
          this.router.navigate(['/unidade']);
        })
        .catch((error) => {
          console.log(error);
          this.snackBar.open('Não foi possível salvar as informações.', '', {
            duration: 4500,
          });
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
      this.snackBar.open('Não foi possível salvar as informações.', '', {
        duration: 4500,
      });
    } else {
      lastValueFrom(this.unitService.updateUnit(this.unitForm.value))
        .then((result) => {
          this.snackBar.open('Unidade salva com sucesso.', '', {
            duration: 4000,
          });
          this.router.navigate(['/unidade']);
        })
        .catch((error) => {
          console.log(error);
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
        console.log(error);
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
