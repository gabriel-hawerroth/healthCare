import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from '../../interfaces/user';
import { BottomSheetComponent } from '../../shared/components/bottom-sheet/bottom-sheet.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  user!: User;

  constructor(
    private loginService: LoginService,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.user = this.loginService.getLoggedUser;
  }

  logout() {
    this.loginService.logout();
  }

  openBottomSheet() {
    this.bottomSheet.open(BottomSheetComponent);
  }
}
