import { Component, OnInit } from '@angular/core';
import { User } from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user!: User;

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
