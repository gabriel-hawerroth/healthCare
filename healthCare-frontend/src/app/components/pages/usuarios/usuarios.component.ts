import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, lastValueFrom, takeUntil } from 'rxjs';

import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  @Output() edit = new EventEmitter(false);

  filterForm!: FormGroup;
  filteredUsers!: User[];

  private _unsubscribeAll: Subject<any>;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      email: '',
      situacao: 'A',
      acesso: '',
    });

    this.filterForm.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.listaUsuarios();
      });

    this.listaUsuarios();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }

  listaUsuarios() {
    const usuario = this.filterForm.get('email')?.value.toLowerCase();
    const situacao = this.filterForm.get('situacao')!.value;
    const acesso = this.filterForm.get('acesso')?.value;

    lastValueFrom(this.userService.getUsers(usuario, situacao, acesso)).then(
      (result) => {
        this.filteredUsers = result;
      }
    );
  }

  editUser(event: any) {
    if (event.type == 'click') {
      const userId = event.row.id;
      this.router.navigate([`/usuario/${userId}`]);
    }
  }
}
