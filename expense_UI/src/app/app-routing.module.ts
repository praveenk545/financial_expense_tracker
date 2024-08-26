import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseComponent } from './expense/expense.component';
import { IncomeComponent } from './income/income.component';
import { SignComponent } from './sign/sign.component';
import { AuthGuard } from './auth/auth_guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { ContactComponent } from './contact/contact.component';
import { UsereditComponent } from './useredit/useredit.component';
import { PaginationComponent } from './pagination/pagination.component';
import { EditincomeComponent } from './editincome/editincome.component';
import { ChartComponent } from './chart/chart.component';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:"sign-up",},
  {path:"dashboard",component:DashboardComponent,
   // canActivate:[AuthGuard],
    children:[
     
    ] 
  },
  // {path:'',redirectTo:'income',pathMatch:'full'},
  {path:"exp",component:ExpenseComponent,
  },
  {path:"income",component:IncomeComponent,
  },

  {path:"user",component:UserinfoComponent,
  },
  {path:"user-edit",component:UsereditComponent,
  },
  {path:"contact",component:ContactComponent,
  },

  {path:"sign",component:SignComponent,
  },
  {path:"page",component:PaginationComponent,
  },
  {path:"addup",component:EditincomeComponent,
  },
  {path:"chart",component:ChartComponent,
  },

{path:"sign-up",component:SignUpComponent,
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
