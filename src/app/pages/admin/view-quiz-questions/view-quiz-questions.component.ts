import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { MatCard, MatCardModule } from "@angular/material/card";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider'; 

@Component({
  selector: 'app-view-quiz-questions',
  standalone: true,
  imports: [MatCard, MatCardModule, CommonModule, MatButtonModule, MatDividerModule],
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId = 0;
  qTitle = "";
  questions = [{
    content: "",
    image: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    quiz: {
      qId: 0
    }
  }];

  constructor(private _route: ActivatedRoute,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['quizId'];
    this.qTitle = this._route.snapshot.params['quizTitle'];

    this.questionService.getQuestionsByQuizId(this.qId).subscribe(
      (data: any) => {
        this.questions = data;
        console.log("Fetched Questions:", this.questions);
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

}
