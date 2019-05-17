import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/games/higher-lower/game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { VideoGame } from '../../class/VideoGame';
import { User } from '../../class/User';
import { Partida } from '../../class/Partida';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuarios/usuario.service';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {
  logged: boolean = false;
  length1: number;
  length2: number;

  user: User;

  games: VideoGame[] = [];
  game1: VideoGame;
  game2: VideoGame;
  points: number;
  lives: number;
  gid:String;
  cid: number;

  gamescat: Subscription;
  loginS: Subscription;
  subscript: Subscription;
  readg: Subscription;
  readc: Subscription;
  liveUpdated: Subscription;
  date: Date;
  partidaid:String;

  constructor(private authService: AuthService, private uService: UsuarioService,
    private gService: GameService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.gService.leerJSON();
    this.gService.notificarCambiosGames();
    var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3');
    audio.play(); 
    //hora y fecha de inicio juego
    this.date = new Date();
    // checa si esta loggeado para poder jugar
    this.logged = this.authService.isAuthehticated();
    this.user =  this.authService.user;
    this.route.params.subscribe((params) => {
     this.gid = params.cat;
     this.partidaid = params.id;
     console.log('checar parametros: ', this.gid, this.gid.toString());
    });

    //this.catid = this.gService.getCatID(this.gid.toString());
    // toma los datos de los juegos
    this.gService.reset();
    this.uService.resetLives();
    this.lives = this.uService.getLives();
    this.points = this.gService.getInitialScore();
    // get same category videogames
    if (this.gService.gamesplayed) {
      this.gService.getGames(this.gid);
    } else {
      console.log('not loaded');
      this.readg = this.gService.updateGamePlayed.subscribe((rg: Partida[]) => {
        console.log('GAMES LOADED');
        this.gService.getGames(this.gid);

      });
    }

    this.gamescat = this.gService.updateGames.subscribe((v: VideoGame[])=> {
     // this.games=v;
      this.getCurrentGamePlay();

    });

    this.subscript = this.gService.updatePoints.subscribe(
      (n: number) => { this.points = n; }
    );
    this.liveUpdated = this.uService.updateLives.subscribe((n: number) => {this.lives = n; });
    }


  getCurrentGamePlay() {
    console.log('GETTING CURRENT GAME');
    this.games = this.gService.getcurrentGame();
    if (this.games.length === undefined) {
      console.log('finalizando');
      this.endGame();

    } else {
      this.game1 = this.games[0];
      this.length1 = this.game1.name.length;
      this.game2 =  this.games[1];
      this.length2 = this.game2.name.length;

    }

  }

  isHigher() {
    if (this.game2.searches > this.game1.searches) {
      this.gService.sumPoints();
      console.log('score so far:', this.points);
      //to get the nex game
      this.getCurrentGamePlay();
    } else {
      if(this.lives >= 1) {
        this.uService.loseLive();
        console.log('incorrecta', this.lives);
        this.getCurrentGamePlay();
      }
      else{
        this.endGame();
      }
    }
  }

  isLower() {
    if (this.game2.searches < this.game1.searches) {
      this.gService.sumPoints();
      console.log('score so far:',this.points);
      //to get the nex game
      this.getCurrentGamePlay();
    } else {
      if(this.lives >= 1) {
        this.uService.loseLive();
        console.log('incorrecta', this.lives);
        this.getCurrentGamePlay();
      }
      else{
        this.endGame();
      }
    }
  }
  endGame() {
    this.subscript = this.gService.updatePoints.subscribe(
      (n: number) => { this.points = n; }
    );
     if (this.points === undefined) {
       this.points = 0;
       console.log('score undefined: ', this.points);
     }
     if(!this.gService.getCategories()){
      this.gService.leerCategorias();
     }
  
     if (this.gService.gamesplayed.findIndex(g => g.game_id == this.gid)){
       console.log('encontrado');
      this.gService.updateGame(this.partidaid, this.user.id, this.points, this.user.username, this.date);
     } else {
      this.readg = this.gService.updateGamePlayed.subscribe((rg: Partida[]) => {
        console.log('ACTUALIZADO', rg);
        this.gService.updateGame(this.partidaid, this.user.id, this.points, this.user.username, this.date );
      });
     } 
    this.router.navigate(['gameover'], {relativeTo: this.route});
}


}
