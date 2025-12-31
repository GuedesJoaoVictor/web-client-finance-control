import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {env} from '../../enviroment/env';
import {UserDTO} from '../dto/user.dto';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private readonly baseUrl = `${env.api}/user`

  constructor(private readonly http: HttpClient) {}

  findAll() {
    return this.http.get<UserDTO[]>(`${this.baseUrl}/find-all`);
  }
}
