import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  quiz_id: any;
  cat_Id = 0;

  quizData: any;



  constructor(private _route: ActivatedRoute, private _quiz: QuizService, private _router:Router) { }


  ngOnInit(): void {
    this.quiz_id = this._route.snapshot.params["quiz_id"];
    console.log(this.quiz_id);

    this._quiz.getQuiz(this.quiz_id).subscribe(
      (data: any) => {
        console.log(data);
        this.quizData = data;
      },
      (error) => {
        console.log(error);
        alert('Error in loading data');
      }

    );
  }

  startQuiz(){
    Swal.fire({
      title:'Do you want to start the quiz?',
      showCancelButton: true,
      confirmButtonText:'Start Quiz',
      icon:'info',
    }).then((result)=>{
      if(result.isConfirmed){
        this._router.navigate(['/start/'+this.quiz_id]);
      }
    });
  }

}
