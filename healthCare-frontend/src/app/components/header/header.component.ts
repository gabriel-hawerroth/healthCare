import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

import { User } from 'src/app/User';
import { UserService } from 'src/app/services/user/user.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user!: User;

  constructor(
    private userService: UserService,
    private appComponent: AppComponent,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('id-usuario') == null) {
      localStorage.setItem('id-usuario', '2');
    }
    const userId = localStorage.getItem('id-usuario');

    lastValueFrom(this.userService.getById(Number(userId))).then((result) => {
      this.user = result;
    });
  }

  logout() {
    this.appComponent.permissao = false;
  }
}
