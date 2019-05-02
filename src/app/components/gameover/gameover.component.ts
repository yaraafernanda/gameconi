import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/games/higher-lower/game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Partida } from '../../class/Partida';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.css']
})
export class GameoverComponent implements OnInit {
  score = 0;
  idg: number;
  gamesplayed: Partida[] = [];
  readg: Subscription;

  constructor(private gService: GameService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.gService.leerJSON();

    this.gamesplayed = this.gService.getGamesPlayed();
    this.route.params.subscribe((params) => {
      this.idg = Number(params.id);
     });
     console.log('id del juego terminado: ',this.idg);
     if (this.gService.gamesplayed){
      console.log('games cargados');
      this.score = this.gService.getScore(this.idg);
    } else {
      this.gService.updateGamePlayed.subscribe((gr: Partida[]) => {
        console.log('cargando games');
        this.score = this.gService.getScore(this.idg);
      });
    }
    console.log("score:", this.score);
  }

  playAgain() {
    this.router.navigate(['/game']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
