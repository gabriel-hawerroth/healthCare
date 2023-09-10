import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/utils/utils.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;

  constructor(
    private utilsService: UtilsService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      user: ['', [Validators.required, Validators.email]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(this.utilsService.passwordValidator()),
        ],
      ],
      confirmNewPassword: ['', Validators.required],
    });
  }

  resetPassword() {
    if (this.resetPasswordForm.invalid) {
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

    if (
      this.resetPasswordForm.get('newPassword')!.value !==
      this.resetPasswordForm.get('confirmNewPassword')!.value
    ) {
      this.utilsService.showSimpleMessage('As senhas não coincidem');
      return;
    }

    console.log('passou das validações iniciais, tentando obter token');

    lastValueFrom(
      this.userService.checkToken(this.resetPasswordForm.get('user')!.value)
    ).then((result) => {
      console.log('entrou no .then do checkToken');
      if (
        result &&
        result.token === typedToken &&
        this.resetPasswordForm.get('user')!.value === result.user
      ) {
        console.log('passou das validações de token, tentando obter usuário');
        lastValueFrom(this.userService.getByEmail(result.user))
          .then((receivedUser) => {
            const user = receivedUser;
            user.senha = this.resetPasswordForm.get('newPassword')!.value;
            lastValueFrom(this.userService.editUser(user))
              .then(() => {
                this.utilsService.showSimpleMessage(
                  'Senha alterada com sucesso'
                );
                this.router.navigate(['/login']);
              })
              .catch(() => {
                this.utilsService.showSimpleMessage(
                  'Erro ao atualizar a senha, entre em contato com o nosso suporte'
                );
              });
          })
          .catch(() => {
            this.utilsService.showSimpleMessage(
              'Erro no sistema, entre em contato com o nosso suporte'
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
      this.resetPasswordForm.get('user') &&
      !this.resetPasswordForm.get('user')?.invalid
    ) {
      const email = this.resetPasswordForm.get('user')!.value;

      lastValueFrom(this.userService.sendToken(email))
        .then(() => {
          this.utilsService.showSimpleMessageWithDuration(
            `Token enviado para o email ${email}`,
            4500
          );
        })
        .catch(() => {
          this.utilsService.showSimpleMessage(
            'Erro ao enviar o token, entre em contato com o nosso suporte'
          );
        });
    } else {
      this.utilsService.showSimpleMessage(
        'É necessário informar um email válido para enviar o token'
      );
    }
  }
}
