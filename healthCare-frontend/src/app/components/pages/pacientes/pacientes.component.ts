import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, lastValueFrom, Subject, takeUntil } from 'rxjs';

import { Patient } from 'src/app/interfaces/Patient';
import { PatientService } from 'src/app/services/paciente/patient.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
})
export class PacientesComponent implements OnInit, OnDestroy {
  filterForm!: FormGroup;
  patients: Patient[] = [];
  filteredPatients: BehaviorSubject<Patient[]>;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private patientService: PatientService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {
    this.filteredPatients = new BehaviorSubject<Patient[]>([]);
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.filterForm = this.fb.group({
      dsNome: '',
      ieSituacao: 'A',
    });

    this.listaPacientes();

    this.filterForm.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.filterList();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }

  listaPacientes() {
    lastValueFrom(
      this.patientService.getPatients(this.userService.getLoggedUserId!)
    ).then((result) => {
      this.patients = result;
      this.filteredPatients.next(result);
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
    let rows = this.patients.slice();
    const dsNome = this.filterForm.get('dsNome')!.value;
    const ieSituacao = this.filterForm.get('ieSituacao')!.value;

    if (dsNome) {
      rows = this.utilsService.filterList(rows, 'dsNome', dsNome);
    }

    if (ieSituacao) {
      rows = this.utilsService.filterList(rows, 'ieSituacao', ieSituacao);
    }

    this.filteredPatients.next(rows);
  }
}
