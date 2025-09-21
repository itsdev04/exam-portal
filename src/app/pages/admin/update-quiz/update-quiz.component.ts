import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
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

@Component({
  selector: 'app-update-quiz',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, MatSlideToggleModule, MatSelectModule, FormsModule, MatOptionModule, CommonModule, MatButtonModule],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit {

  qId = 0;

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
  constructor(private _route: ActivatedRoute, private quizService: QuizService, private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['quizId'];
    this.quizService.getQuizById(this.qId).subscribe((data: any) => {
      this.quiz = data;
      console.log("Quiz fetched from quizService", this.quiz);
    }, (error) => {
      console.log("error occurred", error);
    });

    this.categoryService.categories().subscribe((data: any) => {
      this.categories = data;
    }, (error) => {
      alert("Error in loading category");
    });
  }

  updateQuiz(form: NgForm){
    console.log("Captured form data for updating quiz", form);
    this.quizService.updateQuiz(this.quiz).subscribe((data: any)=>{
      Swal.fire("Success!!","Quiz updated successfully", 'success').then((e)=>{
        this.router.navigate(['/admin-dashboard/quizzes']);
      });
    },(error)=>{
      Swal.fire("Error","error in updating quiz", 'error');
      console.log(error);
    });
  }

}
