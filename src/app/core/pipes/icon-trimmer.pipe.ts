import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconTrimmer'
})
export class IconTrimmerPipe implements PipeTransform {
  transform(urlName: string): any {
    const splitted = urlName.split('/');
    return splitted[splitted.length - 1];
  }

}
