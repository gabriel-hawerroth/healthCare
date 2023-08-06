import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Atendimento } from 'src/app/Atendimento';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';

@Component({
  selector: 'app-edit-atend',
  templateUrl: './edit-atend.component.html',
  styleUrls: ['./edit-atend.component.scss'],
})
export class EditAtendComponent implements OnInit {
  atend!: Atendimento;

  constructor(
    private atendService: AtendimentoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    try {
      this.atendService.getById(id).subscribe((item) => {
        this.atend = item;
        console.log(item);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
