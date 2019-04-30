import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../class/User';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute,
    private authService: AuthService, private usuarioService: UsuarioService,
    private location: Location) { }
  user: User;
  profile: User;
  aparam: string;
  userChangeSub: Subscription;
  ngOnInit() {
    /*console.log('params',this.route.snapshot.params);
    console.log('params',this.route.snapshot.url);
    console.log('params',this.route.snapshot.component);
    console.log('params',this.route.url);*/
    this.aparam = this.route.firstChild.url['_value'][0]['path'];
    // console.log('params',this.route.firstChild.url['_value'][0]['path']);
    // console.log('x1',)
    // this.user=this.authService.user;
    if (this.usuarioService.getUsers()) {
      this.route.params.subscribe((params) => {
        if (params.username) {
          this.profile = this.usuarioService.findUserbyUsername(params.username);
        }
      });
    } else {
      this.userChangeSub = this.usuarioService.usersChange.subscribe(
        (arregloUsuarios: User[]) => {
          console.log('USERS LOADED');
          this.route.params.subscribe((params) => {
            if (params.username) {
              this.profile = this.usuarioService.findUserbyUsername(params.username);
            }
          });
        }
      );
    }
  }
  isHisProfile() {
    if (this.authService.isAuthehticated()) {
      if (this.authService.user.username === this.profile.username) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  goToGeneral() {
    //
    // this.location.go(this.route.url);
    this.aparam = this.route.firstChild.url['_value'][0]['path'];
    this.router.navigate(['/', { relativeTo: this.route }]);
  }
  goToGamesPlayed() {
    console.log('ENTRO2');
    this.aparam = 'gamesplayed';
    // this.router.navigate([this.route.url],{relativeTo:this.route});
    this.router.navigate(['gamesplayed'], { relativeTo: this.route });
  }
  goToCurrentGames() {
    this.aparam = 'currentgames';
    this.router.navigate(['currentgames'], { relativeTo: this.route });
  }
  goToSettings() {
    this.aparam = 'settings';
    this.router.navigate(['settings'], { relativeTo: this.route });
  }

}
