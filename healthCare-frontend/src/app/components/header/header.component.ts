import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { User } from 'src/app/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('id-usuario');

    lastValueFrom(this.userService.getById(Number(userId))).then((result) => {
      this.user = result;
    });
  }
}
