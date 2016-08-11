import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import lodash from 'lodash';

import { Page2Service } from './page2.service';
import { Hero } from '../types';


@Component({
  // moduleId: module.id,
  selector: 'my-page2',
  // template: `
  //   <h3>{{modeName}}</h3>

  //   <form *ngIf="hero" (ngSubmit)="onSubmit()" #heroForm="ngForm">
  //     <div class="form-group row">
  //       <label for="id" class="col-xs-2 col-form-label">Id: </label>
  //       <div class="col-xs-10">
  //         <input class="form-control" type="number" id="id" [(ngModel)]="hero.id" name="id" #id="ngModel" required [disabled]="!isAdding" #spy>
  //         <div [hidden]="id.valid || id.pristine" class="alert alert-danger">
  //           Id is required
  //         </div>       
  //         <pre>className: {{spy.className}}</pre>   
  //       </div>
  //     </div>
  //     <div class="form-group row">
  //       <label for="name" class="col-xs-2 col-form-label">Name: </label>
  //       <div class="col-xs-10">
  //         <input class="form-control" type="text" id="name" [(ngModel)]="hero.name" name="name" #name="ngModel" required #spy>
  //         <div [hidden]="name.valid || name.pristine" class="alert alert-danger">
  //           Name is required
  //         </div>
  //         <pre>className: {{spy.className}}</pre>          
  //       </div>
  //     </div>
  //     <pre>{{hero | json}}</pre>
  //     <button type="submit" class="btn btn-outline-primary" [disabled]="!heroForm.form.valid">Submit</button>
  //     <pre>heroForm.form.valid: {{heroForm.form.valid | json}}</pre>
  //   </form>    
  // `,
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
        style({ transform: 'translateX(-20%)', opacity: 0 }),
        animate(100)
      ]),
      transition('* => void', animate(100, style({ transform: 'translateX(20%)', opacity: 0 })))
    ])
  ]
})
export class Page2Component implements OnInit, OnDestroy, AfterViewInit {
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
    this.route.params.forEach(async (params: Params) => {
      const heroes: Hero[] = await this.service.heroes$.take(1).toPromise();
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

  ngOnDestroy() { }


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