import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionPadComponent } from './function-pad.component';

describe('FunctionPadComponent', () => {
  let component: FunctionPadComponent;
  let fixture: ComponentFixture<FunctionPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionPadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
