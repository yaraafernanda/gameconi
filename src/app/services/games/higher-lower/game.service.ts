import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { VideoGame } from '../../../class/VideoGame';
import { Partida } from '../../../class/Partida';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Category } from '../../../class/Category';
import { HighScore } from '../../../class/HighScore';

@Injectable({
  providedIn: 'root'
})
export class GameService {

games: VideoGame[] = [
new VideoGame(0, 'Halo', 53600,
'https://as01.epimg.net/meristation/imagenes/2019/03/18/noticias/1552889337_702986_1552889388_noticia_normal.jpg', 2),
new VideoGame(1, 'Gears of War 1', 86400,
     'https://videosjuegos.files.wordpress.com/2008/10/gears-of-war-1024x768.jpg', 2),
new VideoGame(2, 'Mario', 195000,
'https://img.jakpost.net/c/2016/12/13/2016_12_13_17692_1481599628._large.jpg', 1),
new VideoGame(3, 'Fortnite', 43500,
    'https://cdn2.unrealengine.com/Fortnite%2Fbattle-royale%2FBR08_GetFortnite_3Up-1924x999-f74a2d27ca27d9a7e4905aa43edb06d29427b0af.jpg',
    2),
new VideoGame(4, 'Pacman', 59500, 'https://i.pinimg.com/originals/33/07/37/330737871eb6b5258ff38f4d441bfc1e.png', 3),
new VideoGame(5, 'Legend of Zelda', 113000,
'https://www.quefriki.com/wp-content/uploads/P%C3%B3ster-Legend-of-Zelda-Breath-of-the-Wild-portada.jpg', 2),
new VideoGame(6, 'Grand Theft Auto V', 595900, 'https://i.blogs.es/7864d3/official-artwork-the-trio/450_1000.jpg', 2),
new VideoGame(7, 'FIFA 19', 230000,
'https://www.24horas.cl/incoming/fifa19jpg-2817001/ALTERNATES/BASE_LANDSCAPE/fifa19.JPG', 4),
new VideoGame(8, 'NBA 2K19', 500000,
 'https://www.nintendoenthusiast.com/wp-content/uploads/2018/09/Lebron-James-in-NBA-2k19-1170x585.jpg', 4),
new VideoGame(9, 'MLB The Show 19', 150000, 'https://img.youtube.com/vi/8tjGE9iNS8I/maxresdefault.jpg', 4),
new VideoGame(10, 'Madden NFL 19', 486000,
'https://blog.bestbuy.ca/wp-content/uploads/2018/08/madden-e1534450034123.jpg', 4),
new VideoGame(11, 'NHL 19', 206000,
'https://media.contentapi.ea.com/content/www-easports/en_US/nhl/news/2018/nhl-19-release-date/_jcr_content/imageShare.img.jpg', 4),
new VideoGame(12, 'WWE 2K19', 97000, 'https://cdn.2kgames.com/wwe.2k.com/news/wwe2k19/claymorezz1920.jpg', 4),
new VideoGame(13, 'EA Sports UFC 3', 330000,
'https://www.justpushstart.com/wp-content/uploads/2018/04/maxresdefault-63-890x606-890x606.jpg', 4),
new VideoGame(14, 'Freestyle Street Basketball 2', 280000,
'https://steamcdn-a.akamaihd.net/steam/apps/339610/ss_cf615c1949f16be418bc117c71e803621baae0b2.1920x1080.jpg?t=1515195348', 4),
new VideoGame(15, 'Golf IT', 210000, 'https://i.ytimg.com/vi/IIPCWLF4omI/maxresdefault.jpg', 4),
new VideoGame(16, 'Fishing Planet', 130000, 'https://i.ytimg.com/vi/kSXxYDsfcho/maxresdefault.jpg', 4),
new VideoGame(17, 'Mario Super Sluggers', 900000, 'https://i.ytimg.com/vi/EffVyHiVANY/maxresdefault.jpg', 4),
new VideoGame(18, 'Mario Tennis Aces', 630000, 'http://mariotennis.nintendo.com/aces/assets/img/home/hero-home-fallback.jpg', 4),
];

private categories: Category[];
updateCategories: Subject<Category[]>;
private points = 0;
updatePoints = new Subject<number>();
gamesplayed: Partida[];
updateGamePlayed = new Subject<Partida[]>();
private lastId = 1;
private sameCategoryGames: VideoGame[] = [];

constructor(private httpClient: HttpClient) { }

private urlJSON = 'https://api.myjson.com/bins/s4q5o';
private urlCategories = 'https://api.myjson.com/bins/1856js';

  async leerJSON() {
    let response = await fetch(this.urlJSON);
    if (response.status !== 200 ) {return []; }
    let arreglo =  await response.json();
    this.gamesplayed = arreglo.slice();
    this.updateGamePlayed.next(this.gamesplayed.slice());
    this.lastId = this.gamesplayed.length + 1;
  }

   leerCategorias() {
    this.httpClient.get(this.urlCategories).subscribe((data: Category[]) => {
      this.categories = data;
      console.log('READING ALL CATEGORIES.JSON', this.categories);
     });

   }
  getCategories(): Category[] {
    return this.categories.slice();
  }
  getGamesPlayed(): Partida[] {
    return this.gamesplayed;
  }

  addGamePlayed(gp: Partida) {
    this.gamesplayed.push(gp);

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', this.urlJSON);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(this.gamesplayed));
    xhr.onload = function () {
      if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
          // Ocurrió un error
          alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
      } else {
           console.log(xhr.responseText); // Significa que fue existoso
      }
  };
  this.updateGamePlayed.next(this.gamesplayed.slice());
  }

  updateGame(id, userid, score) {
    console.log('datos entry', id, score, 'juegos', this.gamesplayed);
    let pos = this.gamesplayed.findIndex(ga => ga.game_id === id );
    console.log('posicion: ', pos);
    if (pos >= 0) {
      if (userid == this.gamesplayed[pos].user_id) {
        this.gamesplayed[pos].score = score;
        this.gamesplayed[pos].turn_user_id = this.gamesplayed[pos].opponent_id;
      } else {
        if (userid == this.gamesplayed[pos].opponent_id) {
          this.gamesplayed[pos].opponent_score = score;
          this.gamesplayed[pos].game_over = 1;
          if (this.gamesplayed[pos].opponent_score > this.gamesplayed[pos].score) {
            this.gamesplayed[pos].winner_id = this.gamesplayed[pos].opponent_id;
          } else {
            this.gamesplayed[pos].winner_id = this.gamesplayed[pos].user_id;
          }
        }
      }
     this.updateHighScore(score,pos, userid);
     let xhr = new XMLHttpRequest();
    xhr.open('PUT', this.urlJSON);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(this.gamesplayed));
    xhr.onload = function () {
      if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
          // Ocurrió un error
          alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
      } else {
           console.log('update exitoso'); // Significa que fue existoso
      }
    };
    this.updateGamePlayed.next(this.gamesplayed.slice());
    console.log('updated game: ', this.gamesplayed[pos]);
    } else {
      console.log('not founded');
    }
  }

  updateHighScore(score, pos, id) {
    let cat= this.categories.findIndex(c => c.id == this.gamesplayed[pos].category_id);
    console.log('categoria que etamos actualizando hs: ', cat);
    let hs = this.categories[cat].highscore.findIndex(h => h.id_usuario === id);

    if (hs >= 0) {
      if (score > this.categories[cat].highscore[hs].score) {
        this.categories[cat].highscore[hs].score = score;
      }
    } else {
      this.categories[cat].highscore.push(new HighScore(id, score));
    }
    // ordenarlo
    for (let i = 1; i < this.categories[cat].highscore.length; i++) {
      for (let j = 0; j < (this.categories[cat].highscore.length - i ); j++) {
        if (this.categories[cat].highscore[j] > this.categories[cat].highscore[j + 1]) {
          let k = this.categories[cat].highscore[j + 1];
          this.categories[cat].highscore[j + 1] = this.categories[cat].highscore[j];
          this.categories[cat].highscore[j] = k;
        }
      }
    }
    console.log('ordenado: ', this.categories[cat].highscore);
    }

  getnextId() {
    return this.lastId;
  }

  getScore(id) {
    let index = this.gamesplayed.findIndex(i => i.game_id === id);
    console.log('INDEX:', index);
    if (index >= 0) {
      return this.gamesplayed[index].score;
    }
    return null;
  }

  getGames(id) {
    let pos = this.gamesplayed.findIndex(ga => ga.game_id == id );
    let cat = this.gamesplayed[pos].category_id;
    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i].category_id == cat) {
        this.sameCategoryGames.push(this.games[i]);
        console.log('pushed:', this.games[i]);
      }
    }
    console.log('SAMECAT CREATED: ', this.sameCategoryGames);
    this.sameCategoryGames.sort(() => Math.random() - 0.5);
  }

  getcurrentGame() {
    console.log('samecategory: ', this.sameCategoryGames);

    if (this.points + 1 < this.sameCategoryGames.length) {
      return this.sameCategoryGames.slice(this.points, this.points + 2);
    } else {
      return Object.assign({});
    }
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
