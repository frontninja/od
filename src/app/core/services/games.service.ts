import { GameMode } from './../enums/game-mode.enum';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Live {
  activate_time: number;
  deactivate_time: number;
  server_steam_id: string;
  lobby_id: string;
  league_id: number;
  lobby_type: number;
  game_time: number;
  delay: number;
  spectators: number;
  game_mode: number;
  average_mmr: number;
  match_id: number;
  series_id: number;
  sort_score: number;
  last_update_time: number;
  radiant_lead: number;
  radiant_score: number;
  dire_score: number;
  players: Player[];
  building_state: number;
}

export interface Player {
  account_id: number;
  hero_id: number;
  name?: string;
  country_code?: string;
  fantasy_role?: number;
  team_id?: number;
  team_name?: string;
  team_tag?: string;
  is_locked?: boolean;
  is_pro?: boolean;
  locked_until?: any;
}

const APY_KEY = '?api_key=c408cb7b-2e7e-44b7-8a43-4a096fb05d19';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  getLiveGames(): Observable<Live[]> {
    return this.http.get<Live[]>(`https://api.opendota.com/api/live${APY_KEY}`);
  }

  getLiveProGames(): Observable<Live[]> {
    return this.http.get<Live[]>(`https://api.opendota.com/api/live${APY_KEY}`)
    .pipe(map(games => {
      return games.filter(game => game.lobby_type === 1);
    }));
  }

  getMatchInfo(matchId): Observable<MatchInfo> {
    return this.http.get<MatchInfo>(`https://api.opendota.com/api/matches/${matchId}${APY_KEY}`);
  }
}
