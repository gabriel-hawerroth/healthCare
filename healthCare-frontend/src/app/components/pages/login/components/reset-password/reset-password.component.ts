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
  showLoading: boolean = false;

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
    this.showLoading = true;
    this.userService
      .getByEmail(this.resetPasswordForm.get('email')!.value)
      .then((receivedUser) => {
        if (!receivedUser) {
          this.showLoading = false;
          this.utilsService.showSimpleMessage(
            'Esse usuário não existe, verifique e tente novamente'
          );
          return;
        }

        this.userService
          .sendChangePasswordEmail(receivedUser.id!)
          .then(() => {
            this.showLoading = false;
            this.resetPasswordForm.reset(this.originalFormValue);
            this.utilsService.showSimpleMessageWithoutDuration(
              `O link de recuperação foi enviado para o email: ${receivedUser.email}`
            );
          })
          .catch(() => {
            this.showLoading = false;
            this.utilsService.showSimpleMessage(
              'Erro no sistema, tente novamente mais tarde'
            );
          });
      })
      .catch(() => {
        this.showLoading = false;
        this.utilsService.showSimpleMessage(
          'Esse usuário não existe, verifique e tente novamente'
        );
      });
  }
}
