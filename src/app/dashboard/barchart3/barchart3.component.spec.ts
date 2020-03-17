import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Barchart3Component } from './barchart3.component';

describe('Barchart3Component', () => {
  let component: Barchart3Component;
  let fixture: ComponentFixture<Barchart3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Barchart3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Barchart3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
