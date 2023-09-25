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


    return this.http.post<string>(`${this.apiUrl}/${data.id}/borrow`, data, { headers: this.getHeader() });
  }

  returnCycle(data: any): Observable<string> {
    
    return this.http.post<string>(`${this.apiUrl}/${data.id}/return`, data, { headers: this.getHeader() });
  }

  restockCycle(data: any): Observable<string> {

    return this.http.post<string>(`${this.apiUrl}/${data.id}/restock`, data, {headers: this.getHeader() });
  }

  listAvailableCycles(): Observable<CycleRecord[]> {

    return this.http.get<CycleRecord[]>(`${this.apiUrl}/list-data`,{headers : this.getHeader()});
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  addToCart(cycleId: number,count: number): Observable<any>
  {

    return this.http.post(`${this.apiUrl}/${cycleId}/add-cart?count=${count}`, {}, {headers : this.getHeader()});
  }
  
  getAllCartItems(): Observable<CartItem[]> { 

    return this.http.get<CartItem[]>(`${this.apiUrl}/items`,{headers : this.getHeader()});
  }

  checkout(): Observable<CartItem[]> {

    return this.http.post<CartItem[]>(`${this.apiUrl}/checkout`, {}, { headers: this.getHeader() });
  }

  removeFromCart(cycleId: number, quantity: number): Observable<any> {

   return this.http.post(`${this.apiUrl}/${cycleId}/remove-cart?quantity=${quantity}`, {}, { headers: this.getHeader() ,responseType: 'text'});
  }
 
  getHeader()
  {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return headers;
  }

  hasRole(role: string): boolean {
    const userRole = localStorage.getItem('role');
    return userRole === role;
  }
}
