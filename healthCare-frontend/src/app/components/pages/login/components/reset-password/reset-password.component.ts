import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/utils/utils.service';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;

  constructor(
    private utilsService: UtilsService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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
    if (
      this.resetPasswordForm.get('newPassword')!.value !==
      this.resetPasswordForm.get('confirmNewPassword')!.value
    ) {
      this.utilsService.showSimpleMessage('As senhas não coincidem');
      return;
    }

    this.userService
      .getByEmail(this.resetPasswordForm.get('email')!.value)
      .then((receivedUser) => {
        if (receivedUser) {
          if (!receivedUser.canChangePassword) {
            this.utilsService.showSimpleMessage(
              'Você não deu permissão para alterar a senha'
            );
            return;
          }

          const user = receivedUser;
          user.senha = this.resetPasswordForm.get('newPassword')!.value;

          console.log(user);

          this.userService
            .editUser(user)
            .then(() => {
              this.utilsService.showSimpleMessage('Senha alterada com sucesso');
              this.router.navigate(['/login']);

              user.canChangePassword = false;
              this.userService.editUser(user).then(() => {});
            })
            .catch(() => {
              this.utilsService.showSimpleMessage(
                'Erro ao atualizar a senha, entre em contato com o nosso suporte'
              );
              return;
            });
        } else {
          this.utilsService.showSimpleMessage(
            'Erro no sistema, entre em contato com o nosso suporte'
          );
          return;
        }
      })
      .catch(() => {
        this.utilsService.showSimpleMessage(
          'Erro no sistema, entre em contato com o nosso suporte'
        );
        return;
      });
  }

  requestPermission() {
    if (
      this.resetPasswordForm.get('email')?.value &&
      !this.resetPasswordForm.get('email')?.invalid
    ) {
      this.userService
        .getByEmail(this.resetPasswordForm.get('email')!.value)
        .then((result) => {
          if (result) {
            this.userService
              .requestPermissionToChangePassword(result.id!)
              .then(() => {
                this.utilsService.showSimpleMessageWithDuration(
                  `Permissão enviada para o email ${result.email}`,
                  6000
                );
                return;
              })
              .catch(() => {
                this.utilsService.showSimpleMessage(
                  'Erro ao enviar o email, entre em contato com o nosso suporte'
                );
                return;
              });
          } else {
            this.utilsService.showSimpleMessage(
              'Erro ao enviar o email, entre em contato com o nosso suporte'
            );
            return;
          }
        })
        .catch(() => {
          this.utilsService.showSimpleMessage(
            'Erro ao enviar o token, entre em contato com o nosso suporte'
          );
          return;
        });
    } else {
      this.utilsService.showSimpleMessage(
        'É necessário informar um email válido'
      );
      return;
    }
  }
}
