import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../class/User';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { GameService } from '../../services/games/higher-lower/game.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged:boolean=false;
  loginStatus: Subscription;
  logoutStatus: Subscription;
  formMainSearch:FormGroup;
  user:User;
  userSearchResults:User[];
  constructor(private authService:AuthService,private route:ActivatedRoute,private router:Router,private usuarioService:UsuarioService,private gameService:GameService) { }
  ngOnInit() {
    //console.log('AUTH?',this.authService.isAuthehticated());
    this.usuarioService.leerDatosDelJSON();
    this.gameService.leerCategorias();
    console.log('CARGANDO DATOS');
    this.logged=this.authService.isAuthehticated();
    this.loginStatus=this.authService.loginStatusChange.subscribe((usuario:User)=>{
        this.logged=true;
        this.user=this.authService.user;
        console.log('USUARIO LOGEADO',usuario);
        //this.usuarioService.get_my_followers();
        //console.log('FOLLOWERS2',this.usuarioService.get_my_followers());
    });
    this.logoutStatus=this.authService.logoutChange.subscribe((logout:boolean)=>{
      ///IF LOGOUT///
      this.logged=logout;
    });


    this.formMainSearch = new FormGroup({
      search: new FormControl(''),
    });
  }

  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
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
  logout(){
    this.authService.logout();
    this.logged=this.authService.isAuthehticated();
    this.router.navigate(['/']);
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
