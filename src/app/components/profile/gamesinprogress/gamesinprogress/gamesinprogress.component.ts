import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../../services/games/higher-lower/game.service';
import { Partida } from '../../../../class/Partida';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../class/User';
import { Subscription, Subject } from 'rxjs';
import { Category } from '../../../../class/Category';
import { CurrentGame } from '../../../../class/CurrentGame';

@Component({
  selector: 'app-gamesinprogress',
  templateUrl: './gamesinprogress.component.html',
  styleUrls: ['./gamesinprogress.component.css']
})
export class GamesinprogressComponent implements OnInit {

  // private urlJSON = 'https://api.myjson.com/bins/s4q5o';
  updateGamePlayed = new Subject<Partida[]>();
  userChangeSub: Subscription;

  // estas son las variables oficiales a usar
  allgames: Partida[];
  mygames: CurrentGame[] = [];
  allcategories: Category[];
  allusers: User[];
  user: User;
  r_option = 0;
  turn: number;

  cPage = 1;

  private srcgames: Partida[] = [];

  // estos arreglos simulan el servicio
  // private srcgames: Partida[] = [
  //  new Partida(1, 1, 1, 0, 0, 3, 1, 0, 0, new Date(), new Date()), // alvaro me reta
  //  new Partida(4, 3, 3, 0, 0, 2, 0, 0, 0, new Date(), new Date()), // reto a mariana
  //  new Partida(2, 2, 1, 0, 0, 3, 1, 0, 0, new Date(), new Date()), // alvaro me reta
  //   new Partida(3, 1, 6, 0, 0, 1, 0, 1, 0, new Date(), new Date())
  // ];

  constructor(private gService: GameService, private usuarioService: UsuarioService,
    private auth: AuthService) { }

  ngOnInit() {
    console.log('ON INIT, leyendo BD...');
    this.gService.leerJSON();
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
        });
    }
    console.log('Agregando todas las Partidas a srcgames...');
    this.srcgames = this.gService.getGamesPlayed();
    console.log('Todas las Partidas: ', this.srcgames);
    console.log('Agregando todas las categorías a allcategories...');
    this.allcategories = this.gService.getCategories();
    console.log('Todas las categorias: ', this.allcategories);
    this.allgames = this.srcgames;
    console.log('Transferencia de srcgames a allgames...', this.allgames);
    this.getMyGames();
    console.log('Mis Partidas en curso: ', this.mygames);
  }

  getMyGames() {
    // let turn = 0;
    console.log('getting my games...');
    this.mygames.splice(0, this.mygames.length);
    // yo reté
    if (this.r_option === 2 || this.r_option === 0) {
      this.allgames.forEach(item => {
        if ((item.user_id === this.user.id) && (item.game_over === 0)) {
          const indexCat = this.allcategories.findIndex(item2 => item2.id == item.category_id);
          const indexOpponent = this.allusers.findIndex(item3 => item3.id == item.opponent_id);
          const newCurrentG = new CurrentGame(item.game_id, this.allcategories[indexCat].id,
            this.allcategories[indexCat].name, this.allcategories[indexCat].image,
            this.allusers[indexOpponent].username, item.turn_user_id !== this.user.id ? 0 : 1, 0, 0); // turno 0
          this.mygames.push(newCurrentG);
          console.log('YO RETE', this.mygames);
        }
      });
    }
    // me retaron
    if (this.r_option === 1 || this.r_option === 0) {
      this.allgames.forEach(item => {
        console.log('retaron', item.turn_user_id);
        if ((item.opponent_id === this.user.id) && (item.game_over === 0)) {
          const indexCat = this.allcategories.findIndex(item2 => item2.id == item.category_id);
          const indexOpponent = this.allusers.findIndex(item3 => item3.id == item.user_id);
          const newCurrentG = new CurrentGame(item.game_id, this.allcategories[indexCat].id,
            this.allcategories[indexCat].name, this.allcategories[indexCat].image,
            this.allusers[indexOpponent].username, item.turn_user_id === this.user.id ? 1 : 0, 0, 0); // turno 1
          this.mygames.push(newCurrentG);
          console.log('ME RETARON', this.mygames);
        }
      });
    }
  }
}
