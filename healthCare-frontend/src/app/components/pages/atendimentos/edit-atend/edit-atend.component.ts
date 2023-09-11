import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { Atendimento } from 'src/app/interfaces/Atendimento';
import { AtendsPerson } from 'src/app/interfaces/AtendsPerson';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-edit-atend',
  templateUrl: './edit-atend.component.html',
  styleUrls: ['./edit-atend.component.scss'],
})
export class EditAtendComponent implements OnInit {
  atend?: Atendimento;

  constructor(
    private atendService: AtendimentoService,
    private route: ActivatedRoute,
    private userService: UserService,
    private utilsService: UtilsService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const userId: number = this.userService.getLoggedUserId!;

    lastValueFrom(this.atendService.getAtends(userId)).then((result) => {
      const atends: Atendimento[] = result;
      const atendsId = atends.map((atend) => atend.id);

      if (!atendsId.includes(id)) {
        this.utilsService.showSimpleMessage('Atendimento não encontrado');
        this.router.navigate(['/atendimento']);
        return;
      }
    });

    lastValueFrom(this.atendService.getById(id)).then((result) => {
      this.atend = result;
    });
  }
}
