import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  public isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor(private _snackBar: MatSnackBar, private _http: HttpClient) {}

  showSimpleMessage(message: string, duration: number = 3000) {
    this._snackBar.open(message, '', {
      duration,
    });
  }

  showSimpleMessageWithoutDuration(message: string) {
    this._snackBar.open(message, 'OK');
  }

  getItemLocalStorage(item: string): string | null {
    return this.isBrowser ? localStorage.getItem(item) : null;
  }

  setItemLocalStorage(key: string, value: string): void {
    if (this.isBrowser) localStorage.setItem(key, value);
  }

  removeItemLocalStorage(item: string): void {
    if (this.isBrowser) localStorage.removeItem(item);
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

  filterList(rows: any, atributo: string, keyWord: any) {
    if (!rows) return [];

    if (typeof keyWord === 'string') {
      return rows.filter((item: any) => {
        if (item[atributo]) {
          return (
            this.removeAccents(String(item[atributo]).toLowerCase()).indexOf(
              this.removeAccents(keyWord.toLowerCase())
            ) !== -1
          );
        }
        return false;
      });
    }
    return rows.filter((item: any) => item[atributo] === keyWord);
  }

  filterListByDate(
    rows: any[],
    atributo: string,
    dateFilterStart: Date,
    dateFilterEnd: Date
  ) {
    if (!rows) return rows;

    return rows.filter((item: any) => {
      if (item[atributo]) {
        const itemDate = new Date(item[atributo]);

        if (!isNaN(itemDate.getTime())) {
          return (
            itemDate >= dateFilterStart &&
            (!dateFilterEnd || itemDate <= dateFilterEnd)
          );
        }
      }
      return false;
    });
  }

  removeAccents(newStringComAcento: string): string {
    if (!newStringComAcento) {
      return '';
    } else if (newStringComAcento === null) {
      alert('Campo descrição nulo');
    }

    let str = newStringComAcento;

    const mapaAcentosHex: { [key: string]: RegExp } = {
      a: /[\xE0-\xE6]/g,
      A: /[\xC0-\xC6]/g,
      e: /[\xE8-\xEB]/g,
      E: /[\xC8-\xCB]/g,
      i: /[\xEC-\xEF]/g,
      I: /[\xCC-\xCF]/g,
      o: /[\xF2-\xF6]/g,
      O: /[\xD2-\xD6]/g,
      u: /[\xF9-\xFC]/g,
      U: /[\xD9-\xDC]/g,
      c: /\xE7/g,
      C: /\xC7/g,
      n: /\xF1/g,
      N: /\xD1/g,
    };

    for (const letra in mapaAcentosHex) {
      const expressaoRegular = mapaAcentosHex[letra];
      str = str.replace(expressaoRegular, letra);
    }

    return str;
  }

  findAddress(cep: string): Promise<any> {
    return lastValueFrom(
      this._http.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)
    );
  }
}
