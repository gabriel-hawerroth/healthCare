import { Component, OnInit } from '@angular/core';

import { Paciente } from 'src/app/Paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { environment } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
})
export class PacientesComponent implements OnInit {
  allPacientes: Paciente[] = [];
  pacientes: Paciente[] = [];

  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = '';

  rows = [this.allPacientes];
  columns = [
    { prop: 'nome', name: 'Nome' },
    { prop: 'dt_nascimento', name: 'Nascimento' },
    { prop: 'nr_cpf', name: 'CPF' },
    { prop: 'cidade', name: 'Cidade' },
    { prop: 'estado', name: 'Estado' },
    { prop: 'ie_situacao', name: 'Situação' },
  ];

  constructor(private pacienteService: PacienteService) {}
  ngOnInit(): void {
    this.pacienteService.getPacientes().subscribe((items: any) => {
      this.allPacientes = items;
      this.pacientes = items;
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.pacientes = this.allPacientes.filter((paciente) => {
      return paciente.nome.toLowerCase().includes(value);
    });
  }
}
