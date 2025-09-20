import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from "@angular/forms";
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, MatSlideToggleModule, MatSelectModule, FormsModule, MatOptionModule, CommonModule, MatButtonModule],
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories = [{
    cid: 23,
    title: "programming"
  },
  {
    cid: 24,
    title: "Problem Solving"
  }]

  constructor() { }
  ngOnInit(): void {
  }


}
