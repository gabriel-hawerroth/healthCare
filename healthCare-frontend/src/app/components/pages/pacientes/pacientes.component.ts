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

  constructor(private pacienteService: PacienteService) {}
  ngOnInit(): void {
    this.pacienteService.getPacientes().subscribe((items: any) => {
      this.allPatients = items;
      this.patients = items;
    });
  }

  filterName(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

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
}
