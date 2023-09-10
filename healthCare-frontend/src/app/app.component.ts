import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  logged = this.userService.logged;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.logged = this.userService.logged;
  }

  showHeader() {
    return this.logged;
  }
}
