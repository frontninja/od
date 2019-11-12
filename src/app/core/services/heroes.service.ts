import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IHeroStat } from '../interfaces/hero-stat-interface';

const APY_KEY = '?api_key=c408cb7b-2e7e-44b7-8a43-4a096fb05d19';


@Injectable({
  providedIn: 'root'
})


export class HeroesService {

  heroes$ = new BehaviorSubject<IHeroStat[]>([]);

  constructor(private http: HttpClient) {
    this.getHeroes().subscribe(res => {
      this.heroes$.next(res);
    });
  }

  getHeroes(): Observable<IHeroStat[]> {
    return this.http.get<IHeroStat[]>(`https://api.opendota.com/api/heroStats${APY_KEY}`);
  }

  getHeroMatchups(heroId): Observable<any> {
    return this.http.get<MatchInfo>(`https://api.opendota.com/api/heroes/${heroId}/matchups${APY_KEY}`);
  }
}
