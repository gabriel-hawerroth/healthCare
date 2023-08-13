import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, lastValueFrom } from 'rxjs';

import { User } from 'src/app/User';
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

  subscriptions!: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      usuario: [''],
      situacao: ['A'],
      acesso: [''],
    });

    this.subscriptions = this.filterForm.valueChanges.subscribe(() => {
      this.listaUsuarios();
    });

    this.listaUsuarios();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  listaUsuarios() {
    const usuario = this.filterForm.get('usuario')?.value.toLowerCase();
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
