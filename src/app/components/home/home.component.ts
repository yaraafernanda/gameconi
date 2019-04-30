import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { User } from '../../class/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  logged:boolean=false;
  loginStatus: Subscription;
  user:User;
  constructor(private authService:AuthService,private route:ActivatedRoute,private router:Router,private usuarioService:UsuarioService) { }

  ngOnInit() {
    this.usuarioService.leerDatosDelJSON();
    console.log('CARGANDO DATOS');
    this.logged=this.authService.isAuthehticated();
    this.loginStatus=this.authService.loginStatusChange.subscribe((usuario:User)=>{
        this.logged=true;
        this.user=this.authService.user;
        console.log('USUARIO LOGEADO',usuario);
    });
  }
  goToGame(){
    this.router.navigate(['game']);
  };
  goToLogin(){
    this.router.navigate(['login']);
  }
}
