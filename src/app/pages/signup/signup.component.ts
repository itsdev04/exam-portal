import { Component, inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { RegisterUser } from '../../data-type';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  public user: RegisterUser = {
    id:'',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    enabled:''
  };

  constructor(private userService: UserService, private snackbar: MatSnackBar) { }
  ngOnInit(): void {
  }

  formSubmit(registerForm: NgForm): any {
    console.log("Form submitted ", registerForm.value);
    console.log(JSON.stringify(registerForm.value));

    this.userService.registerUser(this.user).subscribe((data: RegisterUser) => {
      console.log(data);
      Swal.fire({
        title: 'Success!',
        text: `User "${data.username}" registered successfully.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    },
      (error) => {
        console.log(error);
        this.snackbar.open('Something went wrong!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      });
  }

  handleRegsister(): any {
    console.log("Clicked on Register")
  }


}
