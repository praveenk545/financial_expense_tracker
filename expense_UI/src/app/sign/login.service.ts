import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  registerUser="http://localhost:3000/register/register";
  registerAuthStatus="http://localhost:3000/register/authstatus";
  userlogin= "http://localhost:3000/register/login";
  userlogout="http://localhost:3000/register/logout";
  Token:any='eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVAZ21haWwuY29tIiwiaWQiOjQsImlhdCI6MTcyMjY2NjcyOSwiZXhwIjoxNzIyNzUzMTI5fQ.eT9I_W6GHc3GJrlwt--VCP3Wh8I6F1V6_J0110j1IH3kmjo7ICoafBv7Medqbkj6glN6Fn-xJi-oR-m4-sajzw';
  login(loginData: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.userlogin}`, loginData, { headers:headers });
  }
}
