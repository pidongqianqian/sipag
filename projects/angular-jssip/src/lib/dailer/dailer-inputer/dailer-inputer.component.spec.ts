import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailerInputerComponent } from './dailer-inputer.component';

describe('DailerInputerComponent', () => {
  let component: DailerInputerComponent;
  let fixture: ComponentFixture<DailerInputerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailerInputerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailerInputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
