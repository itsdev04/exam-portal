import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import baseUrl from './helper';
import { RegisterUser } from '../data-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  registerUser(user:RegisterUser):Observable<RegisterUser>{
    return this.httpClient.post<RegisterUser>(`${baseUrl}/user/`,user);
  }
}
