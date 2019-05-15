import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../class/User';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Follower } from '../../class/Follower';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute,
    private profService: ProfileService,
    private authService: AuthService, private usuarioService: UsuarioService,
    private location: Location) { }
  user: User;
  profile: User;
  aparam: string;
  userChangeSub: Subscription;
  following:boolean=false;
  owner: boolean;

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
          this.profService.currentUserProfile(this.profile);
          this.following=false;
          this.checkFollowing();
          this.isHisProfile();
        }
      });
    } else {
      this.userChangeSub = this.usuarioService.usersChange.subscribe(
        (arregloUsuarios: User[]) => {
          console.log('USERS LOADED');
          this.route.params.subscribe((params) => {
            if (params.username) {
              this.profile = this.usuarioService.findUserbyUsername(params.username);
              this.profService.currentUserProfile(this.profile);
              this.following=false;
              this.checkFollowing();
              this.isHisProfile();
            }
          });
        }
      );
    }

  }
  isLogged(){
    return this.authService.isAuthehticated();
  }
  isHisProfile() {
    if (this.authService.isAuthehticated()) {
      //console.log('AUTHSERVICE USER',this.authService.user.username);
      if (this.authService.user.username === this.profile.username) {
        this.profService.setOwner(true);
        return true;
      } else {
        this.profService.setOwner(false);
        return false;
      }
    } else {
      this.profService.setOwner(false);
      return false;
    }
  }
  checkFollowing(){
    //console.log('entro checkFollowing');
    if (this.authService.isAuthehticated()) {
      this.authService.my_followers.map((item)=>{
          if(item.id==this.profile.id){
            this.following=true;
          }
      });
    }
  }

  follow(){    
    let all_followers=this.usuarioService.getAllFollowers();
    let index=all_followers.findIndex(item=>{
      return item.user_id==this.authService.user.id;
    });
    if(index>=0){
      //Update record
      all_followers[index].followers.push(this.profile.id);
      //this.usuarioService.update_follower(all_followers[index]);
      this.authService.update_follower(all_followers[index]);
      //this.usuarioService.replaceAllFollowersFile(all_followers);
      this.following=true;
    }else{
      ///Create record
      let nextfoll= all_followers.length+1;
      let new_follower:Follower=new Follower(nextfoll.toString(),this.authService.user.id,[this.profile.id]);
      //this.usuarioService.update_follower(new_follower);
      this.authService.update_follower(new_follower);
      all_followers.push(new_follower);
      this.following=true;
    }
    this.authService.get_my_followers();
  }
  unfollow(){
    let all_followers=this.usuarioService.getAllFollowers();
    let index=all_followers.findIndex(item=>{
      return item.user_id==this.authService.user.id;
    });
    let postition_following=all_followers[index].followers.findIndex(item=>item==this.profile.id);
    all_followers[index].followers.splice(postition_following,1);
    //this.usuarioService.update_follower(all_followers[index]);
    this.authService.update_follower(all_followers[index]);
    this.following=false;
    this.authService.get_my_followers();
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
