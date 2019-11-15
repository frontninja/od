import { HeroesService } from './../core/services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { IHeroStat } from '../core/interfaces/hero-stat-interface';


export interface Side {
  win: number;
  heroes: any[];
}

@Component({
  selector: 'app-hero-choose',
  templateUrl: './hero-choose.component.html',
  styleUrls: ['./hero-choose.component.scss']
})
export class HeroChooseComponent implements OnInit {


  heroes: IHeroStat[] = [];
  heroesSearch = '';

  radiant: Side;
  dire: Side;

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
    this.clear();
    this.heroesService.heroes$.subscribe(res => {
      if (res) {
        this.heroes = res;
      }
    });
  }

  clear() {
    this.radiant = {
      win: 0,
      heroes: []
    };
    this.dire = {
      win: 0,
      heroes: []
    };
  }

  get winDiff() {
    return this.radiant.win / 25 - this.dire.win / 25;
  }

  get selectedHeroes() {
    return [...this.radiant.heroes, ...this.dire.heroes];
  }

  addRadiant(heroId) {
    if (this.radiant.heroes.length < 5) {
      this.radiant.heroes.push({
        hero_id: heroId,
        matchups: [],
        win: 0
      });
      this.heroesSearch = '';
    }
  }

  addDire(heroId) {
    if (this.dire.heroes.length < 5) {
      this.dire.heroes.push({
        hero_id: heroId,
        matchups: [],
        win: 0
      });
      this.heroesSearch = '';
    }
  }



  generate() {
    this.radiant.heroes.forEach((hero, index) => {
      this.getMatchup(hero.hero_id, true, index);
    });
    this.dire.heroes.forEach((hero, index) => {
      this.getMatchup(hero.hero_id, false, index);
    });
  }

  getMatchup(heroId, isRadiant, index) {
    this.heroesService.getHeroMatchups(heroId).subscribe(matchups => {
      let actualMatchup = [];
      let winPercent = 0;
      if (isRadiant) {
        this.dire.heroes.forEach(h => {
          const filteredHero = matchups.filter(matchup => h.hero_id === matchup.hero_id)[0];
          winPercent = winPercent + ((filteredHero.wins * 100) / filteredHero.games_played);
          actualMatchup = [...actualMatchup, filteredHero];
        });
        this.radiant.heroes[index].matchups = actualMatchup;
        this.radiant.heroes[index].win = this.radiant.heroes[index].win ? this.radiant.heroes[index].win + winPercent : winPercent;
        this.radiant.win = this.radiant.win + this.radiant.heroes[index].win;
      } else {
        this.radiant.heroes.forEach(h => {
          const filteredHero = matchups.filter(matchup => h.hero_id  === matchup.hero_id)[0];
          winPercent = winPercent + ((filteredHero.wins * 100) / filteredHero.games_played);
          actualMatchup = [...actualMatchup, filteredHero];
        });
        this.dire.heroes[index].matchups = actualMatchup;
        this.dire.heroes[index].win = this.dire.heroes[index].win ? this.dire.heroes[index].win + winPercent : winPercent;
        this.dire.win = this.dire.win + this.dire.heroes[index].win;
      }
    });
  }

}
