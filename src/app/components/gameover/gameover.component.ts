import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/games/higher-lower/game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Partida } from '../../class/Partida';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.css']
})
export class GameoverComponent implements OnInit {
  score = 0;
  idg: number;
  gamesplayed: Partida[] = [];

  constructor(private gService: GameService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.gamesplayed = this.gService.getGamesPlayed();
    this.idg = this.gService.getnextId();
    this.score = this.gService.getScore(this.idg);
    console.log("score:", this.score);
  }

  playAgain() {
    this.router.navigate(['/game']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
