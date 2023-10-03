import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/utils/utils.service';

import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  originalFormValue!: FormGroup;

  constructor(
    private utilsService: UtilsService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.originalFormValue = this.resetPasswordForm.value;
  }

  resetPassword() {
    this.userService
      .getByEmail(this.resetPasswordForm.get('email')!.value)
      .then((receivedUser) => {
        if (!receivedUser) {
          this.utilsService.showSimpleMessage(
            'Esse usuário não existe, verifique e tente novamente'
          );
          return;
        }

        this.userService
          .sendChangePasswordEmail(receivedUser.id!)
          .then(() => {
            this.resetPasswordForm.reset(this.originalFormValue);
            this.utilsService.showSimpleMessageWithoutDuration(
              `O link de recuperação foi enviado para o email: ${receivedUser.email}`
            );
          })
          .catch(() => {
            this.utilsService.showSimpleMessage(
              'Erro no sistema, tente novamente mais tarde'
            );
          });

        // this.userService
        //   .editUser(user)
        //   .then(() => {
        //     this.utilsService.showSimpleMessage('Senha alterada com sucesso');
        //     this.router.navigate(['/login']);

        //     user.canChangePassword = false;
        //     this.userService.editUser(user).then(() => {});
        //   })
        //   .catch(() => {
        //     this.utilsService.showSimpleMessage(
        //       'Erro ao atualizar a senha, entre em contato com o nosso suporte'
        //     );
        //     return;
        //   });
      })
      .catch(() => {
        this.utilsService.showSimpleMessage(
          'Esse usuário não existe, verifique e tente novamente'
        );
      });
  }
}
