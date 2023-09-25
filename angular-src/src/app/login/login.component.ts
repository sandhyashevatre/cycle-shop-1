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
}
