import { Component, OnInit } from '@angular/core';

import { Unidade } from 'src/app/Unidade';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { environment } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss'],
})
export class UnidadesComponent implements OnInit {
  allUnits: Unidade[] = [];
  units: Unidade[] = [];

  constructor(private unidadeService: UnidadeService, private route: Router) {}
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
      return unidade.ds_nome.toLowerCase().includes(value);
    });
  }

  editUnit(event: any) {
    if (event.type == 'click') {
      const patientId = event.row.id;
      this.route.navigate([`/paciente/${patientId}`]);
    }
  }
}
