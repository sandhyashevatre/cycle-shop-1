import { Component } from '@angular/core';
import { CycleService } from '../cycle.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';
  loginError = false;

  constructor(private cycleService: CycleService) {}

  onSubmit() {
    this.cycleService.login(this.username, this.password).subscribe(
      (token: string) => {
        // Handle successful login - store the token, redirect, etc.
        this.cycleService.saveToken(token);
        console.log(token);
      },
      (error) => {
        // Handle login error, e.g., display an error message
        this.loginError = true;
      }
    );
  }
}
