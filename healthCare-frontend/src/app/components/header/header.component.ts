import { Component, OnInit } from '@angular/core';

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

    this.userService.getById(Number(userId)).subscribe({
      next: (result) => {
        this.user = result;
      },
    });
  }
}
