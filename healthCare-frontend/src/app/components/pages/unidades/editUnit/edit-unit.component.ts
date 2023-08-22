import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Unidade } from 'src/app/models/Unidade';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.scss'],
})
export class EditUnitComponent implements OnInit {
  unit!: Unidade;

  constructor(
    private unitService: UnidadeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    lastValueFrom(this.unitService.getById(id)).then((result) => {
      this.unit = result;
    });
  }
}
