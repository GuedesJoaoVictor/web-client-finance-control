import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {env} from '../../enviroment/env';
import {UserDTO} from '../dto/user.dto';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  private baseUrl = `${env.api}/auth`

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) {}

  login(email: string, password: string) {
    return this.httpClient.post<any>(`${this.baseUrl}/login`, { email, password });
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    const user = this.userFromToken(token);
    if (user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } else {
      console.error('User not found in token');
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLogged(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !!token && token.split('.').length === 3;
  }

  getUser(): UserDTO | null {
    const raw = localStorage.getItem(this.USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserDTO;
    } catch {
      return null;
    }
  }

  private userFromToken(token: string) {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }

      const payload = parts[1];
      if (!payload) {
        return null;
      }

      const base64 = payload
        .replace(/-/g, '+')
        .replace(/_/g, '/');
      const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
      const decodedJson = atob(padded);
      const decoded = JSON.parse(decodedJson);

      return {
        uuid: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      } as UserDTO;

    } catch (e) {
      console.error('Erro ao decodificar token:', e);

      try {
        const parts = token.split('.');
        const payload = parts[1];
      } catch (debugError) {
        console.error('Erro no debug:', debugError);
      }

      return null;
    }
  }

  getUserId(): string | null {
    const user = this.getUser();
    return user?.id || null;
  }

  getUserEmail(): string | null {
    const user = this.getUser();
    return user?.email || null;
  }

  getUserName(): string | null {
    const user = this.getUser();
    return user?.name || null;
  }

  redirect() {
    this.route.queryParams.subscribe(params => {
      const returnUrl = params['returnUrl'] || '/home';
      this.router.navigateByUrl(returnUrl);
    });
  }
}
