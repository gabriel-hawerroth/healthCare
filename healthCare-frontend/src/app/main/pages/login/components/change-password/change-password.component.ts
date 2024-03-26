import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Credentials } from '../../../../../interfaces/credentials';
import { User } from '../../../../../interfaces/user';
import { UserService } from '../../../../../services/user/user.service';
import { UtilsService } from '../../../../../utils/utils.service';
import { LoginService } from '../../../../../services/user/login.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent implements OnInit {
  userId!: number;
  user: User | null = null;

  changePasswordForm!: FormGroup;

  showLoading = signal(false);

  constructor(
    private _fb: FormBuilder,
    private _utilsService: UtilsService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _loginService: LoginService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.buildForm();

    this.userId = +this._activatedRoute.snapshot.paramMap.get('id')!;
    this.handlePermission();
  }

  buildForm() {
    this.changePasswordForm = this._fb.group({
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(this._utilsService.passwordValidator()),
        ],
      ],
      newPasswordConfirm: ['', Validators.required],
    });
  }

  handlePermission() {
    this._userService.getById(this.userId).then((user) => {
      this.user = user;

      if (!user.can_change_password) this._router.navigate(['login']);
    });
  }

  changePassword() {
    const newPass = {
      newPassword: this.changePasswordForm.value.newPassword,
      newPasswordConfirm: this.changePasswordForm.value.newPasswordConfirm,
    };

    if (newPass.newPassword !== newPass.newPasswordConfirm) {
      this._utilsService.showSimpleMessage('As senhas não coincidem');
      return;
    }

    this.showLoading.set(true);

    this._loginService
      .changePassword(this.userId, newPass.newPassword)
      .then((result) => {
        if (!result) return;

        const credentials: Credentials = {
          username: this.user!.email,
          password: newPass.newPassword,
        };

        this._loginService.login(credentials);
      })
      .catch(() => {
        this._utilsService.showSimpleMessage(
          'Erro ao alterar a senha, tente novamente mais tarde'
        );
      })
      .finally(() => {
        this.showLoading.set(false);
      });
  }
}
