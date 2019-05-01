import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { VideoGame } from '../../../class/VideoGame';
import { Partida } from '../../../class/Partida';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Category } from '../../../class/Category';

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
'https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/bb/8b/eb/bb8beb7b-a7c6-ce90-ef4a-b81cd10d1524/AppIcon-0-1x_U007emarketing-0-85-220-6.png/246x0w.jpg',
 1),
new VideoGame(3, 'Fortnite', 43500,
    'https://cdn2.unrealengine.com/Fortnite%2Fbattle-royale%2FBR08_GetFortnite_3Up-1924x999-f74a2d27ca27d9a7e4905aa43edb06d29427b0af.jpg',
    2),
new VideoGame(4, 'Pacman', 59500, 'https://i.pinimg.com/originals/33/07/37/330737871eb6b5258ff38f4d441bfc1e.png', 3),
new VideoGame(5, 'Legend of Zelda', 113000,
'https://www.quefriki.com/wp-content/uploads/P%C3%B3ster-Legend-of-Zelda-Breath-of-the-Wild-portada.jpg', 2),
new VideoGame(6, 'Grand Theft Auto V', 595900, 'https://i.blogs.es/7864d3/official-artwork-the-trio/450_1000.jpg', 2),
new VideoGame(7, 'FIFA 19', 230000,
'https://media.contentapi.ea.com/content/dam/ea/easports/fifa/fifa-19-home/fifa19_refresh/franchise-hero-tertiary-fifa19-home-update-key-art-xs.jpg', 4),
new VideoGame(8, 'NBA 2K19', 500000,
 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fbrianmazique%2Ffiles%2F2018%2F10%2FNBA2K19HERO2-hero.jpg', 4),
new VideoGame(9, 'MLB The Show 19', 150000, 'https://img.youtube.com/vi/8tjGE9iNS8I/maxresdefault.jpg', 4),
new VideoGame(10, 'Madden NFL 19', 486000,
'https://data4.origin.com/content/dam/originx/web/app/games/madden/madden-19/merchcomponents/MaddenNFL19_pdp_stafeature_UltimateChallenge_en_ww_v1.jpg', 4),
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
new VideoGame(18, 'Mario Tennis Aces', 630000,
'https://cdn.vox-cdn.com/thumbor/TAXlsbd0aDLNJYXbXe_IuKvOwIk=/0x0:1920x1080/1200x675/filters:focal(1008x265:1314x571)/cdn.vox-cdn.com/uploads/chorus_image/image/60111239/mario_tennis_aces_mario_1920.1529429284.jpg', 4),
];

private categories: Category[];
private points = 0;
updatePoints = new Subject<number>();
private gamesplayed: Partida[];
updateGamePlayed = new Subject<Partida[]>();
private lastId = 1;
private sameCategoryGames: VideoGame[];

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

  updateGame(id, score) {
    console.log('datos entry', id, score);
    let pos = this.gamesplayed.findIndex(ga => ga.game_id == id );
    if (pos) {
      if (id == this.gamesplayed[pos].user_id) {
        this.gamesplayed[pos].score = score;
        this.gamesplayed[pos].turn_user_id = this.gamesplayed[pos].opponent_id;
      } else {
        if (id == this.gamesplayed[pos].opponent_id) {
          this.gamesplayed[pos].opponent_score = score;
          this.gamesplayed[pos].game_over = 1;
          if (this.gamesplayed[pos].opponent_score > this.gamesplayed[pos].score) {
            this.gamesplayed[pos].winner_id = this.gamesplayed[pos].opponent_id;
          } else {
            this.gamesplayed[pos].winner_id = this.gamesplayed[pos].user_id;
          }
        }
      }
     this.updateHighScore(score,pos);
    }
    let xhr = new XMLHttpRequest();
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

  updateHighScore(score, pos){
     //actualizar highscore
     let cat = this.categories.findIndex(c => c.id == this.gamesplayed[pos].category_id);
     if (score > this.categories[cat].highscore[0]) {
       this.categories[cat].highscore[2] = this.categories[cat].highscore[1];
       this.categories[cat].highscore[1] = this.categories[cat].highscore[0];
       this.categories[cat].highscore[0].score = score;
       this.categories[cat].highscore[0].id_usuario = this.gamesplayed[pos].user_id;

     } else {
       if (score > this.categories[cat].highscore[1]) {
         this.categories[cat].highscore[2] = this.categories[cat].highscore[1];
         this.categories[cat].highscore[1].score = score;
         this.categories[cat].highscore[1].id_usuario = this.gamesplayed[pos].user_id;

       } else {
         if (score > this.categories[cat].highscore[2]) {
          this.categories[cat].highscore[2].score = score;
          this.categories[cat].highscore[2].id_usuario = this.gamesplayed[pos].user_id;         }
       }
     }
  }

  getnextId() {
    return this.lastId;
  }

  getScore(id) {
    console.log('JSON READ', this.gamesplayed);
    let index = this.gamesplayed.findIndex(i => {
      if (i.game_id === id) {
        return true;
      }
    });
    console.log('INDEX:', index);
    if (index >= 0) {
      return this.gamesplayed[index].score;
    }
    return null;
  }

  getGames(id): VideoGame[] {
    let pos = this.gamesplayed.findIndex(ga => ga.game_id == id );
    let cat = this.gamesplayed[pos].category_id;
    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i].category_id == cat) {
        this.sameCategoryGames.push(this.games[i]);
      }
    }

    return this.sameCategoryGames.sort(() => Math.random() - 0.5);
  }

  getcurrentGame() {
    if (this.points + 1 < this.games.length) {
      return this.games.slice(this.points, this.points + 2);
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
