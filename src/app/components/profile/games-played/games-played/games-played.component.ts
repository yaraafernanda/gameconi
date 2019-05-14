import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Partida } from '../../../../class/Partida';
import { User } from '../../../../class/User';
import { Category } from '../../../../class/Category';
import { GameService } from '../../../../services/games/higher-lower/game.service';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import { AuthService } from '../../../../services/auth.service';
import { Subject, Subscription } from 'rxjs';
import { CurrentGame } from '../../../../class/CurrentGame';
import { ProfileService } from '../../../../services/profile/profile.service';
import { IfStmt } from '@angular/compiler';
import { isEmbeddedView } from '@angular/core/src/view/util';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-games-played',
  templateUrl: './games-played.component.html',
  styleUrls: ['./games-played.component.css']
})
export class GamesPlayedComponent implements OnInit {

  userChangeSub: Subscription;
  ownerChangeSub: Subscription;
  profileVisited: Subscription;

  // //provisional
  private srcgames: Partida[] = [
    new Partida(1, 1, 1, 0, 0, 3, 1, 0, 0, new Date(), new Date()), // alvaro me reta
    new Partida(4, 3, 3, 0, 0, 2, 0, 0, 0,new Date(), new Date()), // reto a mariana
    new Partida(2, 2, 1, 0, 0, 3, 1, 0, 0,new Date(), new Date()), // alvaro me reta
    new Partida(3, 1, 6, 0, 0, 1, 0, 1, 0,new Date(), new Date())
  ]; 

  //private srcgames: Partida[] = [];
    /*
    constructor(
        public game_id: number,
        public category_id: number,
        public user_id: number,
        public score: number,
        public opponent_score: number,
        public opponent_id: number,
        public turn_user_id: number,
        public game_over: number,
        public winner_id: number,
           public createDate: Date,
        public answerDate: Date,
        public lives_user: number,
        public lives_opponent: number) {
        }
}
  private srcgames: Partida[] = [
     new Partida(1, 1, 1, 0, 0, 3, 1, 0, 0), // alvaro me reta
     new Partida(4, 3, 3, 0, 0, 2, 0, 0, 0), // reto a mariana
     new Partida(2, 2, 1, 0, 0, 3, 1, 0, 0), // alvaro me reta
     new Partida(3, 1, 6, 0, 0, 1, 0, 1, 0)
   ];
  */

  mygames: CurrentGame[] = [];
  user: User;
  allusers: User[] = [];
  allgames: Partida[];
  allcategories: Category[];
  mycategories: Category[] = [] ;
  owner = true;
  profileV: User;

  constructor(private gService: GameService, private usuarioService: UsuarioService,
    private auth: AuthService, private route: ActivatedRoute, private profService: ProfileService) { }

    ngOnInit() {
      this.user = this.auth.user;
      if (this.usuarioService.getUsers()) {
        console.log('ENTRÓ AL IF');
        this.allusers = this.usuarioService.getUsers();
        const index = this.allusers.findIndex(item => item.username == this.user.username);
        if (index >= 0) {
          this.allusers.splice(index, 1);
        }
      } else {
        console.log('ENTRÓ AL ELSE');
        this.userChangeSub = this.usuarioService.usersChange.subscribe(
          (arregloUsuarios: User[]) => {
            this.allusers = this.usuarioService.getUsers();
            const index = this.allusers.findIndex(item => item.username == this.user.username);
            if (index >= 0) {
              this.allusers.splice(index, 1);
            }
          }
        );
      }
      this.ownerChangeSub = this.profService.updateOwner.subscribe(
        (owner: boolean) => {
          this.owner = owner;
        }
      );
      this.profileVisited = this.profService.updateUserVisited.subscribe(
        (profile: User) => {
          this.profileV = profile;
          console.log(this.profileV);
        }
      );
      this.allcategories = this.gService.getCategories();
      console.log('Categorias: ', this.allcategories);
      this.allgames = this.srcgames;
      this.getMyGames();
      this.getCategoriesPlayed();
      console.log('Partidas: ', this.mygames);
    }

  getMyGames() {
    console.log('getting my games...');
    //this.mygames.splice(0, this.mygames.length);
  
    //yo reté
    this.allgames.forEach(item => {
      if ((item.user_id === this.user.id) && (item.game_over === 1)) {
        const indexCat = this.allcategories.findIndex(item2 => item2.id == item.category_id);
        const indexOpponent = this.allusers.findIndex(item3 => item3.id == item.opponent_id);
        const newCurrentG = new CurrentGame(item.game_id,
          this.allcategories[indexCat].name, this.allcategories[indexCat].image,
          this.allusers[indexOpponent].username, 0, item.score, item.opponent_score);
        this.mygames.push(newCurrentG);
      }
    });
    //me retaron
    this.allgames.forEach(item => {
      if ((item.opponent_id === this.user.id) && (item.game_over === 1)) {
        const indexCat = this.allcategories.findIndex(item2 => item2.id == item.category_id);
        const indexOpponent = this.allusers.findIndex(item3 => item3.id == item.user_id);
        const newCurrentG = new CurrentGame(item.game_id,
          this.allcategories[indexCat].name, this.allcategories[indexCat].image,
          this.allusers[indexOpponent].username, 1, item.opponent_score, item.score);
        this.mygames.push(newCurrentG);
      }
    });
  }

  getCategoriesPlayed() {
    console.log('getting my categories...');
    //obtener el id del perfil visitado en el arreglo de usuarios 
      const indexProfileV = this.allusers.findIndex(item => item.id == this.profileV.id);
      this.allcategories.forEach(item => {
        if (item.highscore.findIndex(h => h.username === this.allusers[indexProfileV].username)) {
          this.mycategories.push(item);
        }
      });
  }
}
