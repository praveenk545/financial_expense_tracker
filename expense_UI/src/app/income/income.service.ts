import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http:HttpClient) { }
  apirUrlIncome="http://localhost:3000/income";

 token:any="";
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  });
  post(value:any):any{
   return this.http.post<any>(`${this.apirUrlIncome}`,value,{headers:this.headers})
  }
  get(){
   return this.http.get<any>(`${this.apirUrlIncome}`,{headers:this.headers})
  }
}
