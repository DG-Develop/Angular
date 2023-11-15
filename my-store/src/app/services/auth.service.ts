import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/v1/auth`

  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private httpService: HttpClient, private tokenService: TokenService) { }

  login(email: string, password: string) {
    return this.httpService.post<Auth>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => this.tokenService.saveToken(response.access_token)),
      )
  }

  getProfile() {
    // let headers = new HttpHeaders
    // headers = headers.set('Authorization', `Bearer ${token}`)

    return this.httpService.get<User>(`${this.apiUrl}/profile`)
      .pipe(
        tap(user => this.user.next(user))
      )
  }

  loginAndGet(email: string, password: string){
    return this.login(email, password)
      .pipe(
        switchMap(() => this.getProfile())
      )
  }

  logout(){
    this.tokenService.removeToken();
  }
}
