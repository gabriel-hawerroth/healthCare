import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Credentials } from 'src/app/interfaces/Credentials';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  userId: number = 0;
  permission: boolean = true;

  user?: User;

  constructor(
    private _fb: FormBuilder,
    private _utilsService: UtilsService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.buildForm();

    this.userId = +(this._activatedRoute.snapshot.paramMap.get('id') || '0');
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
    this._userService
      .getById(this.userId)
      .then((user) => {
        this.user = user;

        if (user.canChangePassword) return;

        this.permission = false;
      })
      .catch(() => {
        this.permission = false;
      });
  }

  changePassword() {
    const newPass = {
      newPassword: this.changePasswordForm.get('newPassword')!.value,
      newPasswordConfirm:
        this.changePasswordForm.get('newPasswordConfirm')!.value,
    };

    if (newPass.newPassword !== newPass.newPasswordConfirm) {
      this._utilsService.showSimpleMessage('As senhas não coincidem');
      return;
    }

    this._userService
      .changePassword(this.userId, newPass.newPassword)
      .then((result) => {
        if (!result) return;

        const credentials: Credentials = {
          username: this.user!.email,
          password: newPass.newPassword,
        };

        this._userService.login(credentials);
      });
  }
}
