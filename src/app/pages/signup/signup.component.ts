import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private _snackBar: MatSnackBar) { }

  public user = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

  }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log(this.user);
    if (this.user.userName == '' || this.user.userName == null) {
      //alert("User name is required!!!!");
      this._snackBar.open("Username is required!!", "",
        {
          duration: 3000,
        });
      return;
    }
    //Validate ????

    //addUser : userService
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        //success
        console.log(data);
        //alert("Success");
         Swal.fire('Registration is done!!','User ID is '+data.id,'success');
      },
      (error) => {
        //error
        console.log(error);
        //alert("Error");
        this._snackBar.open("Something Went Wrong!!!", "", 
        {
          duration: 3000,
        });
      }
    );

  }
}
