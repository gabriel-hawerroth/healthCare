import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { Patient } from '../../../interfaces/patient';
import { LoginService } from '../../../services/login.service';
import { PatientService } from '../../../services/patient.service';
import { UtilsService } from '../../../utils/utils.service';
import { PatientListComponent } from './components/patient-list/patient-list.component';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [
    PatientListComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
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
