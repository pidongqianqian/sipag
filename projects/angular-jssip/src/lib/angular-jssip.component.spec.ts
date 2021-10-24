import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularJssipComponent } from './angular-jssip.component';

describe('AngularJssipComponent', () => {
  let component: AngularJssipComponent;
  let fixture: ComponentFixture<AngularJssipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularJssipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularJssipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
