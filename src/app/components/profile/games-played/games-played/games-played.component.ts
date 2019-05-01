import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Partida } from '../../../../class/Partida';
import { User } from '../../../../class/User';

@Component({
  selector: 'app-games-played',
  templateUrl: './games-played.component.html',
  styleUrls: ['./games-played.component.css']
})
export class GamesPlayedComponent implements OnInit {

  private partidas: Partida[] = [
    new Partida(1,1,6,0,0,3,0,6,0),
    new Partida(2,1,6,0,0,1,0,6,0),
    new Partida(3,1,6,0,0,1,0,6,0)
  ];
  user: User;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
