import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { Subscription } from 'rxjs';
import { User } from '../../class/User';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarios: User[];
  userChangeSub: Subscription;
  formLogin: FormGroup;
  errMsg = false;
  redirectURL: string;

  constructor(private route: ActivatedRoute,private usuarioService: UsuarioService,
     private authService: AuthService, private router: Router,private httpClient:HttpClient) { }
  ngOnInit() {
    this.usuarios = this.usuarioService.getUsers();
    this.userChangeSub = this.usuarioService.usersChange.subscribe(
      (arregloUsuarios: User[]) => {
        console.log('CAMBIO USUARIOS', arregloUsuarios);
        this.usuarios = arregloUsuarios;
      }
    );
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

  }

  login() {

    this.httpClient.post(environment.apiUrl+'api/v1/login',this.formLogin.value).subscribe((data) => {
        if(data){
          //console.log('Corerecto login',data['user']);
          this.authService.login(data['user'],data['token']); 
          let params = this.route.snapshot.queryParams;
          if (params['redirectURL']) {
              this.redirectURL = params['redirectURL'];
          }
          if (this.redirectURL) {        
              this.router.navigateByUrl(this.redirectURL,)
                  .catch(() => this.router.navigate(['homepage']));
          } else {
            this.router.navigate(['/profile', data['user']['username']]);
          }
        }
     },error => {
      this.errMsg = true;
      //console.log('error login',error);
      console.log(error.error.error);
    });

    /*
    CHECK FOR EMAIL AND PASSWORD
    */
    /*const index = this.usuarios.findIndex( item => {
      if (item.email == this.formLogin.value.email && item.password == this.formLogin.value.password) {
          return true;
      }
    });
    if (index >= 0) {
      this.authService.login(this.usuarios[index]);
      
      let params = this.route.snapshot.queryParams;
          if (params['redirectURL']) {
              this.redirectURL = params['redirectURL'];
          }
          if (this.redirectURL) {        
              this.router.navigateByUrl(this.redirectURL,)
                  .catch(() => this.router.navigate(['homepage']))
          } else {
            this.router.navigate(['/profile', this.usuarios[index].username]);
          }
      
    } else {
      //// DATOS INCORRECTOS
      this.errMsg = true;
    }*/

  }
}
