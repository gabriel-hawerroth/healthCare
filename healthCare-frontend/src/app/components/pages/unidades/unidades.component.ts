import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, lastValueFrom } from 'rxjs';

import { Unidade } from 'src/app/Unidade';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss'],
})
export class UnidadesComponent implements OnInit, OnDestroy {
  @Output() edit = new EventEmitter(false);

  filterForm!: FormGroup;
  filteredUnits: Unidade[] = [];

  subscriptions!: Subscription;

  constructor(
    private unidadeService: UnidadeService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      dsNome: [''],
      ieSituacao: ['A'],
    });

    this.subscriptions = this.filterForm.valueChanges.subscribe(() => {
      this.listaUnidades();
    });

    this.listaUnidades();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  listaUnidades() {
    const dsNome = this.filterForm.get('dsNome')?.value.toLowerCase();
    const situacao = this.filterForm.get('ieSituacao')!.value;

    lastValueFrom(this.unidadeService.getUnits(dsNome, situacao)).then(
      (result) => {
        this.filteredUnits = result;
      }
    );
  }

  editUnit(event: any) {
    if (event.type === 'click') {
      const unitId = event.row.id;
      this.router.navigate([`/unidade/${unitId}`]);
    }
  }
}
