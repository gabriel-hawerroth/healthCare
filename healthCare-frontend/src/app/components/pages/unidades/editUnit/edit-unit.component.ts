import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { Unidade } from 'src/app/interfaces/Unidade';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.scss'],
})
export class EditUnitComponent implements OnInit {
  unit?: Unidade;

  constructor(
    private unitService: UnidadeService,
    private route: ActivatedRoute,
    private userService: UserService,
    private utilsService: UtilsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    lastValueFrom(
      this.unitService.getUnits(this.userService.getLoggedUserId!)
    ).then((result) => {
      const units: Unidade[] = result;
      const unitsId = units.map((unit) => unit.id);

      if (!unitsId.includes(id)) {
        this.utilsService.showSimpleMessage('Unidade não encontrada');
        this.router.navigate(['/unidade']);
        return;
      } else {
        lastValueFrom(this.unitService.getById(id)).then((result) => {
          this.unit = result;
        });
      }
    });
  }
}
