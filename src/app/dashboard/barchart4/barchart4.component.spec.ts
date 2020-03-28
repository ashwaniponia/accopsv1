import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Barchart4Component } from './barchart4.component';

describe('Barchart4Component', () => {
  let component: Barchart4Component;
  let fixture: ComponentFixture<Barchart4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Barchart4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Barchart4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
