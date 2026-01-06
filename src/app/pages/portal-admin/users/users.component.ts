import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../../core/services/user.service';
import { UserDTO } from '../../../core/dto/user.dto';
import Swal from 'sweetalert2';
import {CommonModule} from '@angular/common';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  imports: [MatTableModule, CommonModule]
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'cpf', 'role'];

  users = new MatTableDataSource<UserDTO>();

  constructor(private readonly userService: UserService, private readonly loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.show = true;
    this.userService.findAll().subscribe({
      next: (users) => {
        this.users.data = users;
        this.loadingService.show = false;
      },
      error: () => {
        Swal.fire('Error', 'We can\'t find users', 'error').then();
        this.loadingService.show = false;
      }
    });
  }
}
