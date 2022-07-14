import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  e_Quizzes = [
    {
      quiz_id: '',
      quiz_title: '',
      quiz_description: '',
      quiz_maxMarks: '',
      quiz_numberOfQuestions: '',
      quiz_active: '',
      category: {
        cat_title: '',
      }
    }
  ];

  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {

    this._quiz.e_Quizzes().subscribe(
      (data: any) => {
        this.e_Quizzes = data;
        console.log(this.e_Quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading quizzes !!', 'error');
      }
    );


  }
  //delete quiz
  deleteQuiz(quiz_id: any) {


    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      confirmButtonText: 'Delete Quiz',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this._quiz.deleteQuiz(quiz_id).subscribe((data: any) => {

          this.e_Quizzes = this.e_Quizzes.filter((_quiz) => _quiz.quiz_id != quiz_id);

          Swal.fire('Success', 'Quiz Deleted!!', 'success');
        }, (error) => {
          Swal.fire('Error', 'Error in deleting quiz!!', 'error');
        });


      }
    });

  }

  

}
