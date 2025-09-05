import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: ''
  }

  constructor(private loginService: LoginService, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {

  }

  formSubmit(loginForm: NgForm) {
    console.log("Login form is submitted!")
    console.log("Form Data:", loginForm.value);

    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snackbar.open('Username is required !!', '', {
        duration: 3000,
      });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snackbar.open('Password is required !!', '', {
        duration: 3000,
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe((data: any) => {
      console.log(data)

      //login...
      this.loginService.loginUser(data.token);
      this.loginService.getCurrentUser().subscribe(
        (user:any) => {
          this.loginService.setUser(user);
          console.log(user);

          //redirect ADMIN ..... to admin dashboard
          //redirect NORMAL ..... to normal dashboard
          if(this.loginService.getuserRole()=="ADMIN"){
            console.log("admin-dashboard");
           // window.location.href = '/admin-dashboard'
            this.router.navigate(['admin-dashboard'])
            this.loginService.loginStatusSubject.next(true);
          } else if(this.loginService.getuserRole() == "NORMAL"){
            console.log("normal user-dashboard");
           // window.location.href = '/user-dashboard'
            this.router.navigate(['user-dashboard'])
            this.loginService.loginStatusSubject.next(true);
          } else{
            this.loginService.logout();
          }
        }
      )
    },
      (error) => {
        console.log('Error!');
        console.log(error);
        this.snackbar.open('Invalid details, Please try again!!', '', {
        duration: 3000,
      });
      });
  }
}
