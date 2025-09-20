import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import { MatCardModule, MatCard } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  imports: [MatCard, MatCardModule, CommonModule],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit {

  quizzes = [{
    title: '',
    description: '',
    maxMarks: '',
    noOfQues: ''

  }

  ]

  constructor(private quizService: QuizService) {
    console.log("View quizzes component loading...");
  }
  ngOnInit(): void {
    this.quizService.quizzes().subscribe((data: any) => {
      this.quizzes = data;
      console.log("Quizzes fetched frommbackend: ", this.quizzes);
    }, (error) => {
      console.log(error);
      Swal.fire("Error!", "Error in loading data", "error");
    })
  }


}
