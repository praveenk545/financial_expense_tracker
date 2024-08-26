import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateFn, CanDeactivate, CanLoad, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { AuthService } from "./auth.service";
import { Observable, tap } from "rxjs";
import { ApiserviceService } from "../services/apiservice.service";

@Injectable({

    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {

    constructor(private apiservice:ApiserviceService,private authService: AuthService, private router: Router) {}
    
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any|Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree{
    return this.apiservice.getAuthState().pipe(
      tap((value:any)=>{
        if(!value){
          this.router.navigateByUrl('sign-up').then();
          return false;
        }else{
          return true;
        }
      })
    )
  }

  }

  // function setCookie(name, value, days) {
  //   let expires = "";
  //   if (days) {
  //     const date = new Date();
  //     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  //     expires = `; expires=${date.toUTCString()}`;
  //   }
  //   document.cookie = `${name}=${value || ""}${expires}; path=/; Secure; SameSite=Strict`;
  // }