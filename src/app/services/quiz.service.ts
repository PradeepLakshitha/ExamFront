import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }


  public e_Quizzes(){
    return this._http.get(`${baseUrl}/quiz/`);
  }

  //add quiz
  public addQuiz(quiz:any){
    return this._http.post(`${baseUrl}/quiz/`,quiz);
  }

  //delete quiz
  public deleteQuiz(quiz_id:any){
    return this._http.delete(`${baseUrl}/quiz/${quiz_id}`);
  }

  // get the single quiz
  public getQuiz(quiz_id:any){
    return this._http.get(`${baseUrl}/quiz/${quiz_id}`);
  }

  //update quiz
  public updateQuiz(quiz:any){
    return this._http.put(`${baseUrl}/quiz/`,quiz);
  }

  //get quizzess of category
  public getQuizzesOfCategory(cat_Id:any){
    return this._http.get(`${baseUrl}/quiz/category/${cat_Id}`);
  }

  //get active quizzes
  public getActiveQuizzes(){
    return this._http.get(`${baseUrl}/quiz/active`);
  }
  
  //get active quizzes of category
  public getActiveQuizzesfCategory(cat_Id:any){
    return this._http.get(`${baseUrl}/quiz/category/active/${cat_Id}`);
  }
}
