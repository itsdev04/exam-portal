import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient) { }

  getQuestionsByQuizId(quizId: number) {
    return this.httpClient.get(`${baseUrl}/question/quiz/all/${quizId}`);
  }
  
  addQuestion(question: any) {
    console.log("Sending question data to backend:", question);
    return this.httpClient.post(`${baseUrl}/question/`, question);
  }
  
  deleteQuestion(questionId: number) {
    return this.httpClient.delete(`${baseUrl}/question/${questionId}`);
  }

}
