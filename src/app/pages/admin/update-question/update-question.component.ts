import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  public Editor = ClassicEditor;

  constructor(private _route:ActivatedRoute,private _quiz:QuizService, private _question:QuestionService, private _router:Router) { }

  quiz_id = null;
  quiz_title = null;
  question = {
    quiz: {
      quiz_id: null
    },
    ques_id: '',
    ques_content: '',
    ques_image: '',
    ques_option1: '',
    ques_option2: '',
    ques_option3: '',
    ques_option4: '',
    ques_answer: '',
  }


  ngOnInit(): void {
    this.question.ques_id = this._route.snapshot.params['ques_id'];
    this.quiz_title = this._route.snapshot.params['quiz_title'];


    //load selected question
    this._question.getQuestion(this.question.ques_id).subscribe(
      (data:any)=>{
        this.question=data;
        console.log(this.question);
      },
      (error)=>{
        console.log(error);
      }
    );

  }

  public updateQuestionData(){
    this._question.updateQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire('Success !!','Question updated !!','success').then((e)=>{
          this._router.navigate(['admin/view-questions/'+this.question.quiz.quiz_id+'/'+this.quiz_title]);
        });
      },
      (error)=>{
        Swal.fire('Error!!','Error in updating question data!!','error');
        console.log(error);
      }
    );
  }
}
