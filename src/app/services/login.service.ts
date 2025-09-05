import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import baseUrl from './helper';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { RegisterUser } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //constructor(private httpClient: HttpClient) { }

  public loginStatusSubject = new Subject<boolean>();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private httpClient: HttpClient) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public getCurrentUser() {
    return this.httpClient.get(`${baseUrl}/current-user`);
  }

  //generate token
  public generateToken(loginData: any) {
    return this.httpClient.post(`${baseUrl}/generate-token`, loginData);
  }

  //store or set token in local storage
  public loginUser(token: string) {
    localStorage.setItem('token', token);
    return true;
  }

  //isUserLoggedIn to check token is available in local storage
  // public isUserLoggedIn() {
  //   let token = localStorage.getItem("token")
  //   if (token == undefined || token == '' || token == null) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  public isUserLoggedIn(): boolean {
    // Only access localStorage if the code is running in a browser
    if (this.isBrowser) {
      let token = localStorage.getItem("token");
      if (token == undefined || token == '' || token == null) {
        return false;
      } else {
        return true;
      }
    }
    // Return false for server-side rendering
    return false;
  }

  //remove token from local storage - logout
  public logout(): boolean {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return true;
  }

  //get token from local storage
  public getToken() {
    return localStorage.getItem('token');
  }

  //set user detail from local storage so that it does make backend call again and again
  public setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

 public getUser(): RegisterUser | null {
  if (typeof window !== 'undefined') {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: RegisterUser = JSON.parse(userJson);
      console.log("[LoginService] getUser - username:", user.username);
      return user;
    }
  }
  return null;
}


  //get user role
  public getuserRole(): string | null {
    const user = this.getUser();
    if (user && user.authorities && user.authorities.length > 0) {
      return user.authorities[0].authority;
    }
    return null;
  }

}
