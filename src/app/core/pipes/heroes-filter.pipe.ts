import { Pipe, PipeTransform } from '@angular/core';
import { IHeroStat } from '../interfaces/hero-stat-interface';

@Pipe({
  name: 'heroesFilter'
})
export class HeroesFilterPipe implements PipeTransform {

  transform(heroes: IHeroStat[], searchText: string): any {
    return heroes.filter(h => h.localized_name.toLowerCase().includes(searchText.toLowerCase()));
  }

}
