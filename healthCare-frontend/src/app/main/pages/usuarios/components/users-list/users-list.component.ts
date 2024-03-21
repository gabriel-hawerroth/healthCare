import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { User } from '../../../../../interfaces/user';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgxDatatableModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  usersList = input.required<User[]>();
  onClickRow = output<any>();
}
