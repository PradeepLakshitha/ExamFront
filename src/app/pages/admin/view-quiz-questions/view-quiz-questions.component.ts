import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  quiz_id=null;
  quiz_title=null;
  questions =[
    {
      ques_id: '',
      ques_content: '',
      ques_image: '',
      ques_option1: '',
      ques_option2: '',
      ques_option3: '',
      ques_option4: '',
      ques_answer: '',
    }
  ];

  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService
  ) { }

  ngOnInit(): void {
    this.quiz_id=this._route.snapshot.params['quiz_id'];
    this.quiz_title=this._route.snapshot.params['quiz_title'];
    console.log(this.quiz_title+" "+this.quiz_id);

    this._question.getQuestionsOfQuiz(this.quiz_id).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions=data;
      },
      (error)=>{
        console.log(error);
      }
    );

  }
///quiz/{quizId}
}
