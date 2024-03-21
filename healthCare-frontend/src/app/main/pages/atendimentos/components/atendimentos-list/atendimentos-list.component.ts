import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AtendsPerson } from '../../../../../interfaces/atends_person';

@Component({
  selector: 'app-atendimentos-list',
  standalone: true,
  imports: [NgxDatatableModule, DatePipe],
  templateUrl: './atendimentos-list.component.html',
  styleUrl: './atendimentos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtendimentosListComponent {
  atendsList = input.required<AtendsPerson[]>();
  onClickRow = output<any>();
}
