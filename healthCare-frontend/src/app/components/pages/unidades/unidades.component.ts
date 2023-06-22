import { Component, OnInit } from '@angular/core';

import { Unidade } from 'src/app/Unidade';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { environment } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss'],
})
export class UnidadesComponent implements OnInit {
  allUnits: Unidade[] = [];
  units: Unidade[] = [];

  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = '';

  rows = [this.allUnits];
  columns = [
    { prop: 'nome', name: 'Nome' },
    { prop: 'situacao', name: 'Situacao' },
  ];

  constructor(private unidadeService: UnidadeService) {}
  ngOnInit(): void {
    this.unidadeService.getUnidades().subscribe((items: any) => {
      this.allUnits = items;
      this.units = items;
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.units = this.allUnits.filter((unidade) => {
      return unidade.nome.toLowerCase().includes(value);
    });
  }
}
