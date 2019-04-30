import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/games/higher-lower/game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from '../../class/Game';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {

  games: Game[] = [];
  game1: Game;
  game2: Game;
  points: number;
  subscript: Subscription;
  constructor(private gService: GameService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
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
    console.log('games:', this.games, this.games.length);
    if (this.games.length === undefined) {
      this.router.navigate(['gameover'] );
      console.log('you finished');
    } else {
      this.game1 = this.games[0];
      this.game2 =  this.games[1];
    }

  }

  isHigher() {
    if (this.game2.searches > this.game1.searches) {
      this.gService.sumPoints();
      // to get the nex game
      this.getCurrentGamePlay();
    } else {
      this.endGame();
    }
  }

  isLower() {
    if (this.game2.searches < this.game1.searches) {
      this.gService.sumPoints();
      // to get the nex game
      this.getCurrentGamePlay();
    } else {
      this.endGame();
    }
  }
  endGame() {
    this.router.navigate(['gameover']);
  }


}
