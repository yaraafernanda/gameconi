import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games-played',
  templateUrl: './games-played.component.html',
  styleUrls: ['./games-played.component.css']
})
export class GamesPlayedComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
  }

}
