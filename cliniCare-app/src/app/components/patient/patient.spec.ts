import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { PatientComponent } from './patient';
import { PatientService } from '../../services/patient.service';

describe('PatientComponent', () => {
  let component: PatientComponent;
  let fixture: ComponentFixture<PatientComponent>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: '1' }) }
        }
      ]
    }).compileComponents();

    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PatientComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => http.verify());

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('carrega paciente ao inicializar', fakeAsync(() => {
    const mockPatient = {
      id: 1, nome: 'João Silva', cpf: '123.456.789-00',
      dataNascimento: '2015-03-10', sexo: 'M'
    };

    fixture.detectChanges();

    const patientReq = http.expectOne('http://localhost:8080/patient/1');
    patientReq.flush(mockPatient);

    const anamneseReq = http.expectOne('http://localhost:8080/anamnese/paciente/1');
    anamneseReq.flush([]);

    tick();
    expect(component.patient).toEqual(mockPatient as any);
  }));

  it('documentTypeTitle retorna texto correto para cada tipo', () => {
    component.documentType = 'evolution';
    expect(component.documentTypeTitle).toBe('Ficha de Evolução');

    component.documentType = 'reports';
    expect(component.documentTypeTitle).toBe('Relatórios');

    component.documentType = 'anamnese';
    expect(component.documentTypeTitle).toBe('Anamneses');
  });

  it('toggleDocumentMenu alterna showDocumentTypeMenu', () => {
    expect(component.showDocumentTypeMenu).toBeFalse();
    component.toggleDocumentMenu();
    expect(component.showDocumentTypeMenu).toBeTrue();
    component.toggleDocumentMenu();
    expect(component.showDocumentTypeMenu).toBeFalse();
  });

  it('enderecoCompleto retorna string vazia sem paciente', () => {
    component.patient = null;
    expect(component.enderecoCompleto).toBe('');
  });
});
