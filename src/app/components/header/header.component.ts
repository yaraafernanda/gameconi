import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/class/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged:boolean=false;
  loginStatus: Subscription;
  user:User;
  constructor(private authService:AuthService,private route:ActivatedRoute,private router:Router) { }
  ngOnInit() {
    //console.log('AUTH?',this.authService.isAuthehticated());
    this.logged=this.authService.isAuthehticated();
    this.loginStatus=this.authService.loginStatusChange.subscribe((usuario:User)=>{
        this.logged=true;
        this.user=this.authService.user;
        console.log('USUARIO LOGEADO',usuario);
    });
  }
  goLogin(){
    this.router.navigate(['/login']);
  }
  goSignup(){
    this.router.navigate(['/signup']);
  }
  /*login(){
    this.authService.login();
    this.logged=this.authService.isAuthehticated();
  }
  logout(){
    this.authService.logout();
    this.logged=this.authService.isAuthehticated();
  }*/

}
