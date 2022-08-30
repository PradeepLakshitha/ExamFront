import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  constructor(private _category: CategoryService, private _snak: MatSnackBar, private _quiz: QuizService) { }


  // quiz_title: '',
  //     quiz_description: '',
  //     quiz_maxMarks: '',
  //     quiz_numberOfQuestions: '',
  //     quizActive: '',
  //     category: {
  //       cat_title: '',
  //     }

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

  addQuiz() {

    if(this.quizData.quiz_title.trim()==''||this.quizData.quiz_title==null){
      this._snak.open('Quiz title is required!!','',{duration:3000,});
      return;
    }
    //validation needs to complete

    //call server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data) => {
        Swal.fire('Success !!', 'Quiz is added successfully', 'success');
        this.quizData = {
          quiz_title: '',
          quiz_description: '',
          quiz_maxMarks: '',
          quiz_numberOfQuestions: '',
          quizActive: true,
          category:
          {
            cat_id: '',
          },
        };
      },
      (error)=>{
        Swal.fire('Error !!', 'Error while adding quiz', 'error');
        console.log(error);
      }
    );

  }

}
