import { Pipe, PipeTransform } from '@angular/core';
import { IHeroStat } from '../interfaces/hero-stat-interface';

@Pipe({
  name: 'heroesFilter'
})
export class HeroesFilterPipe implements PipeTransform {

  transform(heroes: IHeroStat[], searchText: string, selectedHeroes?: any[]): any {
    if (selectedHeroes && selectedHeroes.length) {
      return heroes
      .filter(h => h.localized_name.toLowerCase().includes(searchText.toLowerCase()))
      .filter(hero => !selectedHeroes.some(selectedhero => selectedhero.hero_id === hero.hero_id));
    } else {
      return heroes
      .filter(h => h.localized_name.toLowerCase().includes(searchText.toLowerCase()));
    }

  }

}
