import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import lodash from 'lodash';
import { FORM_DIRECTIVES, FormBuilder, FormGroup, FormControl, REACTIVE_FORM_DIRECTIVES, Validators } from '@angular/forms';

import { Page2Service } from './page2.service';
import { Hero } from '../types';

import 'rxjs/add/operator/toPromise';

@Component({
  moduleId: module.id,
  selector: 'my-page2',
  template: `
    <h3>{{modeName}}</h3>

    <div *ngIf="!!hero">
      <form #form="ngForm">
        <div *ngIf="isAdding">
          <input type="number" [(ngModel)]="hero.id" name="id">
        </div>
        <div *ngIf="!isAdding">
          <input type="number" [(ngModel)]="hero.id" name="id" disabled>
        </div>
        <input type="text" [(ngModel)]="hero.name" name="name">
      </form>
    </div>

    <button (click)="save()" >Save</button>
  `,
  directives: [REACTIVE_FORM_DIRECTIVES],
  providers: [Page2Service, FormBuilder],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page2Component implements OnInit {
  hero: Hero;
  isAdding: boolean = false;
  private _disSubs: Subscription[] = []; // disposable subscriptions
  set disSub(sub: Subscription) { this._disSubs.push(sub); }
  get disSubs() { return this._disSubs; }

  constructor(
    public service: Page2Service,
    public route: ActivatedRoute,
    public router: Router,
    public cd: ChangeDetectorRef,
    public formBuilder: FormBuilder
  ) {
    this.disSub = this.route.params.subscribe(params => {
      console.log(params);
      if (params['id']) {
        const id = +params['id'];
        this.disSub = this.service.heroes$.subscribe(heroes => {
          console.log(heroes)
          const selectedHero = heroes.find(hero => hero.id === id);
          if (selectedHero) {
            this.hero = selectedHero;
          } else {
            alert('no hero for the explicit id.');
            this.router.navigate(['/page1']);
          }
        });
      } else {
        this.hero = new Hero();
        this.isAdding = true;
      }
    })
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.disSubs.length > 0) {
      this.disSubs.forEach(disSub => disSub.unsubscribe());
    }
  }

  save() {
    console.log(this.hero);
    // console.log(this.registerForm.value.hero);
    // const hero: Hero = this.registerForm.value.hero;
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

  registerForm = new FormGroup({
    hero: new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
    })
  });

}