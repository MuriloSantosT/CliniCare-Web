import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { NewPatient } from './new-patient';

describe('NewPatient', () => {
  let component: NewPatient;
  let fixture: ComponentFixture<NewPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPatient],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPatient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
