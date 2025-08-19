import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule, JsonPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: ''
  }
  ngOnInit(): void {
  }

  formSubmit(registerForm: NgForm): any {
    console.log("Form submitted ", registerForm.value);
    console.log(JSON.stringify(registerForm.value));
  }

  handleRegsister(): any {
    console.log("Clicked on Register")
  }

}
