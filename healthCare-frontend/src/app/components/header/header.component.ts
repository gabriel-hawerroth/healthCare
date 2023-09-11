import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user/user.service';
import { BottomSheetComponent } from 'src/app/utils/bottom-sheet/bottom-sheet.component';
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
