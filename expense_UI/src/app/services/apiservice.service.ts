import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient,private snackBar: MatSnackBar) { }
  registerUser="http://localhost:3000/register/register";
  registerAuthStatus="http://localhost:3000/register/authstatus";
  userlogin= "http://localhost:3000/register/login";
  userlogout="http://localhost:3000/register/logout";
  currentUser="http://localhost:3000/register";
  Token:any='';
  private user={
    id: -1,
    name: "",
    email: "",
    roles: "",
  }
  private user$=new BehaviorSubject(this.user)
  private authState$=new BehaviorSubject<boolean>(false)
  // environment:environment;
  
getAuthState(){
  return this.authState$.asObservable();
}
getUserObservable(){
  return this.user$.asObservable()
}

  login(loginData: any) {
    const headers = new HttpHeaders({
      // 'Authorization': `Bearer ${this.Token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.userlogin}`, loginData,{withCredentials:true,headers:headers});
  }
  newLogin(loginData: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.userlogin}`, loginData,{headers,withCredentials:true}).pipe(tap((value:any)=>{
      if(value.success){
        this.authState$.next(true);
        this.user$.next(value.user)
      }else{
        this.authState$.next(false);
      }
    }));
  }
  logout(){
    // const token=localStorage.getItem('token')
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${this.Token}`,
    //   'Content-Type': 'application/json',
    // });
    return this.http.get<any>(`${this.logout}`);
  }
 
  AuthStatus(){
    return this.http.get<any>(`${this.registerAuthStatus}`);
  }
  
  userId(id:number){
    const url=`${this.currentUser}/${id}`
     return this.http.get(url)
  }
      //income
    
      income="http://localhost:3000/income";
  
      userIncome(){
       return this.http.get<any>(`${this.income}`);
      }
      userIncomePost(form:any){
        return this.http.post<any>(`${this.income}`,form);
      }
      userIncomeUpdate(id:number,form:any){
        const url=`${this.income}/`+id;
        return this.http.patch<any>(url,form);
      }
      userIncomedelete(id:number){
        const url=`${this.income}/`+id;
        return this.http.delete<any>(url);
      }
      // expense;
  
      Expense="http://localhost:3000/expense";
      userExpenseGet(){
        return this.http.get<any>(`${this.Expense}`);
      }
      userExpensUpdate(id:number,form:any){
        const url=`${this.Expense}/`+id;
        return this.http.patch<any>(url,form);
      }
      userExpensDelete(id:number){
        const url=`${this.Expense}/`+id;
        return this.http.delete<any>(url);
      }



      showSuccessAlert(msg="") {
        this.snackBar
          .open(msg, 'Close', {
            duration: 4000,
          })
          .afterDismissed()
          .subscribe(() => {
            // this.route.navigate(['/sign-in']);
            console.log("success alert")
          });
      }


      showSnackBarAlert(msg = '', redirect = true) {
        var snackBar = this.snackBar.open(msg, 'Close', {
          duration: 4000,
        });
        if (redirect) {
          snackBar.afterDismissed().subscribe(() => {
            console.log("failed alert")
          });
        }
      }

}
