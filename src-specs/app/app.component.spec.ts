/* >>> boilerplate */
import assert from 'power-assert';
import lodash from 'lodash';
import { inject, async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { asyncPower, setTimeoutPromise, elements, elementText, elementValue } from '../../test-ng2/testing.helper';
/* <<< boilerplate */


////////////////////////////////////////////////////////////////////////
// modules
import { AppComponent } from '../../src/app/app.component';

import { Directive } from '@angular/core';
import { RouterLink, RouterLinkWithHref, RouterLinkActive, ROUTER_DIRECTIVES, Router } from '@angular/router';


////////////////////////////////////////////////////////////////////////
// mocks
// class Mock { }
// class MockRouter {
//   createUrlTree() { }
// }

// @Directive({ selector: '[routerLinkActive]' })
// class MockRouterLinkActiveDirective {
//   constructor() { }
// }

// @Directive({ selector: 'a[routerLink]' })
// class MockRouterLinkDirective { }

const mockTemplate = `
  <h2>{{title}}</h2>
  <nav class="navbar navbar-light bg-faded">
    <ul class="nav navbar-nav">
      <li class="nav-item">
        <a class="nav-link">HeroList</a>
      </li>
      <li class="nav-item">
        <a class="nav-link">Add/Edit</a>
      </li>
    </ul>
  </nav>
`;


////////////////////////////////////////////////////////////////////////
// tests
describe('TEST: App Component', () => {
  /* >>> boilerplate */
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        // { provide: Router, useClass: MockRouter }
      ]
    });
  });
  /* <<< boilerplate */


  it('can create, should have title', asyncPower(async () => {
    await TestBed
      .overrideComponent(AppComponent, { set: { template: mockTemplate } })
      .compileComponents();
    const fixture = TestBed.createComponent(AppComponent);
    assert(!!fixture);
    const el = fixture.debugElement.nativeElement as HTMLElement;
    const component = fixture.componentInstance;

    assert(component.title === 'Heroes Editor');
    assert(elementText(el, 'h2') === '');
    fixture.detectChanges();
    assert(elementText(el, 'h2') === 'Heroes Editor');
  }));


  it('can create, should have title (fakeAsync ver.)', fakeAsync(() => {
    TestBed
      .overrideComponent(AppComponent, { set: { template: mockTemplate } })
      .compileComponents();
    tick();
    const fixture = TestBed.createComponent(AppComponent);
    assert(!!fixture);
    const el = fixture.debugElement.nativeElement as HTMLElement;
    const component = fixture.componentInstance;

    assert(component.title === 'Heroes Editor');
    assert(elementText(el, 'h2') === '');
    fixture.detectChanges();
    assert(elementText(el, 'h2') === 'Heroes Editor');
  }));

});
