import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import lodash from 'lodash';

import { Page2Service } from './page2.service';
import { Hero } from '../types';


@Component({
  // moduleId: module.id,
  selector: 'my-page2',
  templateUrl: 'page2.template.html',
  styleUrls: ['page2.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[@routeAnimation]': 'true',
    '[style.display]': "'block'",
    '[style.position]': "'absolute'"
  },
  animations: [
    trigger('routeAnimation', [
      state('*', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateX(-30%)', opacity: 0 }),
        animate(200)
      ]),
      transition('* => void', animate(200, style({ transform: 'translateX(30%)', opacity: 0 })))
    ])
  ]
})
export class Page2Component implements OnInit, AfterViewInit {
  hero: Hero;
  isAdding: boolean = false;

  constructor(
    public service: Page2Service,
    public route: ActivatedRoute,
    public router: Router,
    public cd: ChangeDetectorRef,
    public el: ElementRef
  ) { }

  ngOnInit() {
    /*
      Observable.forEach()は公式チュートリアルで使われている書き方ではあるが、
      メモリーリークの原因となるので非推奨。
    */
    this.route.params.forEach(async (params: Params) => {
      const heroes: Hero[] = await this.service.heroes$.first().toPromise();
      if (params['id']) { // Editing Mode
        const id: number = +params['id'];
        const selectedHero: Hero | undefined = heroes.find(hero => hero.id === id);
        if (selectedHero) {
          this.hero = selectedHero;
        } else {
          alert('no hero for the explicit id.');
          this.router.navigate(['/page1']);
        }
      } else { // Adding Mode        
        const newId: number = heroes.length > 0 ? lodash.maxBy(heroes, 'id').id + 1 : 1;
        this.hero = new Hero();
        this.hero.id = newId;
        this.isAdding = true;
      }
      this.cd.markForCheck();
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.isAdding) {
        (<HTMLInputElement>(<HTMLElement>this.el.nativeElement).querySelector('input#id')).focus();
      } else {
        (<HTMLInputElement>(<HTMLElement>this.el.nativeElement).querySelector('input#name')).focus();
      }
      this.cd.markForCheck();
    }, 0);
  }


  onSubmit() {
    this.service.save(this.hero, this.isAdding);
    this.router.navigate(['/page1']);
  }

  get modeName() {
    if (this.isAdding) {
      return 'Adding Mode';
    } else {
      return 'Editing Mode';
    }
  }

}