import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from "@angular/material/input";
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-category',
  imports: [MatInput, FormsModule, MatCardModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit{

  category = {
    'title':'',
    'description': ''
  }
  constructor(private snackbar: MatSnackBar, private categoryService: CategoryService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  formSubmit(){
    if(this.category.title.trim()=='' || this.category.title == null){
      this.snackbar.open("Title is required!!","",{
        duration: 3000
      });
      return;
    }

    this.categoryService.addCategory(this.category).subscribe((data:any) =>{
      this.category.title='';
      this.category.description='';
      Swal.fire("Success","Category is added successfully", "success");
    },
  (error) =>{
    console.log("Error occurred while adding category");
    Swal.fire("Error","Internal Server Error", "error");
  })
  }

}
