import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelectModule } from "@angular/material/select";
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule, MatOption],
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
  constructor(private _route: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['quizId'];
    this.question.quiz['qId'] = this.qId;
    this.qTitle = this._route.snapshot.params['quizTitle'];
    console.log("Quiz id and Title:", this.qTitle,this.qId);
  }

  formSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      return;
    }

    //form submit
    this.questionService.addQuestion(this.question).subscribe(
      (data: any) => {
        console.log("Question added successfully");
        Swal.fire('Success', 'Question added successfully', 'success');
        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';
      },
      (error: any) => {
        console.log("Error in adding question",error);
        Swal.fire('Error', 'Error in adding question', 'error');
      }
    )
  }

}
