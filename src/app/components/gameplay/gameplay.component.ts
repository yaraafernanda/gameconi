import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/games/higher-lower/game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { VideoGame } from '../../class/VideoGame';
import { User } from '../../class/User';
import { Partida } from '../../class/Partida';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {
  gamesplayed: Partida;
  logged: boolean = false;
  user: User;

  games: VideoGame[] = [];
  game1: VideoGame;
  game2: VideoGame;
  points: number;

  loginS: Subscription;
  subscript: Subscription;

  constructor(private authService: AuthService, private gService: GameService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.gService.leerJSON();
    // checa si esta loggeado para poder jugar
    this.logged = this.authService.isAuthehticated();
    this.loginS = this.authService.loginStatusChange.subscribe((usuario:User)=>{
      console.log('ENTRO');
      this.logged = true;
        this.user = this.authService.user;
        console.log('user:', this.user);
        console.log('USUARIO LOGEADO',usuario);
    });
    //this.gamesplayed.user_id = this.user.id;
    // toma los datos de los juegos
    this.gService.reset();
    this.gService.sortGames();
    // this.games.sort(() => Math.random() - 0.5);
    this.getCurrentGamePlay();
    this.subscript = this.gService.updatePoints.subscribe(
      (n: number) => { this.points = n; }
    );
    }


  getCurrentGamePlay() {
    this.games = this.gService.getGames();
    if (this.games.length === undefined) {
      this.endGame();
    } else {
      this.game1 = this.games[0];
      this.game2 =  this.games[1];
    }

  }

  isHigher() {
    if (this.game2.searches > this.game1.searches) {
      this.gService.sumPoints();
      //to get the nex game
      this.getCurrentGamePlay();
    } else {
      this.endGame();
    }
  }

  isLower() {
    if (this.game2.searches < this.game1.searches) {
      this.gService.sumPoints();
      //to get the nex game
      this.getCurrentGamePlay();
    } else {
      this.endGame();
    }
  }
  endGame() {
     if (this.points === undefined) {
       this.points = 0;
       console.log("score: ", this.points);
     }
    // TODO: sacar el oponente
    this.gamesplayed = new Partida(this.gService.getnextId(),0,
    this.user.id, this.points, 0,0,this.user.id,0,1);
    console.log('gameplayed: ', this.gamesplayed);
    this.gService.addGamePlayed(this.gamesplayed);
    this.router.navigate(['gameover']);
}


}
