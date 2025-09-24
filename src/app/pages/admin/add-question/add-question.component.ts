import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit {

  qId = 0;
  qTitle = "";
  question = {
    quiz: {
      qId: 0
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  };
  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['quizId'];
    this.question.quiz['qId'] = this.qId;
    this.qTitle = this._route.snapshot.params['quizTitle'];
    console.log("Quiz id and Title:", this.qTitle,this.qId);
  }

}
