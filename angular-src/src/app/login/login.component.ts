import { Component } from '@angular/core';
import { CycleService } from '../cycle.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username : string = "";
  password : string = "";
  loginError = false;

  constructor(private cycleService: CycleService, private authService : AuthService, private router: Router) {}
  login(): void{
    this.authService.login(this.username,this.password).subscribe();
    this.router.navigate(['/list-data']);
  }

  // onSubmit() {
  //   this.cycleService.login(this.username, this.password).subscribe({
  //     next: (token: string) => {
  //       // Handle successful login - store the token, redirect, etc.
  //       this.cycleService.saveToken(token);
  //       console.log(token);
  //     },
  //     error: (error) => {
  //       // Handle login error, e.g., display an error message
  //       this.loginError = true;
  //     }
  //   });
  // }
}
