import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionsOfQuiz(quiz_id:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${quiz_id}`);
  }

  //add question
  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/question/`,question);
  }

  //update question
  public updateQuestion(question:any){
    return this._http.put(`${baseUrl}/question/`,question);
  }

  //get single question
  public getQuestion(ques_id:any){
    return this._http.get(`${baseUrl}/question/${ques_id}`);
  }

  //delete question
  public deleteQuestion(ques_id:any){
    return this._http.delete(`${baseUrl}/question/${ques_id}`);
  }
}
