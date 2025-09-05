import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { RegisterUser } from '../../data-type';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule,
    MatIconModule,
    MatButtonModule, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false
   user: RegisterUser | null = null;

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isUserLoggedIn();
    this.user = this.loginService.getUser();

    this.loginService.loginStatusSubject.asObservable().subscribe((data) => {

      this.isLoggedIn = this.loginService.isUserLoggedIn();
      this.user = this.loginService.getUser();
      console.log("[NavbarComponent] ngOnInit user: ",this.user);

    })
  }

  public logout() {
    this.loginService.logout();
    // this.isLoggedIn = false;
    // this.user = null;
     window.location.reload();
    //this.loginService.loginStatusSubject.next(false);
  }
}
