import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnamnese } from './new-anamnese';

describe('NewAnamnese', () => {
  let component: NewAnamnese;
  let fixture: ComponentFixture<NewAnamnese>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAnamnese]
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
