import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Unidade } from 'src/app/Unidade';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss'],
})
export class UnidadesComponent implements OnInit {
  @Output() edit = new EventEmitter(false);

  allUnits: Unidade[] = [];
  filteredUnits: Unidade[] = [];

  baseApiUrl = environment.baseApiUrl;

  initialSelectedOption: string = 'A';

  constructor(private unidadeService: UnidadeService, private route: Router) {}
  ngOnInit(): void {
    this.unidadeService.getUnits().subscribe((items: any) => {
      this.allUnits = items;
      this.filteredUnits = items;
    });

    this.filterSituation(this.initialSelectedOption);
  }

  filterName(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.filteredUnits = this.allUnits.filter((unit) => {
      return unit.ds_nome.toLowerCase().includes(value);
    });
  }

  handleSelectChange(event: any): void {
    const value = event.value;
    this.filterSituation(value);
  }

  filterSituation(value: string): void {
    this.filteredUnits = this.allUnits.filter((units) => {
      return units.ie_situacao === value;
    });
  }

  editUnit(event: any) {
    if (event.type == 'click') {
      const unitId = event.row.id;
      this.route.navigate([`/unidade/${unitId}`]);
    }
  }
}
