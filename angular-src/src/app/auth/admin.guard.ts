import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRole = localStorage.getItem('role');

    if (userRole === 'ROLE_ADMIN') {
      return true; // Allow access to the route for users with the 'admin' role
    } else {
      // Redirect or show an error page for users without the 'admin' role
      this.router.navigate(['/access-denied']);
      return false; // Deny access
    }
  }
}
