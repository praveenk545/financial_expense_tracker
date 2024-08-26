import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { faArrowAltCircleLeft,faArrowAltCircleRight,faEdit,faEye,faRemove,faRemoveFormat} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrl: './useredit.component.css'
})


export class UsereditComponent implements OnInit {
constructor(private apiService:ApiserviceService,private router:ActivatedRoute,private route:Router){}
// how to get minute use this pipe
icons:any={faEdit,faRemove,faArrowAltCircleLeft,faArrowAltCircleRight,faEye};
ngOnInit(): void {
  this.getValues()
}

user:string[]|any=[];
userId:any
useValues:string[]|any=[]

getValues(){
  this.apiService.userIncome().subscribe({next:(response:any)=>{
    if(response.data!==null){
      const item = localStorage.getItem('id');
      if (typeof window !== 'undefined') {
        // Safe to use localStorage here      
        this.user = response.data.filter((e:any) => e.register_id==item);
        this.useValues = response.data.filter((e:any) => e.register_id==item);
        this.high_Income(this.user,3)
         this.total(this.user)
         this.getRecentIncomes(this.user,3)
        this.getPercentage(this.user)
    }
      
    }
  },error:err=>{
    console.log(err,"user edit page ")
  }})
}
//top 3 income
top: any[] = [];
high_Income(incomes: any[], topN = 3): any[] {
  if (!Array.isArray(incomes) || topN <= 0) {
      return [];
  }
  incomes.forEach((income: any) => {
      income.amount = parseFloat(income.amount);
  });
  const sortedIncomes = incomes.sort((a: any, b: any) => b.amount - a.amount);
  this.top = sortedIncomes.slice(0, topN);
  return this.top;
}

 high:any;
 total(value:any){
  let count=0;
 this.high=value.forEach((curr:any)=>{
    if(curr!==null){
      count+=parseFloat(curr.amount);
    } 
 })
  return this.high=count;
 } 

 Recent:any;
 getRecentIncomes(incomes: any[], topN = 3): any[] {
  incomes.forEach((income: any) => {
      income.date = new Date(income.date);
  });
  const sortedIncomes = incomes.sort((a: any, b: any) => b.date.getTime() - a.date.getTime());
  const recentIncomes = sortedIncomes.slice(0, topN);
  this.Recent = recentIncomes;
  return this.Recent;
}
percentage:number[]= [];
getPercentage(value:any){
  const total=this.total(value);
  const amount=this.getRecentIncomes(value);
  if (total > 0) { 
    this.percentage = amount.map((curr: any) => {
      if (curr && curr.amount !== undefined) {
        return Math.floor((curr.amount / total) * 100);
      }
      return 0;
    });
  } else {
    console.error("Total amount must be greater than zero.");
    this.percentage = [];

}
  return this.percentage;
}

// Pagination variables
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

// Change page
changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

view(){
  //id:number,value:any
    this.route.navigateByUrl('/addup')
}


public barChartOptions = {
  responsive: true,
};
public barChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
public barChartType = 'bar';
public barChartLegend = true;
public barChartData = [
  { data: [12, 19, 3, 5, 2, 3, 7], label: 'Series A' },
  { data: [7, 11, 5, 8, 3, 7, 6], label: 'Series B' }
];

}
