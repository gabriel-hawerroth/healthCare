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
import { UtilsService } from '../../../utils/utils.service';
import { LoginService } from '../../../services/user/login.service';

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
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      ds_nome: '',
      ie_situacao: 'A',
    });

    this.listaPacientes();
  }

  listaPacientes() {
    this.patientService
      .getPatients(this.loginService.getLoggedUserId!)
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
    const dsNome = this.filterForm.value.ds_nome;
    const ieSituacao = this.filterForm.value.ie_situacao;

    if (dsNome) {
      rows = this.utilsService.filterList(rows, 'ds_nome', dsNome);
    }

    if (ieSituacao) {
      rows = this.utilsService.filterList(rows, 'ie_situacao', ieSituacao);
    }

    this.filteredPatients.set(rows);
  }
}
