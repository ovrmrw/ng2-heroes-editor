import { Injectable } from '@angular/core';

import { Store, Dispatcher, Action, EditHero, AddHero, DeleteHero } from '../store';
import { Hero } from '../types';


@Injectable()
export class Page2Service {

  constructor(
    public store: Store,
    public dispatcher$: Dispatcher<Action>
  ) { }


  save(hero: Hero, isAdding: boolean) {
    if (isAdding) {
      this.dispatcher$.next(new AddHero(hero));
    } else {
      this.dispatcher$.next(new EditHero(hero));
    }
  }

  get heroes$() { return this.store.heroes$.debounceTime(1000); }

}