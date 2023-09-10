import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/utils/utils.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent {
  newUserForm!: FormGroup;

  constructor(
    private utilsService: UtilsService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      senha: [
        '',
        [
          Validators.required,
          Validators.pattern(this.utilsService.passwordValidator()),
        ],
      ],
      nome: ['', [Validators.required]],
      sobrenome: [''],
      acesso: ['Cadastro'],
      situacao: ['A'],
    });
  }

  createUser() {
    if (this.newUserForm.invalid) {
      this.utilsService.showSimpleMessage('Campos inválidos');
      return;
    }

    const tokenInput = document.querySelector(
      '#typedToken'
    ) as HTMLInputElement;
    const typedToken = tokenInput.value;
    if (typedToken.length < 6) {
      this.utilsService.showSimpleMessage('O token deve ter 6 dígitos');
      return;
    }

    lastValueFrom(
      this.userService.checkToken(this.newUserForm.get('usuario')!.value)
    ).then((result) => {
      if (
        result &&
        result.token === typedToken &&
        this.newUserForm.get('usuario')!.value === result.user
      ) {
        lastValueFrom(this.userService.createUser(this.newUserForm.value))
          .then(() => {
            this.utilsService.showSimpleMessage('Usuário criado com sucesso');

            const credentials = {
              username: this.newUserForm.get('usuario')!.value,
              password: this.newUserForm.get('password')!.value,
            };
            this.userService.login(credentials);
          })
          .catch(() => {
            this.utilsService.showSimpleMessage(
              'Erro ao criar o usuário, tente novamente mais tarde'
            );
          });
      } else {
        this.utilsService.showSimpleMessage('Token inválido');
        return;
      }
    });
  }

  sendToken() {
    if (
      this.newUserForm.get('usuario') &&
      !this.newUserForm.get('usuario')?.invalid
    ) {
      const email = this.newUserForm.get('usuario')!.value;

      lastValueFrom(this.userService.sendToken(email))
        .then(() => {
          this.utilsService.showSimpleMessage(
            `Token enviado para o email: ${email}`
          );
        })
        .catch(() => {
          this.utilsService.showSimpleMessage(
            'Erro ao enviar o token, tente novamente mais tarde'
          );
        });
    } else {
      this.utilsService.showSimpleMessage(
        'É necessário informar um email válido para enviar o token'
      );
    }
  }
}
