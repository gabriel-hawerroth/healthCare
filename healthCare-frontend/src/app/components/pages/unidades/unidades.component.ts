import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Unidade } from 'src/app/Unidade';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss'],
})
export class UnidadesComponent implements OnInit {
  @Output() edit = new EventEmitter(false);

  baseApiUrl = environment.baseApiUrl;
  filterForm!: FormGroup;

  allUnits: Unidade[] = [];
  filteredUnits: Unidade[] = [];

  constructor(
    private unidadeService: UnidadeService,
    private route: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      dsNome: [''],
      ieSituacao: ['A'],
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.listaUnidades();
    });

    this.listaUnidades();
  }

  listaUnidades() {
    const dsNome = this.filterForm.get('dsNome')?.value.toLowerCase();
    const situacao = this.filterForm.get('ieSituacao')!.value;

    this.unidadeService.getUnits(dsNome, situacao).subscribe((items: any) => {
      this.allUnits = items;
      this.filteredUnits = items;
    });
  }

  editUnit(event: any) {
    if (event.type == 'click') {
      const unitId = event.row.id;
      this.route.navigate([`/unidade/${unitId}`]);
    }
  }
}
