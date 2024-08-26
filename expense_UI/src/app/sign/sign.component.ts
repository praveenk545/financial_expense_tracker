import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { format } from 'path';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.css'
})
export class SignComponent implements OnInit {
  constructor( private snackBar: MatSnackBar,private loginService:LoginService,private http:HttpClient,private router: ActivatedRoute,private route:Router){
// insert into constructor   private snackBar: MatSnackBar,
  }
  
  ngOnInit(): void {
    console.log( this.formValues)
  }
  registerUser="http://localhost:3000/register/register";
  registerAuthStatus="http://localhost:3000/register/authstatus";
  userlogin= "http://localhost:3000/register/login";
  userlogout="http://localhost:3000/register/logout";
  // const url=`${this.apiUrl}/${id}`;
  isTrySubmit:boolean=false;
  isChange:boolean=false;
  formValues:string[]|any=[];;
  loginValues:any|[];
 
signIn=new FormGroup({
name:new FormControl('',[Validators.required]),
email:new FormControl('',[Validators.required]),
password:new FormControl('',[Validators.required]),
profile:new FormControl('',[Validators.required]),
dob:new FormControl('',[Validators.required]),
phone:new FormControl('',[Validators.required]),
occupation:new FormControl('',[Validators.required]),
country:new FormControl('',[Validators.required]),
//age,profile,phone,etc.profitional or student
})
 
submit(){
  this.isTrySubmit=true;
    if(this.signIn.valid){   
      const url=`${this.registerUser}`     
      this.http.post<any>(url,this.signIn.value).subscribe({
      next:(response:any)=>{
        if(response.statusCode==200){
           this.isChange=true;
           this.showSuccessAlert()
        }
        else{
          const value={
            message:response.message,
            error:"response data is empty or check your condition",
            method:"post",
          }
          console.log(value,"form values")
        }
      },error:err=>{
          console.log('post method error',err.name)
          this.showSnackBarAlert(`Something went wrong ! ${err.name}`)
      }
      })
}
}

isChangeForm(){
this.route.navigateByUrl('sign-up')

}




//alert
showSnackBarAlert(msg = '', redirect = true) {
  var snackBar = this.snackBar.open(msg, 'Close', {
    duration: 4000,
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
    .open('Form submitted successfully!', 'Close', {
      duration: 4000,
    })
    .afterDismissed()
    .subscribe(() => {
      // this.route.navigate(['/sign-in']);
      console.log("success alert")
    });
}
//alert end

goToSignin() {
  this.route.navigate(['/sign-in']);
}
goToSignup() {
  this.route.navigate(['/sign-up']);
}

isChangeFormToSingup(){
  if(this.isChange==true){
    this.isChange=false;
  }
}
}
