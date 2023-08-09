import { Component, OnInit } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import { User } from 'src/app/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user!: User;
  faBell = faBell;

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
}
