import { AsyncPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Patient } from '../../../../../interfaces/patient';
import { CpfMaskPipe } from '../../../../../utils/cpf-mask.pipe';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [NgxDatatableModule, DatePipe, CpfMaskPipe, AsyncPipe],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientListComponent {
  patientsList = input.required<Patient[]>();
  onRowClick = output<any>();
}
