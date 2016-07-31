/* >>> boilerplate */
import assert from 'power-assert';
import lodash from 'lodash';
import { inject, async, fakeAsync, tick, addProviders, TestComponentBuilder, ComponentFixture } from '@angular/core/testing';
import { asyncPower, fakeAsyncPower, setTimeoutPromise, elements, elementText, elementValue } from '../../test-ng2/testing.helper';
/* <<< boilerplate */


////////////////////////////////////////////////////////////////////////
// modules
import { Page2Component } from '../../src/page2/page2.component';
import { Store, Dispatcher, Action } from '../../src/store';
import { Hero } from '../../src/types';

import { ActivatedRoute, Router } from '@angular/router';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { Observable } from 'rxjs/Rx';


////////////////////////////////////////////////////////////////////////
// mocks
class MockStore {
  private heroes: Hero[] = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
  ];
  get heroes$(): Observable<Hero[]> {
    return Observable.of(this.heroes);
  }
}
class MockActivatedRoute {
  get params(): Observable<{ id: string }> {
    return Observable.of({ id: '16' });
  }
}
class Mock { }


////////////////////////////////////////////////////////////////////////
// tests
describe('TEST: HeroDetail Component', () => {
  /* >>> boilerplate */
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      disableDeprecatedForms(),
      provideForms(),
      { provide: Dispatcher, useValue: new Dispatcher<Action>() },
      { provide: Store, useClass: MockStore },
      { provide: ActivatedRoute, useClass: MockActivatedRoute },
      { provide: Router, useClass: Mock }
    ]);
  });

  beforeEach(inject([TestComponentBuilder], (tcb) => {
    builder = tcb;
  }));
  /* <<< boilerplate */


  it('can create, should have a selected hero', fakeAsyncPower(() => {
    const fixture = builder.createFakeAsync(Page2Component);
    tick();
    assert(!!fixture);
    if (fixture) {
      const el = fixture.nativeElement as HTMLElement;
      const component = fixture.componentRef.instance;
      assert(elementText(el, 'h3') === '');
      component.ngOnInit();
      tick();
      assert.deepEqual(component.hero, { id: 16, name: 'RubberMan' });
      fixture.detectChanges();
      assert(elementText(el, 'h3') === 'Editing Mode');
      tick();
      fixture.detectChanges();
      assert(elementValue(el, 'input#id') === '16');
      assert(elementValue(el, 'input#name') === 'RubberMan');
    }
  }));

});