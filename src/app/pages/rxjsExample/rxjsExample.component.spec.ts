import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsExampleComponent } from './rxjsExample.component';

describe('HomeComponent', () => {
  let component: RxjsExampleComponent;
  let fixture: ComponentFixture<RxjsExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RxjsExampleComponent]
    });
    fixture = TestBed.createComponent(RxjsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
