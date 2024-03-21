import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from '../../../../../interfaces/user';
import { UserService } from '../../../../../services/user/user.service';
import { ConfirmationDialogComponent } from '../../../../../utils/confirmation-dialog/confirmation-dialog.component';
import { UtilsService } from '../../../../../utils/utils.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  userId: number | null =
    +this.activatedRoute.snapshot.paramMap.get('id')! || null;
  userData?: User | null;

  userForm!: FormGroup;
  user?: User;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.buildForm();

    if (this.userId) {
      this.userService.getById(this.userId).then((result) => {
        this.userData = result;
        this.userForm.patchValue(this.userData);
        this.userForm.get('senha')?.setValue('');
      });
    }
  }

  buildForm() {
    this.userForm = this.fb.group({
      id: '',
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.pattern(this.utilsService.passwordValidator())],
      nome: ['', [Validators.required]],
      sobrenome: '',
      acesso: ['Consulta', [Validators.required]],
      situacao: 'A',
      canChangePassword: false,
    });
  }

  newUser() {
    if (this.userForm.invalid) {
      for (const controlName in this.userForm.controls) {
        if (this.userForm.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      return;
    }

    this.userService
      .newUser(this.userForm.value)
      .then(() => {
        this.utilsService.showSimpleMessage(
          'Usuário criado com sucesso.',
          4000
        );
        this.router.navigate(['/usuario']);
      })
      .catch(() => {
        this.utilsService.showSimpleMessage(
          'Erro ao salvar as informações.',
          4500
        );
      });
  }

  editUser() {
    if (this.userForm.invalid) {
      for (const controlName in this.userForm.controls) {
        if (this.userForm.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      return;
    }

    this.userService
      .editUser(this.userForm.value)
      .then(() => {
        this.utilsService.showSimpleMessage('Usuário salvo com sucesso.', 4000);
        this.router.navigate(['/usuario']);
      })
      .catch((error) => {
        console.log(error);
        this.utilsService.showSimpleMessage(
          'Erro ao salvar as informações.',
          4500
        );
      });
  }

  removeUser() {
    this.userService
      .removeUser(this.userId!)
      .then(() => {
        this.utilsService.showSimpleMessage(
          'Usuário removido com sucesso.',
          4500
        );
        this.router.navigate(['/usuario']);
      })
      .catch(() => {
        this.utilsService.showSimpleMessage(
          'Não foi possível excluir o usuário.',
          4500
        );
      });
  }

  openConfirmationDialog(): void {
    lastValueFrom(
      this.dialog.open(ConfirmationDialogComponent).afterClosed()
    ).then((result) => {
      if (result === true) {
        this.removeUser();
      }
    });
  }
}
