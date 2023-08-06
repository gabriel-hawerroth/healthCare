import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendimento } from 'src/app/Atendimento';
import { Patient } from 'src/app/Patient';
import { Unidade } from 'src/app/Unidade';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { PatientService } from 'src/app/services/paciente/patient.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';

@Component({
  selector: 'app-atendimento-form',
  templateUrl: './atendimento-form.component.html',
  styleUrls: ['./atendimento-form.component.scss'],
})
export class AtendimentoFormComponent implements OnInit {
  @Input() atendData: Atendimento | null = null;

  atendForm!: FormGroup;
  atend?: Atendimento;
  pageType?: string;

  patients: Patient[] = [];
  units: Unidade[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private atendService: AtendimentoService,
    private patientService: PatientService,
    private unitService: UnidadeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.pageType = this.route.snapshot.paramMap.get('id') || 'Novo';

    this.patientService.getPatients().subscribe((patients: any) => {
      this.patients = patients;
    });

    this.unitService.getUnits().subscribe((units: any) => {
      this.units = units;
    });

    this.atendForm = new FormGroup({
      id: new FormControl(this.atendData ? this.atendData.id : ''),
      id_paciente: new FormControl(
        this.atendData ? this.atendData.id_paciente : '',
        [Validators.required]
      ),
      id_unidade: new FormControl(
        this.atendData ? this.atendData.id_unidade : '',
        [Validators.required]
      ),
      dt_atendimento: new FormControl(
        this.atendData ? this.atendData.dt_atendimento : '',
        [Validators.required]
      ),
      status_atend: new FormControl(
        this.atendData ? this.atendData.status_atend : ''
      ),
      medico_responsavel: new FormControl(
        this.atendData ? this.atendData.medico_responsavel : ''
      ),
      hora_inicio: new FormControl(
        this.atendData ? this.atendData.hora_inicio : ''
      ),
      hora_fim: new FormControl(this.atendData ? this.atendData.hora_fim : ''),
      especialidade: new FormControl(
        this.atendData ? this.atendData.especialidade : ''
      ),
      tipo_atendimento: new FormControl(
        this.atendData ? this.atendData.tipo_atendimento : ''
      ),
      valor_atendimento: new FormControl(
        this.atendData ? this.atendData.valor_atendimento : ''
      ),
      forma_pagamento: new FormControl(
        this.atendData ? this.atendData.forma_pagamento : ''
      ),
      convenio: new FormControl(this.atendData ? this.atendData.convenio : ''),
      nr_carteirinha_convenio: new FormControl(
        this.atendData ? this.atendData.nr_carteirinha_convenio : ''
      ),
    });

    if (this.atendData) {
      this.atendForm.patchValue(this.atendData);
    }
  }

  newAtend() {
    if (this.atendForm.invalid) {
      console.log(this.atendForm.value);
      console.log('Formulário inválido.');
      this.snackBar.open('Não foi possível salvar as informações.', '', {
        duration: 4500,
      });
    } else {
      console.log(this.atendForm.value);
      this.atendService.createAtendimento(this.atendForm.value).subscribe({
        next: (result) => {
          console.log(result);
          this.snackBar.open('Atendimento criado com sucesso.', '', {
            duration: 4000,
          }),
            this.router.navigate(['/atendimento']);
        },
        error: (error) => {
          this.snackBar.open('Não foi possível salvar as informações.', '', {
            duration: 4500,
          });
        },
      });
    }
  }

  editAtend() {
    if (this.atendForm.invalid) {
      console.log('Formulário inválido.');
      this.snackBar.open('Não foi possível salvar as informações.', '', {
        duration: 4500,
      });
    } else {
      console.log(this.atendForm.value);
      this.atendService.updateAtendimento(this.atendForm.value).subscribe({
        next: (result) => {
          this.snackBar.open('Atendimento salvo com sucesso.', '', {
            duration: 4000,
          }),
            this.router.navigate(['/atendimento']);
        },
        error: (error) => {
          this.snackBar.open('Não foi possível salvar as informações.', '', {
            duration: 4500,
          });
        },
      });
    }
  }

  removeAtend() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.atendService.removeAtendimento(id).subscribe({
      next: (result) => {
        this.snackBar.open('Atendimento removido com sucesso.', '', {
          duration: 4500,
        }),
          this.router.navigate(['/atendimento']);
      },
      error: (error) => {
        this.snackBar.open('Não foi possível excluir o atendimento.', '', {
          duration: 4500,
        });
      },
    });
  }
}
