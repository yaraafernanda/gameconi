import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Game } from '../../../class/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

private points = 0;
updatePoints = new Subject<number>();
games: Game[] = [

new Game(0, 'Halo', 53600,
'https://as01.epimg.net/meristation/imagenes/2019/03/18/noticias/1552889337_702986_1552889388_noticia_normal.jpg'),
new Game(1, 'Gears of War 1', 86400,
     'https://videosjuegos.files.wordpress.com/2008/10/gears-of-war-1024x768.jpg'),
new Game(2, 'Mario', 195000,
'https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/bb/8b/eb/bb8beb7b-a7c6-ce90-ef4a-b81cd10d1524/AppIcon-0-1x_U007emarketing-0-85-220-6.png/246x0w.jpg'),
new Game(3, 'Fortnite', 43500,
    'https://cdn2.unrealengine.com/Fortnite%2Fbattle-royale%2FBR08_GetFortnite_3Up-1924x999-f74a2d27ca27d9a7e4905aa43edb06d29427b0af.jpg'),
new Game(4, 'Pacman', 59500, 'https://i.pinimg.com/originals/33/07/37/330737871eb6b5258ff38f4d441bfc1e.png'),
new Game(5, 'Legend of Zelda', 113000,
'https://www.quefriki.com/wp-content/uploads/P%C3%B3ster-Legend-of-Zelda-Breath-of-the-Wild-portada.jpg'),
];

  constructor() { }

  getGames(): Game[] {
    if (this.points + 1 < this.games.length) {
      return this.games.slice(this.points, this.points + 2);
    } else {
      return Object.assign({});
    }
  }

  sortGames() {
    this.games.sort(() => Math.random() - 0.5);
    console.log(this.games);
  }

  private getPointsUpdate() {
    this.updatePoints.next(this.points);
  }

  reset() {
    this.points = 0;
  }

  sumPoints() {
    this.points ++;
    this.getPointsUpdate();
  }



}
