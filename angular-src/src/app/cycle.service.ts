import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CycleData, CycleRecord } from './cycle.data.interface';


@Injectable({
  providedIn: 'root'
})

export class CycleService {

  private apiUrl = 'http://localhost:8080/api/cycles'; 
  private tokenKey: string = 'auth-token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    const loginbody = {
      'username': username,
      'password': password
    }
    return this.http.post('http://localhost:8080/api/auth/token', loginbody,{ responseType : 'text'});
  }

  borrowCycle(data: CycleData): Observable<string> {
    return this.http.post(`${this.apiUrl}/${data.id}/borrow`, data, { responseType : 'text'});
  }

  returnCycle(data: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/${data.id}/return`, data, { responseType : 'text'});
  }

  restockCycle(data: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/${data.id}/restock`, data, { responseType : 'text'});
  }

  listAvailableCycles(): Observable<CycleRecord[]> {
    // this.tokenKey = this.getToken();
    console.log(this.getToken());
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    
    return this.http.get<CycleRecord[]>(`${this.apiUrl}/list-data`,{headers : headers,responseType :'json'});
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }
}
