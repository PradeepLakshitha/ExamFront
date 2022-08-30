import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  quiz_id:any;
  questions:any;

  constructor(private locationSt:LocationStrategy, private _route:ActivatedRoute, private _question:QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.quiz_id = this._route.snapshot.params['quiz_id'];
    console.log(this.quiz_id);

    this.loadQuestions();
  }
  loadQuestions() {
   this._question.getQuestionsOfQuizForTest(this.quiz_id).subscribe(
     (data:any)=>{
       console.log(data);
       this.questions = data;
     },
     (error)=>{
       console.log(error);
       Swal.fire('Error','Error in loading questions of quiz','error');
     }
   );
  }

  preventBackButton(){
    history.pushState(null,'',location.href)
    this.locationSt.onPopState(()=>{
      history.pushState(null,'',location.href);
    });
    ;
  }

}
