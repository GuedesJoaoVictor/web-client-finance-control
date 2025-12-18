import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from "@angular/material/input";
import {AuthService} from '../core/services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-component',
    imports: [
        FormsModule,
        MatButton,
        MatCard,
        MatCardActions,
        MatCardContent,
        MatError,
        MatFormField,
        MatHint,
        MatInput,
        MatLabel,
        ReactiveFormsModule
    ],
  templateUrl: './register-component.html',
  styleUrl: '../login-component/login-component.css',
})
export class RegisterComponent {

  public form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      cpf: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  // validCpf(event: Event) {
  //   let cpfPontuado = event.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  // }

  submit() {
    if (this.form.valid) {
      const {name, email, cpf, password} = this.form.value;
      const user = {
        name,
        email,
        cpf,
        password
      }

      this.authService.register(user).subscribe({
        next: (response) => {
          console.log('Register successful');
          this.router.navigate(['/login']).then();
        },
        error: (error) => {
          console.error('Login failed: ', error);
          Swal.fire('Erro ao cadastrar', error.error.message, 'error');
        }
      });
    }
  }

}
