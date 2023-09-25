import { Component } from '@angular/core';
import { CycleService } from '../cycle.service';
import { Router } from '@angular/router';
import { REMOVE_STYLES_ON_COMPONENT_DESTROY } from '@angular/platform-browser';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private logoutService: CycleService, private router : Router) {}

  logout() {
    this.logoutService.clearToken();
    this.router.navigate(['/login']);
  }
  
}
