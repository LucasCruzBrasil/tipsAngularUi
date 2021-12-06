import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTipComponent } from './form-tip.component';

describe('FormTipComponent', () => {
  let component: FormTipComponent;
  let fixture: ComponentFixture<FormTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
