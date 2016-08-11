/* >>> boilerplate */
import assert from 'power-assert';
import lodash from 'lodash';
import { inject, async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { asyncPower, setTimeoutPromise, elements, elementText, elementValue } from '../../test-ng2/testing.helper';
/* <<< boilerplate */


////////////////////////////////////////////////////////////////////////
// modules
import { Page2Component } from '../../src/page2/page2.component';
import { Page2Service } from '../../src/page2/page2.service';
import { Store, Dispatcher } from '../../src/store';
import { Hero } from '../../src/types';

import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [Page2Component],
      providers: [
        Dispatcher,
        { provide: Store, useClass: MockStore },
        Page2Service,
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: Mock }
      ]
    });
  });
  /* <<< boilerplate */


  it('can create, should have a selected hero', asyncPower(async () => {
    await TestBed.compileComponents();
    const fixture = TestBed.createComponent(Page2Component);
    assert(!!fixture);
    const el = fixture.debugElement.nativeElement as HTMLElement;
    const component = fixture.componentInstance;

    component.ngOnInit();
    await fixture.whenStable();
    assert.deepEqual(component.hero, { id: 16, name: 'RubberMan' });
    fixture.detectChanges();
    component.ngAfterViewInit();
    await fixture.whenStable();
    fixture.detectChanges();

    assert(elementText(el, 'h3') === 'Editing Mode');
    assert(elementValue(el, 'input') === '16');
    assert(elementValue(el, 'input#name') === 'RubberMan');
  }));


  it('can create, should have a selected hero (fakeAsync ver.)', fakeAsync(() => {
    TestBed.compileComponents();
    tick();
    const fixture = TestBed.createComponent(Page2Component);
    assert(!!fixture);
    const el = fixture.debugElement.nativeElement as HTMLElement;
    const component = fixture.componentInstance;

    component.ngOnInit();
    tick();
    assert.deepEqual(component.hero, { id: 16, name: 'RubberMan' });
    fixture.detectChanges();
    component.ngAfterViewInit();
    tick();
    fixture.detectChanges();

    assert(elementText(el, 'h3') === 'Editing Mode');
    assert(elementValue(el, 'input') === '16');
    assert(elementValue(el, 'input#name') === 'RubberMan');
  }));

});