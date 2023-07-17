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
      nome: 'Gabriel',
      sobrenome: 'Hawerroth',
      email: 'gabrielhawerroth04@gmail.com',
      celular: 47996609550,
      empresa: 'SpinCare',
      permissao: true,
    };
  }
}
