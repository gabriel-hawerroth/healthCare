import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../../../../services/user/user.service';
import { UtilsService } from '../../../../../utils/utils.service';
import { LoginService } from '../../../../../services/user/login.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  originalFormValue: any;

  showLoading = signal(false);

  constructor(
    private utilsService: UtilsService,
    private userService: UserService,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.originalFormValue = this.resetPasswordForm.value;
  }

  resetPassword() {
    this.showLoading.set(true);
    this.userService
      .getByEmail(this.resetPasswordForm.get('email')!.value)
      .then(async (receivedUser) => {
        if (!receivedUser) {
          this.utilsService.showSimpleMessage(
            'Esse usuário não existe, verifique e tente novamente'
          );
          return;
        }

        await this.loginService
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
      })
      .catch(() => {
        this.utilsService.showSimpleMessage(
          'Esse usuário não existe, verifique e tente novamente'
        );
      })
      .finally(() => this.showLoading.set(false));
  }
}
