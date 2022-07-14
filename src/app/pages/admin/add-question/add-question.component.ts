import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
      quiz_id:null
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

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {

    this.quiz_id = this._route.snapshot.params['quiz_id'];
    this.question.quiz['quiz_id'] = this.quiz_id;
    this.quiz_title=this._route.snapshot.params['quiz_title'];

  }

}
