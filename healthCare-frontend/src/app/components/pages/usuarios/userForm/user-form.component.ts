import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  @Input() userData?: User | null;

  userForm!: FormGroup;
  pageType?: string;
  user?: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.pageType = this.route.snapshot.paramMap.get('id') || 'Novo';

    this.userForm = this.fb.group({
      id: '',
      usuario: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.pattern(this.utilsService.passwordValidator())],
      nome: ['', [Validators.required]],
      sobrenome: '',
      acesso: ['Consulta', [Validators.required]],
      situacao: 'A',
    });

    if (this.userData) {
      this.userForm.patchValue(this.userData);
      this.userForm.get('senha')?.setValue('');
    }
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
      lastValueFrom(this.userService.createUser(this.userForm.value))
        .then((result) => {
          this.snackBar.open('Usuário criado com sucesso.', '', {
            duration: 4000,
          });
          this.router.navigate(['/usuario']);
        })
        .catch((error) => {
          console.log(error);
          this.snackBar.open('Erro ao salvar as informações.', '', {
            duration: 4500,
          });
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
      lastValueFrom(this.userService.editUser(this.userForm.value))
        .then((result) => {
          this.snackBar.open('Usuário salvo com sucesso.', '', {
            duration: 4000,
          });
          this.router.navigate(['/usuario']);
        })
        .catch((error) => {
          console.log(error);
          this.snackBar.open('Erro ao salvar as informações.', '', {
            duration: 4500,
          });
        });
    }
  }

  removeUser() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    lastValueFrom(this.userService.removeUser(id))
      .then((result) => {
        this.snackBar.open('Usuário removido com sucesso.', '', {
          duration: 4500,
        });
        this.router.navigate(['/usuario']);
      })
      .catch((error) => {
        console.log(error);
        this.snackBar.open('Não foi possível excluir o usuário.', '', {
          duration: 4500,
        });
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
