import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../../core/services/user.service';
import { UserDTO } from '../../../core/dto/user.dto';
import Swal from 'sweetalert2';
import {CommonModule} from '@angular/common';

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.findAll().subscribe({
      next: (users) => {
        this.users.data = users;
      },
      error: () => {
        Swal.fire('Error', 'We can’t find users', 'error');
      }
    });
  }
}
