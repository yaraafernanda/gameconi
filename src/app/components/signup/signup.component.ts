import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { checkUsername } from '../../validators/check-username';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../class/User';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { ThrowStmt } from '@angular/compiler';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formSignUp: FormGroup;
  userChangeSub: Subscription;
  errMsg = '';
  usuarios: User[] = [];
  constructor(private usuarioService: UsuarioService, private authService: AuthService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.usuarioService.leerDatosDelJSON();
    this.formSignUp = new FormGroup({
      username: new FormControl('', [Validators.required, checkUsername]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      terms: new FormControl('', [Validators.required])
    });
    this.userChangeSub = this.usuarioService.usersChange.subscribe(
      (arregloUsuarios: User[]) => {
        this.usuarios = arregloUsuarios;
      }
    );
  }
  signUp() {
    this.errMsg = '';
    const index_username = this.usuarios.findIndex(item => {
// tslint:disable-next-line: triple-equals
      if (this.formSignUp.value.username == item.username) {
        return true;
      }
    });
    const index_email = this.usuarios.findIndex(item => {
// tslint:disable-next-line: triple-equals
      if (this.formSignUp.value.email == item.email) {
        return true;
      }
    });
    //console.log('ENTRO ACA');
    if (index_username >= 0) {
      // YA EXISTE ESE USERNAME
      this.errMsg = 'Sorry that username has been already taken';
    }
    if (index_email >= 0) {
      // YA EXISTE ESE EMAIL
      this.errMsg = 'Sorry that email has been already registered';
    }
// tslint:disable-next-line: triple-equals
    if (this.errMsg == '') {
      console.log('ENTRO CREAR');
      /// SUBMIT NEW USER//
      const image = Math.floor(Math.random() * 100) + 1;
      let nextu=this.usuarioService.getNextId();
      const new_user: User = new User(nextu.toString(),
        this.formSignUp.value.username,
        this.formSignUp.value.email,
        this.formSignUp.value.password,
        'https://api.adorable.io/avatars/285/' + image + '.png'
      );
      this.authService.createUser(new_user);
      //this.usuarioService.createUser(new_user);
      /// AUTH USER AND REDIRECT TO PROFILE////

      //this.authService.login(new_user);


      //this.router.navigate(['/profile', new_user.username]);
    }
    // this.formSignUp.value.username;
  }

}
