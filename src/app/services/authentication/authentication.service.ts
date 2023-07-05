import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from 'src/app/interfaces/client';
import { IUser } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly api = environment.API_URL;

  constructor(private http: HttpClient) {}

  login(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.api}/auth/login`, user);
  }

  signUp(client: IClient): Observable<any> {
    console.log(client);
    return this.http.post<IClient>(`${this.api}/auth/sign-up`, client);
  }
}
