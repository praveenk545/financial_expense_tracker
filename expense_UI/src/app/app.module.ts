import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptorService } from './errorHandle/error-interceptor.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseComponent } from './expense/expense.component';
import { IncomeComponent } from './income/income.component';
import { SignComponent } from './sign/sign.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ApiserviceService } from './services/apiservice.service';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { ContactComponent } from './contact/contact.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UsereditComponent } from './useredit/useredit.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AppComponent } from './app.component';
import { DateAgoPipe } from './useredit/date-ago.pipe';
import { EditincomeComponent } from './editincome/editincome.component';
import { ChartComponent } from './chart/chart.component';
// import { ChartsModule } from 'ng2-charts'


 class CustomErrorHandler implements ErrorHandler{
  handleError(error: any): void {
    console.log('An error occured',error)
  }
 }

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ExpenseComponent,
    IncomeComponent,
    SignComponent,
    SignUpComponent,
    UserinfoComponent,
    ContactComponent,
    FooterComponent,
    HeaderComponent,
    UsereditComponent,
    PaginationComponent,
    DateAgoPipe,
    EditincomeComponent,
    ChartComponent
 
  ],
  imports: [
    CommonModule,
    // ChartsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    FontAwesomeModule,
    
  ],
  providers: [ApiserviceService,{provide:ErrorHandler,useClass:CustomErrorHandler},{provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true}, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
