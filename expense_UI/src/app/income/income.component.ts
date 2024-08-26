import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IncomeService } from './income.service';
import { faEdit, faAdd,faUserEdit} from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent implements OnInit {
  constructor(private service:IncomeService, private snackBar: MatSnackBar,private router: ActivatedRoute,private route:Router){}
  id:any;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.id = localStorage.getItem('id');}
      this.Form.get(['registerId'])?.setValue(this.id)
  }
icons={faEdit,faUserEdit,faAdd}
  isChange:boolean=false;
  addIncome(){
    if(!this.isChange){
      this.isChange=true;
    }
  }
  isTrySubmit:boolean=false;
  arrValues:string[]|any=[]
 
  Form=new FormGroup({
  // name:new FormControl('',[Validators.required]),
  source:new FormControl('',[Validators.required]),
  currency:new FormControl('',[Validators.required]),
  recurring:new FormControl('',[Validators.required]),
  amount:new FormControl('',[Validators.required]),
  date:new FormControl('',[Validators.required]),
  registerId:new FormControl('',[Validators.required]),
  description:new FormControl('')
})

submit(){
  this.isTrySubmit=true;
  if(this.Form.valid){
   try{
    this.service.post(this.Form.value).subscribe({
      next:(response:any)=>{
      if(response.statusCode==200){
      this.showSuccessAlert('submitted successfully!')
      }
        else{
          const value={
            message:response,
            error:"response data is empty",
            method:"post",
          }
          console.log(value)
      }
     }, error:(error:any)=>{
      this.showSnackBarAlert(` Unauthorized error ! ${error.name}`);
     }})
}catch (error){
    console.log("type of error",error)
   }}
}
//alert
showSuccessAlert(msg="") {
  this.snackBar
    .open(msg, 'Close', {
      duration: 3000,
    })
    .afterDismissed()
    .subscribe(() => {
      // this.route.navigate(['/sign-in']);
      console.log("success alert")
    });
}
showSnackBarAlert(msg = '', redirect = true) {
  var snackBar = this.snackBar.open(msg, 'Close', {
    duration: 3000,
  });
  if (redirect) {
    snackBar.afterDismissed().subscribe(() => {
      this.route.navigate(['/sign-in']);
    });
  }
}
//alert end
closeAddItem(){
// window.location.reload()
 if(this.isChange){
  this.isChange=false;
}
}

// 
}

