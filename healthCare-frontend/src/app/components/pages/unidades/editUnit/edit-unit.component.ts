import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unidade } from 'src/app/Unidade';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.scss']
})
export class EditUnitComponent implements OnInit {
  unit!: Unidade;

  constructor(
    private unitService: UnidadeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    try {
      this.unitService.getById(id).subscribe((item) => {
        this.unit = item;
        console.log(item);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
