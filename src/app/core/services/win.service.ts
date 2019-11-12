import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WinService {
  winsPercent = [47.36, 49.93, 51.08, 50.38, 48.77, 49.70, 54.07, 45.91, 46.82, 52.83, 52.23,  53.38, 52.81, 48.03, 54.63];

  constructor() { }

  get middleWin() {
    let wr = 0;

    this.winsPercent.forEach(win => {
      wr += win;
    });

    return wr / this.winsPercent.length;
  }
}
