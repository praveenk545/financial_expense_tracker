import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {} from '@fortawesome/fontawesome-svg-core';
import {
  faDeleteLeft,
  faEdit,faRemove,faEye,faAdd
} from '@fortawesome/free-solid-svg-icons';
import { ApiserviceService } from '../services/apiservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent implements OnInit {
  id:any;
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.id = localStorage.getItem('id');}
      this.addItems.get(['registerId'])?.setValue(this.id)
  }
  constructor(private http:HttpClient,private apiService:ApiserviceService){
   
  }

  icons = { faEdit,faRemove,faDeleteLeft,faEye,faAdd };
  Expense="http://localhost:3000/expense";

  useValues:string[]|any=[];
  isChange:boolean=false;
  isTrySubmit:boolean=false;
  values:string[]|any=[];
  user:string[]|any=[]
  //formgroup
public addItems=new FormGroup({
  category:new FormControl('',[Validators.required]),
  amount:new FormControl('',[Validators.required]),
  date:new FormControl('',[Validators.required]),
  registerId:new FormControl('',[Validators.required]),
  description:new FormControl(''),
  paymentMethod:new FormControl('',[Validators.required]),
  })

  // userValues(){
  //   if (typeof window !== 'undefined') {
  //     const item:number|any = localStorage.getItem('id');
  //   this.apiService.userId(item).subscribe({next:(response:any)=>{
  //    if(response.statusCode==200){
  //      this.user=(response.data);
  //      const name=localStorage.setItem("name",this.user.name)
  //     //  console.log(this.user,"current user")
  //    }
  //   },error:err=>{
  //     console.error('Error:', err.type);
  //   }})
  // }}
  isSubmit(){

    console.log(this.addItems.value)
    console.log(this.id,"id")
   this.isTrySubmit=true;
   if(this.addItems.valid){
    const url=`${this.Expense}`   
      this.http.post<any>(url,this.addItems.value).subscribe({next:(res:any)=>{
        if(res.statusCode==200){
          this.apiService.showSuccessAlert("Expenses add successfully")
          this.addItems.reset()
          this.isTrySubmit=false;
        }
        else{
          const value={
            value:res,
            error:`response value is ${res} erorr`,
            message:"method post expense values"
          }
          console.log(value);
        }
       },error:(error)=>{
        console.log(error,"post error ")
        this.apiService.showSnackBarAlert("something went wrong!")
       }
      })
     }

   
  }



  isChangePage(){
    if(!this.isChange){
      this.isChange=true;
    }
  }
  expense(){
    //expense edit button
    if(this.isChange){
      this.isChange=false
    }
  }

  closeAddItem(){
this.expense()
}
}
