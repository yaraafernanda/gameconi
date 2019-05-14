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

new VideoGame(1, 'FIFA 19', 230000,
'https://www.24horas.cl/incoming/fifa19jpg-2817001/ALTERNATES/BASE_LANDSCAPE/fifa19.JPG', 4),
new VideoGame(2, 'NBA 2K19', 500000,
 'https://www.nintendoenthusiast.com/wp-content/uploads/2018/09/Lebron-James-in-NBA-2k19-1170x585.jpg', 4),
new VideoGame(3, 'MLB The Show 19', 150000, 'https://img.youtube.com/vi/8tjGE9iNS8I/maxresdefault.jpg', 4),
new VideoGame(4, 'Madden NFL 19', 486000,
'https://blog.bestbuy.ca/wp-content/uploads/2018/08/madden-e1534450034123.jpg', 4),
new VideoGame(5, 'NHL 19', 206000,
'https://media.contentapi.ea.com/content/www-easports/en_US/nhl/news/2018/nhl-19-release-date/_jcr_content/imageShare.img.jpg', 4),
new VideoGame(6, 'WWE 2K19', 97000, 'https://cdn.2kgames.com/wwe.2k.com/news/wwe2k19/claymorezz1920.jpg', 4),
new VideoGame(7, 'EA Sports UFC 3', 330000,
'https://www.justpushstart.com/wp-content/uploads/2018/04/maxresdefault-63-890x606-890x606.jpg', 4),
new VideoGame(8, 'Freestyle Street Basketball 2', 280000,
'https://steamcdn-a.akamaihd.net/steam/apps/339610/ss_cf615c1949f16be418bc117c71e803621baae0b2.1920x1080.jpg?t=1515195348', 4),
new VideoGame(9, 'Golf IT', 210000, 'https://i.ytimg.com/vi/IIPCWLF4omI/maxresdefault.jpg', 4),
new VideoGame(10, 'Fishing Planet', 130000, 'https://i.ytimg.com/vi/kSXxYDsfcho/maxresdefault.jpg', 4),
new VideoGame(11, 'Mario Super Sluggers', 900000, 'https://i.ytimg.com/vi/EffVyHiVANY/maxresdefault.jpg', 4),
new VideoGame(12, 'Mario Tennis Aces', 630000, 'http://mariotennis.nintendo.com/aces/assets/img/home/hero-home-fallback.jpg', 4),

new VideoGame(13, 'Days Gone', 866700, 'https://static-cdn.jtvnw.net/ttv-boxart/Days%20Gone-285x380.jpg', 1),
new VideoGame(14, 'Sekiro: Shadows Die Twice', 57800,
'https://static-cdn.jtvnw.net/ttv-boxart/Sekiro:%20Shadows%20Die%20Twice-285x380.jpg', 1),
new VideoGame(15, 'Rust', 221400, 'https://static-cdn.jtvnw.net/ttv-boxart/Rust-285x380.jpg', 1),
new VideoGame(16, 'Tibia', 99800, 'https://static-cdn.jtvnw.net/ttv-boxart/Tibia-285x380.jpg', 1),
new VideoGame(17, 'Super Mario 64', 126400, 'https://static-cdn.jtvnw.net/ttv-boxart/Super%20Mario%2064-285x380.jpg', 1),
new VideoGame(18, 'Forager', 345003, 'https://static-cdn.jtvnw.net/ttv-boxart/Forager-285x380.jpg', 1),
new VideoGame(19, 'The Legend of Zelda: Breath of the wild', 83210,
'https://static-cdn.jtvnw.net/ttv-boxart/The%20Legend%20of%20Zelda:%20Breath%20of%20the%20Wild-285x380.jpg', 1),
new VideoGame(20, 'Dark Souls III', 64400, 'https://static-cdn.jtvnw.net/ttv-boxart/Dark%20Souls%20III-285x380.jpg', 1),
new VideoGame(21, 'Eastshade', 66400, 'https://static-cdn.jtvnw.net/ttv-boxart/Eastshade-285x380.jpg',1),
new VideoGame(22, 'Resident Evil 2', 65400, 'https://static-cdn.jtvnw.net/ttv-boxart/Resident%20Evil%202-285x380.jpg', 1),
new VideoGame(23, 'Pokémon Ruby/Sapphire', 67400, 'https://static-cdn.jtvnw.net/ttv-boxart/Pok%C3%A9mon%20Ruby/Sapphire-285x380.jpg', 1),
new VideoGame(24, 'Detroit: Become Human', 688400, 'https://static-cdn.jtvnw.net/ttv-boxart/Detroit:%20Become%20Human-285x380.jpg', 1),
new VideoGame(25, 'Outlast', 49900, 'https://static-cdn.jtvnw.net/ttv-boxart/Outlast-285x380.jpg', 1),

new VideoGame(26, 'Fortnite', 48600, 'https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-285x380.jpg', 2),
new VideoGame(27, 'PLAYERUNKNOWNS BATTLEGROUNDS', 40000,
'https://static-cdn.jtvnw.net/ttv-boxart/PLAYERUNKNOWN%27S%20BATTLEGROUNDS-285x380.jpg', 2),
new VideoGame(28, 'Counter-Strike: Global Offensive', 404320,
'https://static-cdn.jtvnw.net/ttv-boxart/Counter-Strike:%20Global%20Offensive-285x380.jpg', 2),
new VideoGame(29, 'Overwatch', 401110, 'https://static-cdn.jtvnw.net/ttv-boxart/Overwatch-285x380.jpg', 2),
new VideoGame(30, 'Apex Legends', 42100, 'https://static-cdn.jtvnw.net/ttv-boxart/Apex%20Legends-285x380.jpg', 2),
new VideoGame(31, 'Call of Duty: Black Ops 4', 411700,
'https://static-cdn.jtvnw.net/ttv-boxart/Call%20of%20Duty:%20Black%20Ops%204-285x380.jpg', 2),
new VideoGame(32, 'Tom Clancys Rainbow Six Siege', 94600,
'https://static-cdn.jtvnw.net/ttv-boxart/Tom%20Clancy%27s%20Rainbow%20Six:%20Siege-285x380.jpg', 2),
new VideoGame(33, 'Escape From Tarkov', 90870, 'https://static-cdn.jtvnw.net/ttv-boxart/Escape%20From%20Tarkov-285x380.jpg', 2),
new VideoGame(34, 'Destiny 2', 12200, 'https://static-cdn.jtvnw.net/ttv-boxart/Destiny%202-285x380.jpg', 2),
new VideoGame(35, 'Rust', 19800, 'https://static-cdn.jtvnw.net/ttv-boxart/Rust-285x380.jpg', 2),
new VideoGame(36, 'Portal 2', 190000, 'https://static-cdn.jtvnw.net/ttv-boxart/Portal%202-285x380.jpg', 2),
new VideoGame(37, 'Tom Clancys The Division 2', 942200,
'https://static-cdn.jtvnw.net/ttv-boxart/Tom%20Clancy%27s%20The%20Division%202-285x380.jpg', 2),
new VideoGame(38, 'Warframe', 90000, 'https://static-cdn.jtvnw.net/ttv-boxart/Warframe-285x380.jpg', 2),
new VideoGame(39, 'Borderlands 3', 982300, 'https://static-cdn.jtvnw.net/ttv-boxart/Borderlands%203-285x380.jpg', 2),

new VideoGame(40, 'Grand Theft Auto V', 99100, 'https://static-cdn.jtvnw.net/ttv-boxart/Grand%20Theft%20Auto%20V-285x380.jpg', 3),
new VideoGame(41, 'Days Gone', 55600, 'https://static-cdn.jtvnw.net/ttv-boxart/Days%20Gone-285x380.jpg', 3),
new VideoGame(42, 'Minecraft', 54200, 'https://static-cdn.jtvnw.net/ttv-boxart/Minecraft-285x380.jpg', 3),
new VideoGame(43, 'Dark Souls', 50000, 'https://static-cdn.jtvnw.net/ttv-boxart/Dark%20Souls-285x380.jpg', 3),
new VideoGame(44, 'The Elder Scrolls Online', 234600,
'https://static-cdn.jtvnw.net/ttv-boxart/The%20Elder%20Scrolls%20Online-285x380.jpg', 3),
new VideoGame(45, 'Black Desert Online', 56700, 'https://static-cdn.jtvnw.net/ttv-boxart/Black%20Desert%20Online-285x380.jpg', 3),
new VideoGame(46, 'DayZ', 58900, 'https://static-cdn.jtvnw.net/ttv-boxart/DayZ-285x380.jpg', 3),
new VideoGame(47, 'Final Fantasy XV', 51000, 'https://static-cdn.jtvnw.net/ttv-boxart/Final%20Fantasy%20XV-285x380.jpg', 3),
new VideoGame(48, 'Tom Clancys The Division 2', 51100,
'https://static-cdn.jtvnw.net/ttv-boxart/Tom%20Clancy%27s%20The%20Division%202-285x380.jpg', 3),
new VideoGame(49, 'Star Citizen', 86400, 'https://static-cdn.jtvnw.net/ttv-boxart/Star%20Citizen-285x380.jpg', 3),
new VideoGame(50, 'Borderlands 2', 86400, 'https://static-cdn.jtvnw.net/ttv-boxart/Borderlands%202-285x380.jpg', 3),
new VideoGame(51, 'Metal Gear Solid V:', 86400, 'https://static-cdn.jtvnw.net/ttv-boxart/Grand%20Theft%20Auto%20V-285x380.jpg', 3),
new VideoGame(52, 'The Legend of Zelda: Breath of the wild', 86400,
'https://static-cdn.jtvnw.net/ttv-boxart/The%20Legend%20of%20Zelda:%20Breath%20of%20the%20Wild-285x380.jpg', 3),
new VideoGame(53, 'Chrono Trigger', 51200, 'https://static-cdn.jtvnw.net/ttv-boxart/Chrono%20Trigger-285x380.jpg', 3),
new VideoGame(54, 'Bloodborne', 51300, 'https://static-cdn.jtvnw.net/ttv-boxart/Bloodborne-285x380.jpg', 3),

new VideoGame(55, 'Grand Theft Auto V', 51400,
     'https://static-cdn.jtvnw.net/ttv-boxart/Grand%20Theft%20Auto%20V-285x380.jpg', 5),
new VideoGame(56, 'Sea of Thieves', 96300,
     'https://static-cdn.jtvnw.net/ttv-boxart/Sea%20of%20Thieves-285x380.jpg', 5),
new VideoGame(57, 'Minecraft', 34500, 'https://static-cdn.jtvnw.net/ttv-boxart/Minecraft-285x380.jpg', 5),
new VideoGame(58, 'Days Gone', 33200, 'https://static-cdn.jtvnw.net/ttv-boxart/Days%20Gone-285x380.jpg', 5),
new VideoGame(59, 'Mordhau', 300000, 'https://static-cdn.jtvnw.net/ttv-boxart/Mordhau-285x380.jpg', 5),
new VideoGame(60, 'Dead by Daylight', 45600, 'https://static-cdn.jtvnw.net/ttv-boxart/Dead%20by%20Daylight-285x380.jpg', 5),
new VideoGame(61, 'Dark Souls', 32100, 'https://static-cdn.jtvnw.net/ttv-boxart/Dark%20Souls-285x380.jpg', 5),
new VideoGame(62, 'Rocket League', 31100, 'https://static-cdn.jtvnw.net/ttv-boxart/Rocket%20League-285x380.jpg', 5),
new VideoGame(63, 'Path of Exile', 34500, 'https://static-cdn.jtvnw.net/ttv-boxart/Path%20of%20Exile-285x380.jpg', 5),
new VideoGame(64, 'World of Tanks', 37800, 'https://static-cdn.jtvnw.net/ttv-boxart/World%20of%20Tanks-285x380.jpg',5),
new VideoGame(65, 'Final Fantasy XV', 39900, 'https://static-cdn.jtvnw.net/ttv-boxart/Final%20Fantasy%20XV-285x380.jpg', 5),
new VideoGame(66, 'ARK', 90300, 'https://static-cdn.jtvnw.net/ttv-boxart/ARK-285x380.jpg', 5),
new VideoGame(67, 'Diablo II: Lord of Destruction', 39000,
'https://static-cdn.jtvnw.net/ttv-boxart/Diablo%20II:%20Lord%20of%20Destruction-285x380.jpg', 5),
new VideoGame(68, 'Warframe', 95500, 'https://static-cdn.jtvnw.net/ttv-boxart/Warframe-285x380.jpg', 5),
new VideoGame(69, 'Metro 2033', 98800, 'https://static-cdn.jtvnw.net/ttv-boxart/Metro%202033-285x380.jpg', 5),
new VideoGame(70, 'Battlefield V', 864400, 'https://static-cdn.jtvnw.net/ttv-boxart/Battlefield%20V-285x380.jpg', 5),

new VideoGame(71, 'Auto Chess', 90700, 'https://static-cdn.jtvnw.net/ttv-boxart/Auto%20Chess-285x380.jpg', 6),
new VideoGame(72, 'Warcraft III: The Frozen Theft', 12300,
'https://static-cdn.jtvnw.net/ttv-boxart/Warcraft%20III:%20The%20Frozen%20Throne-285x380.jpg', 6),
new VideoGame(73, 'Anno 1800', 223400, 'https://static-cdn.jtvnw.net/ttv-boxart/Anno%201800-285x380.jpg', 6),
new VideoGame(74, 'StarCraft II', 11200, 'https://static-cdn.jtvnw.net/ttv-boxart/StarCraft%20II-285x380.jpg', 6),
new VideoGame(75, 'Slay the Spire', 145600, 'https://static-cdn.jtvnw.net/ttv-boxart/Slay%20the%20Spire-285x380.jpg', 6),
new VideoGame(76, 'Super Seducer 2', 17800, 'https://static-cdn.jtvnw.net/ttv-boxart/Super%20Seducer%202-285x380.jpg', 6),
new VideoGame(77, 'Chess', 12100, 'https://static-cdn.jtvnw.net/ttv-boxart/Chess-285x380.jpg', 6),
new VideoGame(78, 'Clash Royale', 18990, 'https://static-cdn.jtvnw.net/ttv-boxart/Clash%20Royale-285x380.jpg', 6),
new VideoGame(79, 'RimWorld', 98700, 'https://static-cdn.jtvnw.net/ttv-boxart/RimWorld-285x380.jpg', 6),
new VideoGame(80, 'Diablo III: Reaper of Souls', 86300,
'https://static-cdn.jtvnw.net/ttv-boxart/Diablo%20III:%20Reaper%20of%20Souls-285x380.jpg', 6),
new VideoGame(81, 'Total War: Warhammer II', 86400,
'https://static-cdn.jtvnw.net/ttv-boxart/Total%20War:%20Warhammer%20II-285x380.jpg', 6)
];

private categories: Category[];
updateCategories: Subject<Category[]>;
private points = 0;
updatePoints = new Subject<number>(); 
gamesplayed: Partida[]; 
updateGamePlayed = new Subject<Partida[]>();
private lastId = 1;
private sameCategoryGames: VideoGame[] = [];
aux: number;

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
           console.log('added successfully'); // Significa que fue existoso
      }
  };
  this.updateGamePlayed.next(this.gamesplayed.slice());
  }

  updateGame(id, userid, score, username, date) {
    this.notificarCambiosGames();

    console.log('datos entry', id, score, 'juegos', this.gamesplayed);
    let pos = this.gamesplayed.findIndex(ga => ga.game_id === id );
    console.log('posicion: ', pos);
    if (pos >= 0) {
      if (userid == this.gamesplayed[pos].user_id) {
        this.gamesplayed[pos].score = score;
        this.gamesplayed[pos].turn_user_id = this.gamesplayed[pos].opponent_id;
        this.gamesplayed[pos].createDate = date;
      } else {
        if (userid == this.gamesplayed[pos].opponent_id) {
          this.gamesplayed[pos].opponent_score = score;
          this.gamesplayed[pos].game_over = 1;
          this.gamesplayed[pos].answerDate = date;
          if (this.gamesplayed[pos].opponent_score > this.gamesplayed[pos].score) {
            this.gamesplayed[pos].winner_id = this.gamesplayed[pos].opponent_id;
          } else {
            this.gamesplayed[pos].winner_id = this.gamesplayed[pos].user_id;
          }
        }
      }
     this.updateHighScore(score,pos, username);
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

  updateHighScore(score, pos, username) {
    let cat= this.categories.findIndex(c => c.id == this.gamesplayed[pos].category_id);
    console.log('categoria que etamos actualizando hs: ', cat);

    let hs = this.categories[cat].highscore.findIndex(h => h.username === username);

    if (hs >= 0) {
      if (score > this.categories[cat].highscore[hs].score) {
        this.categories[cat].highscore[hs].score = score;
      }
    } else {
      this.categories[cat].highscore.push(new HighScore(username, score));
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

  notificarCambiosGames(){
    this.updateGamePlayed.next(this.gamesplayed.slice());
  }

  getGames(id) {
    this.sameCategoryGames.splice(0, this.sameCategoryGames.length);
    let pos = this.gamesplayed.findIndex(ga => ga.game_id == id );
    let cat = this.gamesplayed[pos].category_id;
    console.log('game index: ', pos, 'categoria: ', cat);
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
    this.aux ++;
    console.log('samecategory: ', this.sameCategoryGames, 'aux: ', this.aux,);

    if (this.points + 1 < this.sameCategoryGames.length) {
      return this.sameCategoryGames.slice(this.aux, this.aux + 2);
    } else {
      return Object.assign({});
    }
  }

  private getPointsUpdate() {
    this.updatePoints.next(this.points);
  }

  reset() {
    this.points = 0;
    this.aux =0;
  }

  sumPoints() {
    this.points ++;
    this.getPointsUpdate();
  }

  getInitialScore()
{
  return this.points;
}
}
