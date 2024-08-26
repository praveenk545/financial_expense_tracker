import {Component, OnInit, ViewChild} from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { response } from 'express';
import { faArrowAltCircleLeft,faArrowAltCircleRight,faEdit,faEye,faRemove,faRemoveFormat, faUndo} from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {

  ngOnInit(): void {
    this.getExpenseValues()
  }
  index:number|any;
  icons:any={faEdit,faRemove,faArrowAltCircleLeft,faArrowAltCircleRight,faEye,faUndo};
  constructor(private apiService:ApiserviceService){}
  useValues:string[]|any=[];
  expenseTotal:string[]|any=[];
  getExpenseValues(){
    this.apiService.userExpenseGet().subscribe({next:(response:any)=>{
      if(response.statusCode==200){
        if (typeof window !== 'undefined') {
          const item = localStorage.getItem('id');
          this.useValues = response.data.filter((e:any) => e.register_id==item);} 
          this.weekTotal(this.useValues);
          this.totalItems=response.data.length;
          let count=0;  
          this.expenseTotal=this.useValues.forEach((curr:any)=>{
            if(curr!==null){
              count+=parseFloat(curr.amount);
            } 
         })
           this.expenseTotal=count; 
           console.log(this.useValues,"use values")
          
      }else{
        const value={
          value:response,
          error:`response value is ${response} erorr`,
          message:"method get expense values"
        }
        console.log(value);
      }
    },error:(e:any)=>{
      console.log("catch error get expense values",e)
    }})
  }

  edit(id:number,value:any){
    this.addItems.get('category')?.patchValue(value.category);
    this.addItems.get(['paymentMethod'])?.patchValue(value.paymentMethod)
    this.addItems.get(['amount'])?.patchValue(value.amount)
    this.addItems.get(['date'])?.patchValue(value.date)
    this.addItems.get(['description'])?.patchValue(value.description)
    this.index=id;
  }
 
  updateSave(id:number){
    id=this.index
    console.log("id",id,"values")
    this.isTrySubmit=true;
    if(this.addItems.valid){
      //this.Form.updateValueAndValidity()
      this.apiService.userExpensUpdate(id,this.addItems.value).subscribe({next:(res:any)=>{
            if(res.statusCode==200){
              window.location.reload();
            
            }
            else{
              const value={
                error:res.data,
                message:"response data is empty",
                method:"update save",
              }
              console.log(value)
            }
      },error:(error:any)=>{
             console.log(error,"update-save method error")
      }})
    }
  }
  obj={
    id:0,
    category:"",
    subCategory:"",
    amount:"",
    date:'',
    paymentMethod:'',
    description:'',
  }
  delete(id:number,v:any){
    this.obj.category=v.category;
    this.obj.amount=v.amount;
    this.obj.amount=v.amount;
    this.obj.date=v.date;
    this.obj.id=id;
  }
  confirmDelete(){
    this.apiService.userExpensDelete(this.obj.id).subscribe({next:(res:any)=>{
      if(res.statusCode==200){
       window.location.reload()
      }
    },error:(error:any)=>[
          console.log(error,"confirm delete error")
    ]})
  }



  isTrySubmit:boolean=false;
  values:string[]|any=[];
  //formgroup
public addItems=new FormGroup({
  category:new FormControl('',[Validators.required]),
  amount:new FormControl('',[Validators.required]),
  date:new FormControl('',[Validators.required]),
  registerId:new FormControl(10),
  description:new FormControl(''),
  paymentMethod:new FormControl('',[Validators.required]),
  })

  
  currentPage: number = 1;
  itemsPerPage: number = 5;

  totalItems!: number; // Set this based on your total data count

  // Get paginated items
  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.useValues.slice(start, end);
  }

  // Change page
  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Get total pages
  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  // Generate page numbers for pagination
  get pageNumbers() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  get hasPrevious() {
    return this.currentPage > 1;
  }

  get hasNext() {
    return this.currentPage < this.totalPages;
  }
  weekTotalValues:any;
  week = (values:any) => {
    const today = new Date();
    const week = new Date();
    week.setDate(today.getDate() - 7);
    const formDate = ((date:any) => date.toISOString().split("T")[0]);
    return values.filter((value:any) => {
      const valueDate = new Date(value.date);
      return valueDate >= week && valueDate <= today;
    });

  };
  weekTotal(values:any){
  const week=this.week(values);
  let count=0;
   this.weekTotalValues=week.forEach((curr:any)=>{
    if(curr!==null){
      count+=parseFloat(curr.amount);
    } 
 })
   this.weekTotalValues=count; 
  }
}
