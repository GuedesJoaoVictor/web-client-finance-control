import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {env} from '../../enviroment/env';
import {UserDTO} from '../dto/user.dto';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = `${env.api}/user`

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  findAll() {
    return this.http.get<UserDTO[]>(`${this.baseUrl}/find-all`);
  }
}
