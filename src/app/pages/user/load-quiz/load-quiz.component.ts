import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _quiz: QuizService) { }

  // categories = [
  //   {
  //     cat_id: '',
  //     cat_title: '',
  //   }
  // ];

  cat_Id = 0;

  quizData = [
    {
      quiz_title: '',
      quiz_description: '',
      quiz_maxMarks: '',
      quiz_numberOfQuestions: '',
      quiz_active: true,
      category:
      {
        cat_id: '',
      },
    }
  ];

  public pageSlice:any;

  ngOnInit(): void {
    this.cat_Id = this._route.snapshot.params['catId'];
    if (this.cat_Id == 0) {

      this._quiz.e_Quizzes().subscribe((data: any) => {
        this.quizData = data;
        console.log(this.quizData);
        this.pageSlice = this.quizData.slice(0, 6);
      });

    } else {
      console.log('load spec');
    }
  }

  OnPageChange(event: PageEvent) {
    console.log(event);

    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.quizData.length) {
      endIndex = this.quizData.length;
    }
    this.pageSlice = this.quizData.slice(startIndex,endIndex);
  }

}
