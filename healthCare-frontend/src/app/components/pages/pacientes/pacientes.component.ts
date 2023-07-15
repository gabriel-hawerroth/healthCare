import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Patient } from 'src/app/Patient';
import { PatientService } from 'src/app/services/paciente/patient.service';
import { environment } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
})
export class PacientesComponent implements OnInit {
  @Output() edit = new EventEmitter(false);

  allPatients: Patient[] = [];
  patients: Patient[] = [];
  filteredRows = this.patients;

  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = '';

  initialSelectedOption: string = 'A';

  constructor(private patientService: PatientService, private router: Router) {}
  ngOnInit(): void {
    this.patientService.getPatients().subscribe((items: any) => {
      this.allPatients = items;
      this.patients = items;

      this.filterSituation(this.initialSelectedOption);
    });
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

  editPatient(event: any) {
    if (event.type == 'click') {
      const patientId = event.row.id;
      this.router.navigate([`/paciente/${patientId}`]);
      this.edit.emit(event);
    }
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
