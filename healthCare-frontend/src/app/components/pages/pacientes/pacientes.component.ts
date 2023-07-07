import { Component, OnInit } from '@angular/core';

import { Paciente } from 'src/app/Paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { environment } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
})
export class PacientesComponent implements OnInit {
  allPatients: Paciente[] = [];
  patients: Paciente[] = [];

  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = '';

  rows = [this.allPatients];
  rowsLimit: number = 7;

  constructor(private pacienteService: PacienteService) {}
  ngOnInit(): void {
    this.pacienteService.getPacientes().subscribe((items: any) => {
      this.allPatients = items;
      this.patients = items;

      const handleResize = (): void => {
        const windowWidth: number = window.innerWidth;
        const windowHeight: number = window.innerHeight;

        if (windowWidth > 1300 && windowHeight > 700) {
          this.rowsLimit = 7;
        } else {
          this.rowsLimit = 5;
        }

        console.log('Valor de rowsLimit:', this.rowsLimit);
      };

      window.addEventListener('resize', handleResize);
    });

    // this.buildComponent();
    //   this.form.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {this.filterEspecialista()});
    //   this.atualizaLista();
  }

  filterName(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.patients = this.allPatients.filter((patient) => {
      return patient.nome.toLowerCase().includes(value);
    });
  }

  filterSituation(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.patients = this.allPatients.filter((patient) => {
      return patient.ie_situacao.includes(value);
    });
  }

  // public removeAcentos(newStringComAcento): string {
  //   if (!newStringComAcento) {
  //     return "";
  //   } else if (newStringComAcento === null) {
  //     alert("Campo descrição nulo");
  //   }

  //   let str = newStringComAcento;

  //   const mapaAcentosHex = {
  //     a: /[\xE0-\xE6]/g,
  //     A: /[\xC0-\xC6]/g,
  //     e: /[\xE8-\xEB]/g,
  //     E: /[\xC8-\xCB]/g,
  //     i: /[\xEC-\xEF]/g,
  //     I: /[\xCC-\xCF]/g,
  //     o: /[\xF2-\xF6]/g,
  //     O: /[\xD2-\xD6]/g,
  //     u: /[\xF9-\xFC]/g,
  //     U: /[\xD9-\xDC]/g,
  //     c: /\xE7/g,
  //     C: /\xC7/g,
  //     n: /\xF1/g,
  //     N: /\xD1/g,
  //   };

  //   for (const letra in mapaAcentosHex) {
  //     const expressaoRegular = mapaAcentosHex[letra];
  //     str = str.replace(expressaoRegular, letra);
  //   }

  //   return str;
  // }
}
