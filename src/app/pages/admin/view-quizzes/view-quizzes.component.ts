import { Component, OnInit } from '@angular/core';
import { MatCardModule, MatCard } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-quizzes',
  standalone: true,
  imports: [MatCard, MatCardModule, CommonModule, MatButtonModule, RouterModule, FormsModule],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit {

  quizzes = [{
    qId: 0,
    title: '',
    description: '',
    maxMarks: '',
    noOfQues: ''

  }
  ]

  constructor(private quizService: QuizService, private snackbar: MatSnackBar) {
    console.log("View quizzes component loading...");
  }
  ngOnInit(): void {
    this.quizService.quizzes().subscribe((data: any) => {
      this.quizzes = data;
      console.log("Quizzes fetched from backend: ", this.quizzes);
    }, (error) => {
      console.log(error);
      Swal.fire("Error!", "Error in loading data", "error");
    })
  }

  deleteQuiz(quizId: number) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Captured quizId for delete: ${quizId}`);
        this.quizService.deleteQuiz(quizId).subscribe(() => {
          this.quizzes = this.quizzes.filter((quiz) => quiz.qId !== quizId);
          console.log("Deleted quiz successfully: ", quizId);
          Swal.fire("Success", "Quiz deleted successfully", "success");
        }, (error) => {
          console.error("Error while deleting quiz");
          Swal.fire("Error!", "Error in deleting data", "error");
        })
      }
    });

  }

}
