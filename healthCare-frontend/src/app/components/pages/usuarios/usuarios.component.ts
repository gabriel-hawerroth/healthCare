import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject, lastValueFrom, takeUntil } from 'rxjs';

import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  @Output() edit = new EventEmitter(false);

  filterForm!: FormGroup;
  users: User[] = [];
  filteredUsers: BehaviorSubject<User[]>;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {
    this.filteredUsers = new BehaviorSubject<User[]>([]);
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
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }

  listaUsuarios() {
    lastValueFrom(this.userService.getUsers()).then((result) => {
      this.users = result;
      this.filteredUsers.next(result);
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

    this.filteredUsers.next(rows);
  }
}
