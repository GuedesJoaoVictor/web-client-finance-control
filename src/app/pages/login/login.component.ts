import { Component } from '@angular/core';
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MatCard,
  MatCardActions,
  MatCardContent,} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../core/services/auth.service';
import {UserDTO} from '../../core/dto/user.dto';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatError,
    MatHint,
    MatCard,
    MatCardContent,
    MatButton,
    MatCardActions,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  public form: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService, private readonly router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    if (this.form.valid) {
      const {email, password} = this.form.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful');
          this.authService.setToken(response.token);
          const user: UserDTO = this.authService.getUser()!;
          const portal = user.role === 'ADMIN' ? 'portal-admin' : 'portal-user';
          sessionStorage.setItem("portal-selecionado", portal);
          this.router.navigate([`/${portal}`]).then();
        },
        error: (error) => {
          console.error('Login failed: ', error);
          Swal.fire('Login failed', error.error.error, 'error');
        }
      });
    }
  }

}
