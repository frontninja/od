import { HeroesService } from './../services/heroes.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hero'
})
export class HeroPipe implements PipeTransform {
  constructor(private heroesService: HeroesService) {}
  transform(heroId: any, value: 'name' | 'img' = 'name'): any {
    let val;
    this.heroesService.heroes$.subscribe(res => {
      if (res && res.length) {
        val = res.filter(hero => hero.hero_id === heroId)[0];
      }
    });
    return value === 'name' ? val.localized_name : val.icon;
  }
}
