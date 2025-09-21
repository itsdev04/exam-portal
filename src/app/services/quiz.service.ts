import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient) {
  }

  public quizzes() {

    return this._http.get(`${baseUrl}/quiz/`);
  }

  public addQuiz(quiz: any) {
    console.log("Sending quiz data to backend api: ", quiz);
    return this._http.post(`${baseUrl}/quiz/`, quiz);
  }

  public deleteQuiz(quizId: number) {
    console.log("Sending quizId to backend for delete: ", quizId);
    return this._http.delete(`${baseUrl}/quiz/${quizId}`);
  }

  public getQuizById(quizId: number) {
    console.log("Getting quiz from backend", quizId);
    return this._http.get(`${baseUrl}/quiz/${quizId}`);
  }

  public updateQuiz(quiz: any): Observable<any> {
    console.log("Sending request to update quiz in backend", quiz);
    return this._http.put(`${baseUrl}/quiz/`, quiz)
  }
}
