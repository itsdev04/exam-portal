import { Component, OnInit } from '@angular/core';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatButton } from "@angular/material/button";
import { LoginService } from '../../services/login.service';
import { RegisterUser } from '../../data-type';
import { CommonModule, JsonPipe } from '@angular/common';


@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatCardContent, MatTableModule, MatButton, JsonPipe, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  

user: RegisterUser | null = null;

  constructor(private loginService: LoginService){}
ngOnInit(): void {
  this.user = this.loginService.getUser(); //used to fetch data from localstorage

  //Now data will be fetched from server
  // this.loginService.getCurrentUser().subscribe((user:any) => {
  //   this.user = user;
  // },(error)=>{
  //   alert("Something went wrong while fetching current-user")
  // })

  }

  get userRole(): string {
  return this.user?.authorities?.[0]?.authority ?? 'N/A';
}

}
