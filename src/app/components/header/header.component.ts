import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/class/User';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged:boolean=false;
  loginStatus: Subscription;
  formMainSearch:FormGroup;
  user:User;
  userSearchResults:User[];
  constructor(private authService:AuthService,private route:ActivatedRoute,private router:Router,private usuarioService:UsuarioService) { }
  ngOnInit() {
    //console.log('AUTH?',this.authService.isAuthehticated());
    this.usuarioService.leerDatosDelJSON();
    console.log('CARGANDO DATOS');
    this.logged=this.authService.isAuthehticated();
    this.loginStatus=this.authService.loginStatusChange.subscribe((usuario:User)=>{
        this.logged=true;
        this.user=this.authService.user;
        console.log('USUARIO LOGEADO',usuario);
    });
    this.formMainSearch = new FormGroup({
      search: new FormControl(''),
    });
  }
  showList():boolean{
    if(this.formMainSearch.value.search!=''){
      return true;
    }
  }
  searchUsers(e){
    //console.log('USUARIOS',this.usuarioService.getUsers());
    if (e.which <= 90 && e.which >= 48)
       {
        this.userSearchResults=this.usuarioService.searchUsers(this.formMainSearch.value.search);
       }
    else{
        if(e.which==38){
          //UP KEY
          if(e.target.tagName!='INPUT'){

          }
        }
        if(e.which==40){
          //DOWN KEY
          if(e.target.tagName=='INPUT'){
            //let form=e.target.closest('form');
            //form.querySelector('li').focus();
          }
        }
    }
    
  }
  goToProfile(username:string){
    this.formMainSearch.value.search='';
    this.router.navigate(['/profile',username]);
  }
  goHome(){
    this.router.navigate(['/']);
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
