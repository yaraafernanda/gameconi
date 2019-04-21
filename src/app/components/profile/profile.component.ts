import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/class/User';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private router:Router,private route:ActivatedRoute,
    private authService:AuthService,private usuarioService:UsuarioService,
    private location:Location) { }
  user:User;
  profile:User;
  ngOnInit() {
    //this.user=this.authService.user;
    if(this.usuarioService.getUsers()){
      this.route.params.subscribe((params)=>{
        if(params.username){
          this.profile=this.usuarioService.findUserbyUsername(params.username);
        }
      });
    }
    
  }
  isHisProfile(){
    if(this.authService.isAuthehticated()){
      if(this.authService.user.username==this.profile.username){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  goToGeneral(){
    //
    //this.location.go(this.route.url);
    this.router.navigate(['/',{relativeTo:this.route}]);
  }
  goToGamesPlayed(){
    this.router.navigate(['gamesplayed'],{relativeTo:this.route});
  }
  goToSettings(){
    /*console.log('ROUTE',this.route);
    this.route.params.subscribe((params) => {
      console.log('NETRO',params['username']);
    })*/
    
    this.router.navigate(['settings'],{relativeTo:this.route});
  }

}
