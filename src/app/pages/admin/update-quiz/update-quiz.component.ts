import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute,) { }

  quiz_id=0;

  ngOnInit(): void {
    this.quiz_id = this._route.snapshot.params['quiz_id'];
    alert(this.quiz_id);
  }

  

}
