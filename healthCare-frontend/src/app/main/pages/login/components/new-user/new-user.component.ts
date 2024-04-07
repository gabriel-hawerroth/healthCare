import { CommonModule } from '@angular/common';
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
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { UtilsService } from '../../../../../utils/utils.service';
import { UserService } from '../../../../../services/user.service';
import { LoginService } from '../../../../../services/login.service';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewUserComponent implements OnInit {
  newUserForm!: FormGroup;
  showLoading = signal(false);

  constructor(
    private utilsService: UtilsService,
    private userService: UserService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.newUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: [
        '',
        [
          Validators.required,
          Validators.pattern(this.utilsService.passwordValidator()),
        ],
      ],
      nome: ['', Validators.required],
      sobrenome: '',
      acesso: 'Cadastro',
      situacao: 'I',
      can_change_password: false,
    });
  }

  createUser() {
    this.showLoading.set(true);

    this.userService
      .saveUser(this.newUserForm.getRawValue())
      .then(async (result) => {
        if (!result) {
          this.utilsService.showSimpleMessage(
            'Erro ao criar o usuário, entre em contato com nosso suporte'
          );
        }

        await this.loginService
          .sendActivateAccountEmail(result.id!)
          .then(() => {
            this.utilsService.showSimpleMessageWithoutDuration(
              `Um link de ativação da conta foi enviado para o email:\n ${result.email}`
            );
            this.router.navigate(['/login']);
          })
          .catch(() => {
            this.utilsService.showSimpleMessage(
              'Erro ao criar o usuário, entre em contato com nosso suporte'
            );
            this.userService.removeUser(result.id!);
          });
      })
      .catch((error) => {
        if (error.status === 406) {
          this.utilsService.showSimpleMessage(
            'Já existe um usuário vinculado a esse email'
          );
        } else {
          this.utilsService.showSimpleMessage(
            'Erro ao criar o usuário, entre em contato com nosso suporte'
          );
        }
      })
      .finally(() => this.showLoading.set(false));
  }
}
