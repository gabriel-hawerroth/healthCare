import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Unidade } from '../../../../../interfaces/unidade';
import { CnpjMaskPipe } from '../../../../../shared/pipes/cnpj-mask.pipe';

@Component({
  selector: 'app-unit-list',
  standalone: true,
  imports: [NgxDatatableModule, CnpjMaskPipe],
  templateUrl: './unit-list.component.html',
  styleUrl: './unit-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitListComponent {
  unitsList = input.required<Unidade[]>();
  onClickRow = output<any>();
}
