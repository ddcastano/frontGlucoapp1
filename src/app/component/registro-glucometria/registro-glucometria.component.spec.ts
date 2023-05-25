import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroGlucometriaComponent } from './registro-glucometria.component';

describe('RegistroGlucometriaComponent', () => {
  let component: RegistroGlucometriaComponent;
  let fixture: ComponentFixture<RegistroGlucometriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroGlucometriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroGlucometriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
