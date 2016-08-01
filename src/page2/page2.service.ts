import { Injectable } from '@angular/core';

import { Store, Dispatcher, Action, EditHero, AddHero, DeleteHero } from '../store';
import { Hero } from '../types';
import { logger } from '../helper';


@Injectable()
export class Page2Service {

  constructor(
    public store: Store,
    public dispatcher$: Dispatcher<Action>
  ) { }


  save(hero: Hero, isAdding: boolean) {
    if (typeof hero.id === 'number' && typeof hero.name === 'string') {
      if (isAdding) {        
        this.dispatcher$.next(new AddHero(hero));
      } else {
        this.dispatcher$.next(new EditHero(hero));
      }
      logger('Page2Service - save', 'Added/Edited Hero', hero);
    } else {
      console.error(hero);
      console.error('type of hero is not allowed to save.');
    }
  }

  get heroes$() { return this.store.heroes$; }

}