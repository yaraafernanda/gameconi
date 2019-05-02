import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Partida } from '../../../../class/Partida';
import { User } from '../../../../class/User';
import { Category } from '../../../../class/Category';
import { GameService } from '../../../../services/games/higher-lower/game.service';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import { AuthService } from '../../../../services/auth.service';
import { Subject, Subscription } from 'rxjs';
import { CurrentGame } from '../../../../class/CurrentGame';

@Component({
  selector: 'app-games-played',
  templateUrl: './games-played.component.html',
  styleUrls: ['./games-played.component.css']
})
export class GamesPlayedComponent implements OnInit {

  updateGamePlayed = new Subject<Partida[]>();
  userChangeSub: Subscription;

  //provisional
  private srcgames: Partida[] = [
    new Partida(1, 1, 2, 3, 5, 3, 0, 1, 0),
    new Partida(2, 2, 1, 2, 7, 1, 0, 0, 0),
    new Partida(3, 3, 3, 3, 5, 1, 0, 1, 0)
  ];

  mygames: CurrentGame[] = [];
  user: User;
  allusers: User[];
  allgames: Partida[];
  allcategories: Category[];
  owner = 1;

  constructor(private gService: GameService, private usuarioService: UsuarioService,
    private auth: AuthService) { }

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
    this.allcategories = this.gService.getCategories();
    console.log('Categorias: ', this.allcategories);
    this.allgames = this.srcgames;
    this.getMyGames();
    console.log('Partidas: ', this.mygames);
  }

  getMyGames() {
    console.log('getting my games...');
    this.mygames.splice(0, this.mygames.length);
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

}
