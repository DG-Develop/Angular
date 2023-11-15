import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateUserDTO, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = `${environment.API_URL}/api/v1/users`

  constructor(private httpService: HttpClient) { }

  create(dto: CreateUserDTO) {
    return this.httpService.post<User>(this.apiUrl, dto);
  }

  getAll() {
    return this.httpService.get<User[]>(this.apiUrl);
  }
}
