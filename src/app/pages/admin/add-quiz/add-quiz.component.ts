import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, NgForm } from "@angular/forms";
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../../services/category.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, MatSlideToggleModule, MatSelectModule, FormsModule, MatOptionModule, CommonModule, MatButtonModule],
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories = [{
    cid: '',
    title: ''
  }]

  quiz = {
    title: '',
    description: '',
    maxMarks: '',
    noOfQues: '',
    active: true,
    category: {
      title: '',
      description: ''
    }
  }

  constructor(private snackbar: MatSnackBar, private categoryService: CategoryService, private quizService: QuizService) { }
  ngOnInit(): void {
    this.categoryService.categories().subscribe((data: any) => {
      this.categories = data;
    }, (error) => {
      console.log("Something went wrong while fetching categories from backend");
      Swal.fire("Error", "Somethng went worng", "error");
    })
  }

  addQuiz(form: NgForm) {
    console.log("Quiz data captured from Quiz form: ", this.quiz)
    if (!this.quiz.title || this.quiz.title.trim() === '') {
      this.snackbar.open("Title is required!", "", { duration: 3000 });
      return;
    }

    this.quizService.addQuiz(this.quiz).subscribe(
      (res) => {
        this.snackbar.open("Quiz added successfully!", "", { duration: 3000 });
        form.resetForm();
      },
      (err) => {
        this.snackbar.open("Failed to add quiz", "", { duration: 3000 });
      }
    );
  }


}
