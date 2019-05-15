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

  private srcgames: Partida[] = [];

  mygames: CurrentGame[] = [];
  user: User;
  allusers: User[] = [];
  allgames: Partida[];
  allcategories: Category[] = [];
  mycategories: Category[] = [];
  owner = true;
  profileV: User;

  actualPage = 1;
  cPage = 1;

  constructor(private gService: GameService, private usuarioService: UsuarioService,
    private auth: AuthService, private route: ActivatedRoute, private profService: ProfileService) { }

  ngOnInit() {
    console.log('ON INIT, leyendo BD...');
    this.gService.leerJSON();
    this.user = this.auth.user;
    if (this.usuarioService.getUsers()) {
      console.log('ENTRÓ AL IF');
      this.allusers = this.usuarioService.getUsers();
      // tslint:disable-next-line: triple-equals
      const index = this.allusers.findIndex(item => item.username == this.user.username);
      if (index >= 0) {
        this.allusers.splice(index, 1);
      }
    } else {
      console.log('ENTRÓ AL ELSE');
      this.userChangeSub = this.usuarioService.usersChange.subscribe(
        (arregloUsuarios: User[]) => {
          this.allusers = this.usuarioService.getUsers();
          // tslint:disable-next-line: triple-equals
          const index = this.allusers.findIndex(item => item.username == this.user.username);
          if (index >= 0) {
            this.allusers.splice(index, 1);
          }
        });
    }
    this.ownerChangeSub = this.profService.updateOwner.subscribe(
      (owner: boolean) => {
        this.owner = owner;
      }
    );
    this.profileVisited = this.profService.updateUserVisited.subscribe(
      (profile: User) => {
        this.profileV = profile;
        console.log('Perfil visitado: ', this.profileV);
      }
    );
    console.log('Agregando todas las Partidas a srcgames...');
    this.srcgames = this.gService.getGamesPlayed();
    console.log('Todas las Partidas: ', this.srcgames);
    console.log('Agregando todas las categorías a allcategories...');
    this.allcategories = this.gService.getCategories();
    console.log('Todas las categorias: ', this.allcategories);
    this.allgames = this.srcgames;
    console.log('Transferencia de srcgames a allgames...', this.allgames);
    this.getMyGames();
    this.getCategoriesPlayed();
    // this.fillArrays();
    console.log('Mis partidas: ', this.mygames);
    console.log('Mis categorias: ', this.mycategories);
  }


  getMyGames() {
  console.log('getting my games method...');
  this.mygames.splice(0, this.mygames.length);
  // yo reté
  this.allgames.forEach(item => {
    if ((item.user_id === this.user.id) && (item.game_over === 1)) {
      // tslint:disable-next-line: triple-equals
      const indexCat = this.allcategories.findIndex(item2 => item2.id == item.category_id);
      // tslint:disable-next-line: triple-equals
      const indexOpponent = this.allusers.findIndex(item3 => item3.id == item.opponent_id);
      const newCurrentG = new CurrentGame(item.game_id, this.allcategories[indexCat].id,
        this.allcategories[indexCat].name, this.allcategories[indexCat].image,
        this.allusers[indexOpponent].username, '0', item.score, item.opponent_score);
      this.mygames.push(newCurrentG);
    }
  });
  // me retaron
  this.allgames.forEach(item => {
    if ((item.opponent_id === this.user.id) && (item.game_over === 1)) {
      // tslint:disable-next-line: triple-equals
      const indexCat = this.allcategories.findIndex(item2 => item2.id == item.category_id);
      // tslint:disable-next-line: triple-equals
      const indexOpponent = this.allusers.findIndex(item3 => item3.id == item.user_id);
      const newCurrentG = new CurrentGame(item.game_id, this.allcategories[indexCat].id,
        this.allcategories[indexCat].name, this.allcategories[indexCat].image,
        this.allusers[indexOpponent].username, '1', item.opponent_score, item.score);
      this.mygames.push(newCurrentG);
    }
  });
}

getCategoriesPlayed() {
  console.log('getting my categories method...');
  // tslint:disable-next-line: triple-equals
  if (this.profileV == undefined) {
    console.log('IF CATEGORIESPLAYED');
    this.allcategories.forEach(item => {
      if (item.highscore.find(h => h.username === this.user.username)) {
     // if (item.highscore.findIndex(h => h.id_usuario === this.user.id)) {
        this.mycategories.push(item);
      }
    }); 
  } else {
    console.log('ELSE CATEGORIESPLAYED');
    // tslint:disable-next-line: triple-equals
    const indexProfileV = this.allusers.findIndex(item => item.id == this.profileV.id);
    this.allcategories.forEach(item => {
      if (item.highscore.find(h => h.username === this.allusers[indexProfileV].username)) {
     // if (item.highscore.findIndex(h => h.id_usuario === this.allusers[indexProfileV].id)) {
        this.mycategories.push(item);
      }
    });
  }
  // console.log('categorias mias', this.mycategories);
}

}

