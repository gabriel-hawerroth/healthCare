import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-activate',
  templateUrl: './account-activate.component.html',
  styleUrls: ['./account-activate.component.scss'],
})
export class AccountActivateComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  navigateToLogin() {
    this._router.navigate(['login']);
  }
}
