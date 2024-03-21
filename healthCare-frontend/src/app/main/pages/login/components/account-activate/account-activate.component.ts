import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-activate',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './account-activate.component.html',
  styleUrls: ['./account-activate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountActivateComponent {
  constructor(private _router: Router) {}

  navigateToLogin() {
    this._router.navigate(['login']);
  }
}
