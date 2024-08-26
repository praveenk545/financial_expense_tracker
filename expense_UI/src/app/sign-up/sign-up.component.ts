import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiserviceService } from '../services/apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { response } from 'express';
import { get } from 'http';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  constructor(private cookieService: CookieService, private snackBar: MatSnackBar,private service:ApiserviceService,private router: ActivatedRoute,private route:Router){}
  isTrySubmit:boolean=false;
  isTrySubmitforLogin:boolean=false;
  token:any|string="";
ngOnInit(): void {
// this.token= localStorage.getItem('token')
// console.log(token)
 
}
  login=new FormGroup({
    isEmail:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  })

  auth(){
    try{
      this.service.AuthStatus().subscribe({next:(value:any)=>{
        if(value.status=='true'){
    console.log("AuthStatus is successful ! ",value)
         this.route.navigateByUrl('user')
         //.then(value).catch(value)
        }else{
          const myError={
            response:value,
            message:" Auth Status is false, user value are null",
            method:"get",
          }
          console.log("Auth status :",myError)
        }
      },error:(err:any)=>{
        console.log(err.name,"error is here")
      }
    })
    }catch(error){
      console.log(error,"catch error is here")
    }
   
  }

  setToken(token: string): void {
    const user= this.decodeToken(token)
     localStorage.setItem("token",token);
    localStorage.setItem("email",user.email);
    localStorage.setItem("id",user.id)
   const expireDate=user.exp * 1000 < Date.now()
    console.log(expireDate);
  }
  decodeToken(token:string){
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (error) {
      return {
        message:`token is undefined ${token}`,
        error:"decode token method",
      }
    }
  }
    
  isLogin(){ 
    const loginData:any={email:this.login.value.isEmail,password:this.login.value.password};
   this.isTrySubmitforLogin=true;
    if(this.login.valid){
     this.service.login(loginData).subscribe({next:(response:any)=>{
          if(response.user!==null){
            this.setToken(response.token)
            this.showSuccessAlert()
            
            setTimeout(() => {
              this.auth()
              this.route.navigateByUrl('/dashboard')
            }, 3000);
              }else{
                const value={
                  message:response.message,
                  error:"response data is empty",
                  method:"post",
                }
                console.log(value)
               }
         },error:err=>{
          this.showSnackBarAlert("Please Check this Credential!");
          console.error('Error:', err.type);
         }
        })     
    }
  }

  newLogin(){
    const loginData:any={email:this.login.value.isEmail,password:this.login.value.password};
    this.isTrySubmitforLogin=true;
     if(this.login.valid){
      this.service.newLogin(loginData).subscribe((res:any)=>{
        if(res.user.roles==='Reader'&& res.success){
          this.showSuccessAlert()
          setTimeout(() => {
            // this.route.navigateByUrl('income').then()
            this.auth()
          }, 5000);
        }else{
          this.showSnackBarAlert("You are not authorized to view this page")
        }
      },(error:HttpErrorResponse)=>{
        this.showSnackBarAlert(`${error.name}`)
      })
     }
  }
  //register  page route start
  isChangeFormToSingup() {
    this.route.navigate(['sign'])
    }
  //register  page route end

  
  //alert
  showSnackBarAlert(msg = '', redirect = true) {
    var snackBar = this.snackBar.open(msg, 'Close', {
      duration: 3000,
    });
    if (redirect) {
      snackBar.afterDismissed().subscribe(() => {
        // this.route.navigate(['/sign-in']);
        console.log("error alert")
      });
    }
  }
  
  showSuccessAlert() {
    this.snackBar
      .open("Login successful! Welcome back !", 'Close', {
        duration: 3000,
      })
      .afterDismissed()
      .subscribe(() => {
        // this.route.navigate(['/sign-in']);
        console.log("success alert")
      });
  }
  //alert end
}
