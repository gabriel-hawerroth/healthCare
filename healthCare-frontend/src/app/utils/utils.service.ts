import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private _snackBar: MatSnackBar) {}

  showSimpleMessage(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }

  showSimpleMessageWithDuration(message: string, duration: number) {
    this._snackBar.open(message, '', {
      duration: duration,
    });
  }

  passwordValidator() {
    const passRequirement = {
      passwordMinNumber: 1,
      passwordMinUpperCase: 1,
      passwordMinCharacters: 8,
    };
    return [
      `(?=([^A-Z]*[A-Z])\{${passRequirement.passwordMinUpperCase},\})`,
      `(?=([^0-9]*[0-9])\{${passRequirement.passwordMinNumber},\})`,
      `[A-Za-z\\d\$\@\$\!\%\*\?\&\.]{${passRequirement.passwordMinCharacters},}`,
    ]
      .map((item) => item.toString())
      .join('');
  }
}
