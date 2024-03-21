import {
  Component,
  OnInit,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Patient } from '../../../interfaces/patient';
import { PatientService } from '../../../services/paciente/patient.service';
import { UserService } from '../../../services/user/user.service';
import { UtilsService } from '../../../utils/utils.service';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [
    PatientListComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PacientesComponent implements OnInit {
  filterForm!: FormGroup;

  patients: Patient[] = [];
  filteredPatients = signal<Patient[]>([]);

  constructor(
    private patientService: PatientService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      dsNome: '',
      ieSituacao: 'A',
    });

    this.listaPacientes();
  }

  listaPacientes() {
    this.patientService
      .getPatients(this.userService.getLoggedUserId!)
      .then((result) => {
        this.patients = result;
        this.filteredPatients.set(result);
        this.filterList();
      });
  }

  editPatient(event: any) {
    if (event.type === 'click') {
      const patientId = event.row.id;
      this.router.navigate([`/paciente/${patientId}`]);
    }
  }

  filterList() {
    let rows = this.patients;
    const dsNome = this.filterForm.value.dsNome;
    const ieSituacao = this.filterForm.value.ieSituacao;

    if (dsNome) {
      rows = this.utilsService.filterList(rows, 'dsNome', dsNome);
    }

    if (ieSituacao) {
      rows = this.utilsService.filterList(rows, 'ieSituacao', ieSituacao);
    }

    this.filteredPatients.set(rows);
  }
}
