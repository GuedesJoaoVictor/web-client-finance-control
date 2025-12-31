import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from "@angular/material/input";
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: '../login/login.component.css',
})
export class RegisterComponent {

  public form: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService, private readonly router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      cpf: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onCpfInput(){
    const control = this.form.get('cpf');
    if (!control) return;
    let value = control.value || '';
    value = value.replaceAll(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    control.setValue(value, { emitEvent: false });
  }

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
