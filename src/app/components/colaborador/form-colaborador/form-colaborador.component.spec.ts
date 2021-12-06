import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormColaboradorComponent } from './form-colaborador.component';

describe('FormColaboradorComponent', () => {
  let component: FormColaboradorComponent;
  let fixture: ComponentFixture<FormColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormColaboradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
