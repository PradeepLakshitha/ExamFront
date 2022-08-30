import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  

  constructor(private _route: ActivatedRoute, private _quiz: QuizService, private _matSnak:MatSnackBar) { }

  // categories = [
  //   {
  //     cat_id: '',
  //     cat_title: '',
  //   }
  // ];

  cat_Id = 0;

  quizData = [
    {
      quiz_id:0,
      quiz_title: '',
      quiz_description: '',
      quiz_maxMarks: '',
      quiz_numberOfQuestions: '',
      quizActive: true,
      category:
      {
        cat_id: '',
      },
    }
  ];

  public pageSlice:any;

  ngOnInit(): void {
    

    this._route.params.subscribe((params)=>{
      this.cat_Id = params['catId'];

      if (this.cat_Id == 0) {

        this._quiz.getActiveQuizzes().subscribe((data: any) => {
          this.quizData = data;
          console.log(this.quizData);
          this.pageSlice = this.quizData.slice(0, 6);
        });
  
      } else {
        console.log('load spec');
        

        this._quiz.getActiveQuizzesfCategory(this.cat_Id).subscribe(
          (data:any)=>{
            this.quizData = data;  
            this.pageSlice = this.quizData.slice(0, 6);
          },
          (error)=>{
            this._matSnak.open('Error loading quiz data from server','',{
              duration:3000,
            });
          }
        );


      }
    });

    
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
