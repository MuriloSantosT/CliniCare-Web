import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EditPatient } from './edit-patient';

describe('EditPatient', () => {
  let component: EditPatient;
  let fixture: ComponentFixture<EditPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPatient],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }), snapshot: { params: { id: '1' } } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPatient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});