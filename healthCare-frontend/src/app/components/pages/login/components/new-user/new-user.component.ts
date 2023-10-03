import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  newUserForm!: FormGroup;

  constructor(
    private utilsService: UtilsService,
    private userService: UserService,
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
      canChangePassword: false,
    });
  }

  createUser() {
    this.userService
      .newUser(this.newUserForm.value)
      .then((result) => {
        if (result) {
          this.userService
            .SendAccountActivationEmail(result.id!)
            .then(() => {
              this.utilsService.showSimpleMessageWithoutDuration(
                `Um link de ativação da conta foi enviado para o email: ${result.email}`
              );
              this.router.navigate(['/login']);
            })
            .catch(() => {
              this.utilsService.showSimpleMessage(
                'Erro ao criar o usuário, entre em contato com nosso suporte'
              );
              this.userService.removeUser(result.id!);
            });
        } else {
          this.utilsService.showSimpleMessage(
            'Erro ao criar o usuário, entre em contato com nosso suporte'
          );
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 406) {
          this.utilsService.showSimpleMessage(
            'Já existe um usuário vinculado a esse email'
          );
        } else {
          this.utilsService.showSimpleMessage(
            'Erro ao criar o usuário, entre em contato com nosso suporte'
          );
        }
      });
  }
}
