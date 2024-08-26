import { Component, OnInit } from '@angular/core';
import {} from '@fortawesome/fontawesome-svg-core';
import {
faMoneyCheck,faHandHoldingDollar,faHandHoldingDroplet,faUser,faRobot
} from '@fortawesome/free-solid-svg-icons';
import { ApiserviceService } from '../services/apiservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    this.getExpenseValues()
    this.getIncomeValues()
   if (typeof window !== 'undefined') {
    this.name=localStorage.getItem("name")
   }
  }
  constructor(private apiService:ApiserviceService,private router:ActivatedRoute,private route:Router){
  }
  name:any;
  icons = { faMoneyCheck,faHandHoldingDollar,faHandHoldingDroplet,faRobot };
  mycolor="butget";
  expenseValues:string[]|any=[];
  incomeValues:string[]|any=[];
  filteredData: any[] = [];
  expenseTotal:any;
  incomeTotal:any; 
  budget:any;
  isTrySubmit:boolean=false;
  public dateForm=new FormGroup({
    start:new FormControl('',Validators.required),
    end:new FormControl('',Validators.required),
  })
  
  getExpenseValues(){
    this.apiService.userExpenseGet().subscribe({next:(response:any)=>{
      if(response.statusCode==200){
        if (typeof window !== 'undefined') {
          const item = localStorage.getItem('id');
          this.expenseValues = response.data.filter((e:any) => e.register_id==item);
          
        }  
        let count=0;  
        this.expenseTotal=this.expenseValues.forEach((curr:any)=>{
          if(curr!==null){
            count+=parseFloat(curr.amount);
          } 
       })
         this.expenseTotal=count; 
      }
    },error:(e:any)=>{
      console.log("catch error get expense values",e)
    }})
  }
  getIncomeValues(){
    this.apiService.userIncome().subscribe({next:(response:any)=>{
      if(response.statusCode==200){
        if (typeof window !== 'undefined') {
          const item = localStorage.getItem('id');
          this.incomeValues = response.data.filter((e:any) => e.register_id==item);
          let count=0;
          this.incomeTotal=this.incomeValues.forEach((curr:any)=>{
             if(curr!==null){
               count+=parseFloat(curr.amount);
             } 
          })
          
          this.incomeTotal=count;
      } 
      }
    },error:err=>{
      console.log(err,"user edit page ")
    }})
  }
   logout(){
    localStorage.clear();
    this.route.navigateByUrl('/sign-up')
    console.log("cleared")
  // this.apiService.logout().subscribe({next:(res:any)=>{
  //   if(res.status==200){
  //     console.log("logout successfully")
  //     localStorage.clear()
  //     this.route.navigateByUrl('/sign-up')
  //   }else{


  //   }
  // }})
   }

   convertToISO(dateStr: string|any): string {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day).toISOString().split('T')[0];
  } 
  monthlyTotal:any|number=0;
   categoryValues:string[]|any=[];
  search(): void {
    this.isTrySubmit = true;
    if (this.dateForm.valid) {
      const start: string|any = this.dateForm.value.start;
      const end: string|any = this.dateForm.value.end;
      console.log(start,end)
      this.filteredData = this.expenseValues.filter((element: any) => {
        const itemDate = element.date;
        return itemDate >= start && itemDate <= end;
      });
    }
    let count=0;  
    this.monthlyTotal=this.filteredData.forEach((curr:any)=>{
      if(curr!==null){
        count+=parseFloat(curr.amount);
      }
   })
  this.monthlyTotal=count;
    this.categoryValues=this.filteredData.reduce((acc:any,curr:any)=>{
      if(!acc.includes(curr.category)){
        acc.push(curr.category);
      }
      return acc;
    },[])
  }


  }

  
   
   

