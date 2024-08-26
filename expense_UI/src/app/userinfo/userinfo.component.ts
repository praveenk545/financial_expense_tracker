import { Component, OnInit } from '@angular/core';
import {
 faUserEdit,faEnvelope
  } from '@fortawesome/free-solid-svg-icons';
import { ApiserviceService } from '../services/apiservice.service';
import { response } from 'express';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrl: './userinfo.component.css'
})
export class UserinfoComponent implements OnInit {
  icons = { faUserEdit,faEnvelope };
  constructor(private apiService:ApiserviceService){}
  id:any;
  ngOnInit(): void {
    this.userValues()
  }
  user:string[]|any=[]
  age:any;

  userValues(){

    if (typeof window !== 'undefined') {
      const item:number|any = localStorage.getItem('id');
    this.apiService.userId(item).subscribe({next:(response:any)=>{
     if(response.statusCode==200){
       this.user=(response.data);
       const name=localStorage.setItem("name",this.user.name)
      //  console.log(this.user,"current user")
     }
    },error:err=>{
      console.error('Error:', err.type);
    }})
  }}
}
