import { Component } from '@angular/core';
import { CycleService } from '../cycle.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private logoutService: CycleService) {}

  logout() {
    this.logoutService.clearToken();
  }
  
}
