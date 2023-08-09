import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  user!: User;

  constructor() {}

  ngOnInit(): void {
    this.user = {
      usuario: 'gabrielhawerroth04@gmail.com',
      senha: 'HealthCare123',
      nome: 'Gabriel',
      sobrenome: 'Hawerroth',
      acesso: 'adm',
      permissao: true,
      primeiro_acesso: false,
      situacao: 'A',
    };
  }

  ngOnDestroy(): void {
    // set permissao = false
  }
}
