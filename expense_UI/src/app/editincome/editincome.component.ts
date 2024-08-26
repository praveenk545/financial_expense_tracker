import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
import { response } from 'express';

import { faArrowAltCircleLeft,faUndo,faArrowAltCircleRight,faEdit,faEye,faRemove,faRemoveFormat} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-editincome',
  templateUrl: './editincome.component.html',
  styleUrl: './editincome.component.css'
})
export class EditincomeComponent implements OnInit {
constructor(private cdr: ChangeDetectorRef,private router:ActivatedRoute,private apiservice:ApiserviceService){
}
currentId:any;
useValues:string[]|any=[];
isTable:boolean=false;
value:any;
icons:any={faEdit,faRemove,faArrowAltCircleLeft,faArrowAltCircleRight,faEye,faUndo};
ngOnInit(): void {
  this.router.params.subscribe((res:any)=>{
    this.currentId=res.id;
    console.log(this.currentId)
    })
this.getIncomeValues()

}
 isTrySubmit:boolean=false;
public Form=new FormGroup({
  // name:new FormControl('',[Validators.required]),
  source:new FormControl('',[Validators.required]),
  currency:new FormControl('',[Validators.required]),
  recurring:new FormControl('',[Validators.required]),
  amount:new FormControl('',[Validators.required]),
  date:new FormControl('',[Validators.required]),
  description:new FormControl(''),
  registerId:new FormControl(10)
})
getIncomeValues(){
  this.apiservice.userIncome().subscribe({next:(response:any)=>{
    if(response.statusCode==200){
      if (typeof window !=='undefined') {
        const item = localStorage.getItem('id');
        this.useValues=response.data.filter((e:any) =>e.register_id==item);
        console.log(this.useValues)
      }
    }
  },error:(error:any)=>{
    console.log(error,"here is the error")

  }})
}
update(){


}
cancel(){

}
index:any;
edit(id:number,value:any){
  
  this.Form.get('source')?.patchValue(value.source);
  this.Form.get(['currency'])?.patchValue(value.currency)
  this.Form.get(['recurring'])?.patchValue(value.recurring)
  this.Form.get(['amount'])?.patchValue(value.amount)
  this.Form.get(['date'])?.patchValue(value.date)
  this.Form.get(['description'])?.patchValue(value.description)
  this.index=id;
 // this.cdr.detectChanges(); // Force change detection
}
updateSave(id:number){
  id=this.index
  console.log("id",id,"values")
  this.isTrySubmit=true;
  if(this.Form.valid){
    //this.Form.updateValueAndValidity()
    this.apiservice.userIncomeUpdate(id,this.Form.value).subscribe({next:(res:any)=>{
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
  source:"",
  currency:"",
  amount:"",
  date:'',
}
delete(id:number,v:any){
  this.obj.source=v.source;
  this.obj.currency=v.currency;
  this.obj.amount=v.amount;
  this.obj.date=v.date;
  this.obj.id=id;
  console.log(this.obj.id,'object id')
}
confirmDelete(){
   this.apiservice.userIncomedelete(this.obj.id).subscribe({next:(res:any)=>{
     if(res.statusCode==200){
      window.location.reload()
     }
   },error:(error:any)=>[
         console.log(error,"confirm delete error")
   ]})
}

currentPage = 1;
itemsPerPage = 5;

// Calculate the number of pages
get totalPages() {
  return Math.ceil(this.useValues.length / this.itemsPerPage);
}

// Get the current page products
get paginatedProducts() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return this.useValues.slice(start, end);
}
getGlobalIndex(index: number): number {
  return (this.currentPage - 1) * this.itemsPerPage + index + 1;
}

// Change page
changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}
}
