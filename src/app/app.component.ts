
import { filter } from 'rxjs/operators';
import { HeroesService } from './core/services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { IHeroStat } from './core/interfaces/hero-stat-interface';
import { GamesService, Live } from './core/services/games.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'od';
  games: Live[] = [];
  matchInfo: MatchInfo = null;
  radiantHeroes: any[] = [];
  direHeroes: any[] = [];
  matchinfoLoading = false;
  radiantWin = 0;
  direWin = 0;
  input: number;

  constructor(private heroesService: HeroesService, private gamesService: GamesService) {

  }

  ngOnInit() {
    this.gamesService.getLiveProGames().subscribe((games: Live[] ) => this.games = games);
  }

  refreshLiveData() {
    this.gamesService.getLiveGames().subscribe((games: Live[] ) => this.games = games);
  }

  get winDiff() {
    return this.radiantWin / 25 - this.direWin / 25;
  }

  getInfo(matchId) {
    this.matchinfoLoading = true;
    this.radiantWin = 0;
    this.direWin = 0;
    this.gamesService.getMatchInfo(matchId).subscribe((matchInfo: MatchInfo) => {
      if (isNullOrUndefined(matchInfo)) { return; }
      this.matchInfo = matchInfo;
      this.radiantHeroes = this.matchInfo.players.filter(player => player.player_slot < 5).map(player => player.hero_id);
      this.direHeroes = this.matchInfo.players.filter(player => player.player_slot >= 5).map(player => player.hero_id);
      this.matchInfo.players.forEach((player, index) => {
        if (player.player_slot < 5) {
          this.getMatchUp(player.hero_id, true, index);
        } else {
          this.getMatchUp(player.hero_id, false, index);
        }
      });
      this.matchinfoLoading = false;
    });
  }

  getMatchUp(heroId, isRadiant, index) {
    this.heroesService.getHeroMatchups(heroId).subscribe(matchups => {
      let actualMatchup = [];
      let winPercent = 0;
      if (isRadiant) {
        this.direHeroes.forEach(hId => {
          const filteredHero = matchups.filter(matchup => hId === matchup.hero_id)[0];
          winPercent = winPercent + ((filteredHero.wins * 100) / filteredHero.games_played);
          actualMatchup = [...actualMatchup, filteredHero];
        });
      } else {
        this.radiantHeroes.forEach(hId => {
          const filteredHero = matchups.filter(matchup => hId === matchup.hero_id)[0];
          winPercent = winPercent + ((filteredHero.wins * 100) / filteredHero.games_played);
          actualMatchup = [...actualMatchup, filteredHero];
        });
      }
      this.matchInfo.players[index]['win_percent'] = this.matchInfo.players[index]['win_percent'] ?
      this.matchInfo.players[index]['win_percent'] + winPercent : winPercent;

      if (isRadiant) {
        this.radiantWin = this.radiantWin + this.matchInfo.players[index]['win_percent'];
      } else {
        this.direWin = this.direWin + this.matchInfo.players[index]['win_percent'];
      }

      this.matchInfo.players[index]['matchups'] = actualMatchup;
    });
  }

}
