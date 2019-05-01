import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../../../../services/games/higher-lower/game.service';
import { Partida } from '../../../../class/Partida';

@Component({
  selector: 'app-gamecard',
  templateUrl: './gamecard.component.html',
  styleUrls: ['./gamecard.component.css']
})
export class GamecardComponent implements OnInit {

  @Input() partida: Partida;

  constructor(private gService: GameService) { }

  ngOnInit() {
    this.partida = this.gService.getGamesPlayed()[1];
    console.log(this.partida);
  }

}
