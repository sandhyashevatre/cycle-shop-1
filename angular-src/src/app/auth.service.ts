import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  authUrl = 'http://localhost:8080/api/auth';
  private jwt: string = '';

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/token`,{username:username, password:password}).pipe(
      tap(res => {
        localStorage.setItem('token', res['token']);
        localStorage.setItem('username', res['username']);
        this.jwt = res['token'];
        let jwtData = this.jwt.split('.')[1]
        let decodedJwtJsonData = window.atob(jwtData)
        let decodedJwtData = JSON.parse(decodedJwtJsonData)
        let role = decodedJwtData.scope
        console.log('jwtData: ' + jwtData)
        console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
        console.log('decodedJwtData: ' + decodedJwtData)
        console.log('Is admin: ' + role)   
        localStorage.setItem('role', role)     
      })

      
    );

  } 



}
