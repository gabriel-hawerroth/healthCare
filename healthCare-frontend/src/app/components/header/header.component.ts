import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user!: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.user = this.userService.getLoggedUser;
  }

  navigate(route: string) {
    this.router.navigate([route], { relativeTo: this.route });
  }

  logout() {
    this.userService.logout();
  }
}
