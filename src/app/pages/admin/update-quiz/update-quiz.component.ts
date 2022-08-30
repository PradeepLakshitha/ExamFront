import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute, private _quiz:QuizService,private _category:CategoryService, private _router:Router) { }

  quiz_id=0;

  categories = [
    {
      cat_id: '',
      cat_title: '',
    }
  ];

  quizData = {
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

  ngOnInit(): void {
    this.quiz_id = this._route.snapshot.params['quiz_id'];
    //alert(this.quiz_id);


    this._quiz.getQuiz(this.quiz_id).subscribe(
      (data:any)=>{
        this.quizData = data;
        console.log(this.quizData);
      },
      (error)=>{
        console.log(error);
      }
    );

    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);

      },
      (error) => {
        console.log(error);
        Swal.fire('Error!!', 'Error in Loading categories', 'error');
      }
    );

  }
  //update form submit
  public updateQuizData(){

    //validate
    this._quiz.updateQuiz(this.quizData).subscribe(
      (data)=>{
        Swal.fire('Success !!', 'Quiz updated','success').then((e)=>{
          console.log(this.quizData.quizActive+' PPPPPPPPPPPPPPPP');
          
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error)=>{
        Swal.fire('Error','Error in updating quiz','error');
        console.log(error);
      }
    );
  }
  

}
