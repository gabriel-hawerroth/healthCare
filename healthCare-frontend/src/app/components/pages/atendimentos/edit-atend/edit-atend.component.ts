import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Atendimento } from 'src/app/models/Atendimento';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';

@Component({
  selector: 'app-edit-atend',
  templateUrl: './edit-atend.component.html',
  styleUrls: ['./edit-atend.component.scss'],
})
export class EditAtendComponent implements OnInit {
  atend?: Atendimento;

  constructor(
    private atendService: AtendimentoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    lastValueFrom(this.atendService.getById(id)).then((result) => {
      this.atend = result;
    });
  }
}
