import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';

import { Patient } from 'src/app/interfaces/Patient';
import { PatientService } from 'src/app/services/paciente/patient.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
})
export class PacientesComponent implements OnInit, OnDestroy {
  @Output() edit = new EventEmitter(false);

  filterForm!: FormGroup;
  filteredPatients: Patient[] = [];

  private _unsubscribeAll: Subject<any>;

  constructor(
    private patientService: PatientService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      dsNome: '',
      ieSituacao: 'A',
    });

    this.filterForm.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.listaPacientes();
      });

    this.listaPacientes();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }

  listaPacientes() {
    const dsNome = this.filterForm.get('dsNome')?.value.toLowerCase();
    const situacao = this.filterForm.get('ieSituacao')!.value;

    lastValueFrom(
      this.patientService.getPatients(
        dsNome,
        situacao,
        this.userService.getLoggedUserId!
      )
    ).then((result) => {
      this.filteredPatients = result;
    });
  }

  editPatient(event: any) {
    if (event.type === 'click') {
      const patientId = event.row.id;
      this.router.navigate([`/paciente/${patientId}`]);
    }
  }

  // public removeAcentos(newStringComAcento: string): string {
  //   if (!newStringComAcento) {
  //     return "";
  //   } else if (newStringComAcento === null) {
  //     alert("Campo descrição nulo");
  //   }

  //   let str = newStringComAcento;

  //   const mapaAcentosHex = {
  //     a: /[\xE0-\xE6]/g,
  //     A: /[\xC0-\xC6]/g,
  //     e: /[\xE8-\xEB]/g,
  //     E: /[\xC8-\xCB]/g,
  //     i: /[\xEC-\xEF]/g,
  //     I: /[\xCC-\xCF]/g,
  //     o: /[\xF2-\xF6]/g,
  //     O: /[\xD2-\xD6]/g,
  //     u: /[\xF9-\xFC]/g,
  //     U: /[\xD9-\xDC]/g,
  //     c: /\xE7/g,
  //     C: /\xC7/g,
  //     n: /\xF1/g,
  //     N: /\xD1/g,
  //   };

  //   for (const letra in mapaAcentosHex) {
  //     const expressaoRegular = mapaAcentosHex[letra];
  //     str = str.replace(expressaoRegular, letra);
  //   }

  //   return str;
  // }
}
