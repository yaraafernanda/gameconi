import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/class/User';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
  constructor(private usuarioService: UsuarioService, private authService: AuthService, private router: Router) { }
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
    /*
    CHECK FOR EMAIL AND PASSWORD
    */
    // console.log('FORM',this.formLogin.value);
    const index = this.usuarios.findIndex( item => {
// tslint:disable-next-line: triple-equals
      if (item.email == this.formLogin.value.email && item.password == this.formLogin.value.password) {
          return true;
      }
    });
    if (index >= 0) {
      //// USUARIO CORRECTO
      this.authService.login(this.usuarios[index]);
      this.router.navigate(['/profile', this.usuarios[index].username]);
    } else {
      //// DATOS INCORRECTOS
      this.errMsg = true;
    }

  }
}
