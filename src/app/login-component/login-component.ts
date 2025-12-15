import { Component } from '@angular/core';
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDivider} from '@angular/material/list';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../core/services/auth.service';

@Component({
  selector: 'app-login-component',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatError,
    MatHint,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatCardActions
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

  public form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
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
        },
        error: (error) => {
          console.error('Login failed: ', error);
        }
      });
    }
  }

}
