import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService:AuthService, private router:Router,private route:ActivatedRoute) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>{
    //throw new Error("Method not implemented.");
    /*this.route.params.subscribe((params)=>{
      if(params.username!=this.authService.user.username){

      }
    });*/
    if (this.authService.isAuthehticated()){
      return true;
    }
    this.router.navigate(['login'],{queryParams:{'redirectURL':state.url}});
    //this.router.navigate(['/login']);
    return false;
  }

}
