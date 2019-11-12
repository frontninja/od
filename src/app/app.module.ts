import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClarityModule, ClrStackViewModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeroesFilterPipe } from './core/pipes/heroes-filter.pipe';
import { IconTrimmerPipe } from './core/pipes/icon-trimmer.pipe';
import { GameModePipe } from './core/pipes/game-mode.pipe';
import { HeroPipe } from './core/pipes/hero.pipe';
import { HeroChooseComponent } from './hero-choose/hero-choose.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeroesFilterPipe,
    IconTrimmerPipe,
    GameModePipe,
    HeroPipe,
    HeroChooseComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [GameModePipe]
})
export class AppModule { }
