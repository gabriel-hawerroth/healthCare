import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UsersListComponent } from './components/users-list/users-list.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user/user.service';
import { UtilsService } from '../../../utils/utils.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    UsersListComponent,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuariosComponent implements OnInit, OnDestroy {
  filterForm!: FormGroup;

  users: User[] = [];
  filteredUsers = signal<User[]>([]);

  private _unsubscribeAll: Subject<any>;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      email: '',
      situacao: 'A',
      acesso: '',
    });

    this.listaUsuarios();

    this.filterForm.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.filterList();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
  }

  listaUsuarios() {
    this.userService.getUsers().then((result) => {
      this.users = result;
      this.filteredUsers.set(result);
      this.filterList();
    });
  }

  editUser(event: any) {
    if (event.type == 'click') {
      const userId = event.row.id;
      this.router.navigate([`/usuario/${userId}`]);
    }
  }

  filterList() {
    let rows = this.users.slice();
    const email = this.filterForm.get('email')!.value;
    const situacao = this.filterForm.get('situacao')!.value;
    const acesso = this.filterForm.get('acesso')!.value;

    if (email) rows = this.utilsService.filterList(rows, 'email', email);

    if (situacao)
      rows = this.utilsService.filterList(rows, 'situacao', situacao);

    if (acesso) rows = this.utilsService.filterList(rows, 'acesso', acesso);

    this.filteredUsers.set(rows);
  }
}
