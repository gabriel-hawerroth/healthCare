import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';
import { BottomSheetComponent } from '../../utils/bottom-sheet/bottom-sheet.component';

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
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.user = this.userService.getLoggedUser;
  }

  logout() {
    this.userService.logout();
  }

  openBottomSheet() {
    this.bottomSheet.open(BottomSheetComponent);
  }
}
