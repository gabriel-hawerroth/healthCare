import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';

import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userData?: User | null;

  userForm!: FormGroup;
  pageType?: string;
  user?: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.pageType = this.route.snapshot.paramMap.get('id') || 'Novo';

    this.buildForm();

    if (this.pageType !== 'Novo') {
      this.userService.getById(+this.pageType).then((result) => {
        this.userData = result;
        this.userForm.patchValue(this.userData);
        this.userForm.get('senha')?.setValue('');
      });
    }
  }

  buildForm() {
    this.userForm = this.fb.group({
      id: '',
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.pattern(this.utilsService.passwordValidator())],
      nome: ['', [Validators.required]],
      sobrenome: '',
      acesso: ['Consulta', [Validators.required]],
      situacao: 'A',
      canChangePassword: false,
    });
  }

  newUser() {
    if (this.userForm.invalid) {
      for (const controlName in this.userForm.controls) {
        if (this.userForm.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      return;
    } else {
      this.userService
        .newUser(this.userForm.value)
        .then(() => {
          this.utilsService.showSimpleMessageWithDuration(
            'Usuário criado com sucesso.',
            4000
          );
          this.router.navigate(['/usuario']);
        })
        .catch((error) => {
          console.log(error);
          this.utilsService.showSimpleMessageWithDuration(
            'Erro ao salvar as informações.',
            4500
          );
        });
    }
  }

  editUser() {
    if (this.userForm.invalid) {
      for (const controlName in this.userForm.controls) {
        if (this.userForm.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      return;
    } else {
      this.userService
        .editUser(this.userForm.value)
        .then(() => {
          this.utilsService.showSimpleMessageWithDuration(
            'Usuário salvo com sucesso.',
            4000
          );
          this.router.navigate(['/usuario']);
        })
        .catch((error) => {
          console.log(error);
          this.utilsService.showSimpleMessageWithDuration(
            'Erro ao salvar as informações.',
            4500
          );
        });
    }
  }

  removeUser() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.userService
      .removeUser(id)
      .then(() => {
        this.utilsService.showSimpleMessageWithDuration(
          'Usuário removido com sucesso.',
          4500
        );
        this.router.navigate(['/usuario']);
      })
      .catch((error) => {
        console.log(error);
        this.utilsService.showSimpleMessageWithDuration(
          'Não foi possível excluir o usuário.',
          4500
        );
      });
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    lastValueFrom(dialogRef.afterClosed()).then((result) => {
      if (result === true) {
        this.removeUser();
      }
    });
  }
}
