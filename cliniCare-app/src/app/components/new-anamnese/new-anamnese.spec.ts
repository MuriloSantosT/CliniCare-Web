import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { NewAnamnese } from './new-anamnese';

describe('NewAnamnese', () => {
  let component: NewAnamnese;
  let fixture: ComponentFixture<NewAnamnese>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAnamnese],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { params: of({ patientId: '1' }), snapshot: { paramMap: { get: (k: string) => k === 'patientId' ? '1' : null }, params: { patientId: '1' } } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAnamnese);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
