import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    userName: '',
    password: '',
  };

  constructor(private snackBar: MatSnackBar, private login:LoginService, private router:Router) { }

  ngOnInit(): void {
  }
  formSubmit() {
    console.log("Login Button Clicked");

    if (this.loginData.userName.trim() == '' || this.loginData.userName == null) {

      this.snackBar.open("Username is Required !!", '', { duration: 3000 });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {

      this.snackBar.open("Password is Required !!", '', { duration: 3000 });
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log('success');
        console.log(data);

        //login......

        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe((user:any)=>{
          this.login.setUser(user);
          console.log(user);

          //redirect ...ADMIN: admin-dashboard
          //redirect...NORMAL: normal-dashboard

          if(this.login.getUserRole()=='ADMIN'){
            //admin dasgboard
            //window.location.href='/admin';
            this.router.navigate(['admin']);

            this.login.loginStatusSubject.next(true);

          }else if(this.login.getUserRole()=='NORMAL'){
            //normal user dashboard
            //window.location.href='/user-dashboard';
            this.router.navigate(['user-dashboard/0']);
            
            this.login.loginStatusSubject.next(true);
          }else{
            this.login.logoutUser();
          }

        });

      },
      (error:any) => {
        console.log('Error !');
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid Details !!',
          timer: 2000,
        })
      }
    );


  }
}