import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent,HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable,throwError, } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse)=>{
          // Handle HTTP errors globally
        console.log('HTTP error occured',error);
        return throwError(error)
      })
    )
  }

  constructor() { }
}
