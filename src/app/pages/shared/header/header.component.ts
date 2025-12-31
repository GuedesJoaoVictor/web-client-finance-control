import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';
import { WritableSignal } from '@angular/core';
import { UserDTO } from '../../../core/dto/user.dto';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  user: WritableSignal<UserDTO | null>;

  constructor(private readonly authService: AuthService) {
    this.user = this.authService.user;
  }

  logout(): void {
    this.authService.logout();
  }
}
