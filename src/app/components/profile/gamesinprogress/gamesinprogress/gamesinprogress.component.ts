import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../../services/games/higher-lower/game.service';
import { Partida } from '../../../../class/Partida';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../class/User';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-gamesinprogress',
  templateUrl: './gamesinprogress.component.html',
  styleUrls: ['./gamesinprogress.component.css']
})
export class GamesinprogressComponent implements OnInit {

  private urlJSON = 'https://api.myjson.com/bins/s4q5o';
  private allgames: Partida[]; // todos los juegos
  updateGamePlayed = new Subject<Partida[]>();
  user: User;

  constructor(private gService: GameService, private usuarioService: UsuarioService,
    private auth: AuthService) { }

  ngOnInit() {
  }

}
