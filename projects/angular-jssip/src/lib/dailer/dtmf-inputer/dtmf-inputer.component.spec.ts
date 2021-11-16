import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtmfInputerComponent } from './dtmf-inputer.component';

describe('DtmfInputerComponent', () => {
  let component: DtmfInputerComponent;
  let fixture: ComponentFixture<DtmfInputerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DtmfInputerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DtmfInputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
