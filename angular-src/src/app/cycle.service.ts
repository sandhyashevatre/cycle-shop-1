import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CycleData, CycleRecord } from './cycle.data.interface';
import { CartItem } from './cart-item';

@Injectable({
  providedIn: 'root'
})

export class CycleService {

  private apiUrl = 'http://localhost:8080/api/cycles'; 
  private cartUrl = 'http://localhost:8080/api';
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

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    return this.http.post<string>(`${this.apiUrl}/${data.id}/borrow`, data, { headers: headers });
  }

  returnCycle(data: any): Observable<string> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });

    return this.http.post<string>(`${this.apiUrl}/${data.id}/return`, data, { headers: headers});
  }

  restockCycle(data: any): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    return this.http.post<string>(`${this.apiUrl}/${data.id}/restock`, data, {headers: headers});
  }

  listAvailableCycles(): Observable<CycleRecord[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    console.log(localStorage.getItem('token'));
    return this.http.get<CycleRecord[]>(`${this.apiUrl}/list-data`,{headers : headers});
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  addToCart(cycleId: number,count: number): Observable<any>
  {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    console.log(localStorage.getItem('token'));
    return this.http.post(`${this.apiUrl}/${cycleId}/add-cart?count=${count}`, {}, {headers : headers});
  }
  
  getAllCartItems(): Observable<CartItem[]> { 

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
        console.log(localStorage.getItem('token'));

    return this.http.get<CartItem[]>(`${this.apiUrl}/items`,{headers : headers});
  }

  checkout(): Observable<CartItem[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<CartItem[]>(`${this.apiUrl}/checkout`, {}, { headers: headers });
  }
 
}
