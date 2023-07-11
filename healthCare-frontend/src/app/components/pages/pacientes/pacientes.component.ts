import { Component, OnInit } from '@angular/core';

import { Patient } from 'src/app/Patient';
import { PatientService } from 'src/app/services/paciente/patient.service';
import { environment } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
})
export class PacientesComponent implements OnInit {
  allPatients: Patient[] = [];
  patients: Patient[] = [];

  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = '';

  rows = [this.allPatients];

  initialSelectedOption: string = 'A';

  constructor(private patientService: PatientService) {}
  ngOnInit(): void {
    this.patientService.getPatients().subscribe((items: any) => {
      this.allPatients = items;
      this.patients = items;

      this.filterSituation(this.initialSelectedOption);
    });

    // this.buildComponent();
    //   this.form.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {this.filterEspecialista()});
    //   this.atualizaLista();
  }

  filterName(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.patients = this.allPatients.filter((patient) => {
      return patient.ds_nome.toLowerCase().includes(value);
    });
  }

  handleSelectChange(event: any): void {
    const value = event.value;
    this.filterSituation(value);
  }

  filterSituation(value: string): void {
    this.patients = this.allPatients.filter((patient) => {
      return patient.ie_situacao === value;
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
