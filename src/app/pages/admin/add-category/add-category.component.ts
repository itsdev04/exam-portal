import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-add-category',
  imports: [MatInput, FormsModule, MatCardModule, MatFormFieldModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

}
