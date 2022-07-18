import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

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

  constructor(private _route: ActivatedRoute, private _question: QuestionService) { }

  ngOnInit(): void {

    this.quiz_id = this._route.snapshot.params['quiz_id'];
    this.question.quiz['quiz_id'] = this.quiz_id;
    this.quiz_title = this._route.snapshot.params['quiz_title'];

  }

  formSubmit() {
    if (this.question.ques_content.trim() == '' || this.question.ques_content == null) {
      return;
    }
    if (this.question.ques_option1.trim() == '' || this.question.ques_option1 == null) {
      return;
    }
    if (this.question.ques_option2.trim() == '' || this.question.ques_option2 == null) {
      return;
    }

    //form submit
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire('Success','Question Added!','success');
        this.question.ques_content='';
        this.question.ques_option1='';
        this.question.ques_option2='';
        this.question.ques_option3='';
        this.question.ques_option4='';
        this.question.ques_answer='';
      },
      (error)=>{
        Swal.fire('Error','Error in adding question!!','error');
      }
      
    ); 

  }

}
