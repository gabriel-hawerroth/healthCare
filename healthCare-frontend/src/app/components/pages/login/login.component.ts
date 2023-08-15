import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AppComponent } from 'src/app/app.component';

import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private appComponent: AppComponent,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: '',
      senha: '',
    });
  }

  logar() {
    if (this.loginForm.invalid) {
      console.log('Formulário inválido!');
      this.snackBar.open('Login inválido', '', {
        duration: 4000,
      });
    } else {
      const usuario = this.loginForm.get('usuario')?.value;
      const senha = this.loginForm.get('senha')?.value;

      lastValueFrom(this.userService.login(usuario, senha))
        .then((result) => {
          this.snackBar.open('Login realizado com sucesso.', '', {
            duration: 4000,
          });
          this.appComponent.permissao = true;
          localStorage.setItem('permissao', 'true');
          localStorage.setItem('id-usuario', String(result.id));
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          this.snackBar.open('Login inválido.', '', {
            duration: 4500,
          });
        });
    }
  }
}
