import { GameMode } from './../enums/game-mode.enum';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameMode'
})
export class GameModePipe implements PipeTransform {
  GameMode = GameMode;
  transform(gm: number): any {
    for (const [key, value] of Object.entries(GameMode)) {
      if (gm === value) {
        return key;
      }
    }
    return gm;
  }

}
