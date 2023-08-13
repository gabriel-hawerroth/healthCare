import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component';

import { User } from 'src/app/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() userData: User | null = null;

  userForm!: FormGroup;
  pageType?: string;
  user?: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.pageType = this.route.snapshot.paramMap.get('id') || 'Novo';

    this.userForm = new FormGroup({
      id: new FormControl(this.userData ? this.userData.id : ''),
      usuario: new FormControl(this.userData ? this.userData.usuario : '', [
        Validators.required,
        Validators.email,
      ]),
      senha: new FormControl('', [
        Validators.pattern(this.passwordValidator()),
      ]),
      nome: new FormControl(this.userData ? this.userData.nome : '', [
        Validators.required,
      ]),
      sobrenome: new FormControl(this.userData ? this.userData.sobrenome : ''),
      acesso: new FormControl(
        this.userData ? this.userData.acesso : 'consulta',
        [Validators.required]
      ),
      permissao: new FormControl(
        this.userData ? this.userData.permissao : false
      ),
      primeiro_acesso: new FormControl(
        this.userData ? this.userData.primeiro_acesso : true
      ),
      situacao: new FormControl(this.userData ? this.userData.situacao : 'A'),
    });

    // if (this.userData) {
    //   this.userForm.patchValue(this.userData);
    // }
  }

  newUser() {
    if (this.userForm.invalid) {
      console.log('Formulário inválido.');
      console.log(this.userForm.value);
      this.snackBar.open('Não foi possível salvar as informações.', '', {
        duration: 4500,
      });
    } else {
      console.log(this.userForm.value);
      this.userService.createUser(this.userForm.value).subscribe({
        next: (result) => {
          this.snackBar.open('Usuário criado com sucesso.', '', {
            duration: 4000,
          }),
            this.router.navigate(['/usuario']);
        },
        error: (error) => {
          this.snackBar.open('Não foi possível salvar as informações.', '', {
            duration: 4500,
          });
        },
      });
    }
  }

  editUser() {
    if (this.userForm.invalid) {
      console.log('Formulário inválido.');
      console.log(this.userForm.value);
      this.snackBar.open('Não foi possível salvar as informações.', '', {
        duration: 4500,
      });
    } else {
      console.log(this.userForm.value);
      this.userService.editUser(this.userForm.value).subscribe({
        next: (result) => {
          this.snackBar.open('Usuário salvo com sucesso.', '', {
            duration: 4000,
          }),
            this.router.navigate(['/usuario']);
        },
        error: (error) => {
          this.snackBar.open('Não foi possível salvar as informações.', '', {
            duration: 4500,
          });
        },
      });
    }
  }

  removeUser() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.removeUser(id).subscribe({
      next: (result) => {
        this.snackBar.open('Usuário removido com sucesso.', '', {
          duration: 4500,
        }),
          this.router.navigate(['/usuario']);
      },
      error: (error) => {
        this.snackBar.open('Não foi possível excluir o usuário.', '', {
          duration: 4500,
        });
      },
    });
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.removeUser();
      }
    });
  }

  passwordValidator() {
    const passRequirement = {
      passwordMinNumber: 1,
      passwordMinUpperCase: 1,
      passwordMinCharacters: 8,
    };
    return [
      `(?=([^A-Z]*[A-Z])\{${passRequirement.passwordMinUpperCase},\})`,
      `(?=([^0-9]*[0-9])\{${passRequirement.passwordMinNumber},\})`,
      `[A-Za-z\\d\$\@\$\!\%\*\?\&\.]{${passRequirement.passwordMinCharacters},}`,
    ]
      .map((item) => item.toString())
      .join('');
  }
}
