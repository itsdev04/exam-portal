import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatList } from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import { CategoryService } from '../../../services/category.service';
import { error } from 'console';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-categories',
  imports: [MatCardModule, MatList, MatIcon,MatListModule,CommonModule],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent implements OnInit{
  
  categories = [
    {
      "cid":1,
      "title":"Programming",
      "description":"This is programming caterotye"}
    // },{
    //   "cid":1,
    //   "title":"Bihar GK",
    //   "description":"This is programming caterotye"
    // },{
    //   "cid":1,
    //   "title":"Socail Scien",
    //   "description":"This is programming caterotye"
    // },{
    //   "cid":1,
    //   "title":"Food",
    //   "description":"This is programming caterotye"
    // },{
    //   "cid":1,
    //   "title":"Tour and Travel",
    //   "description":"This is programming caterotye"
    // },
  ]

  constructor(private categoryService: CategoryService){

  }
  ngOnInit(): void {
    this.categoryService.categories().subscribe((data:any)=>{
      this.categories = data;
      console.log("View categories response from backend", this.categories);
    },(error)=>{
      console.log("Error while fecthng categories");
      Swal.fire('Error!', 'Error in loading data', error)
    });
  }
}
