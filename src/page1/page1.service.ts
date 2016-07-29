import { Injectable } from '@angular/core';

import { Store, Dispatcher, Action, EditHero, AddHero, DeleteHero } from '../store';
import { Hero } from '../types';


@Injectable()
export class Page1Service {

  constructor(
    public store: Store,
    public dispatcher$: Dispatcher<Action>
  ) { }


  deleteHero(hero: Hero) {
    this.dispatcher$.next(new DeleteHero(hero.id));
  }

  get heroes$() { return this.store.heroes$; }

}