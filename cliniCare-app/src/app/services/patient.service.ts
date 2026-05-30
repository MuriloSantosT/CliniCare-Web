import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Guardian {
  id?: number;
  nome: string;
  cpf: string;
  telefone?: string;
}

export interface Patient {
  id?: number;

  nome: string;
  cpf: string;
  dataNascimento: string;
  sexo: string;

  alergias?: string;
  convenio?: string;
  telefoneEmergencia?: string;
  observacoesGerais?: string;
  medicamentos?: string;
  acompanhamentoProfissional?: string;
  cirurgiasPrevias?: string;
  deficienciaTranstorno?: string;

  gravidezPlanejada?: string;
  usoBebidasAlcoolicas?: string;
  gestacaoParto?: string;
  usoMedicamentosGestacao?: string;
  idadeGravidez?: string;
  fezPreNatal?: string;
  partoPrematuro?: string;
  condicoesBebe?: string;
  duracaoParto?: string;
  usouForceps?: string;
  pontuacaoApgar?: string;
  triagemNeonatal?: string;
  bebeRecebeuVacinas?: string;
  problemaSaudeNascimento?: string;

  pesoBebe?: string;
  tamanhoBebe?: string;
  alimentacaoPrimeirosMeses?: string;
  sonoPrimeirosMeses?: string;
  interacaoAmbiente?: string;
  contatoVisual?: string;
  sorria?: string;
  deitava?: string;
  inicioEngatinhar?: string;
  inicioRodar?: string;
  inicioSentar?: string;
  inicioAndar?: string;

  primeiraspalavras?: string;
  primeirasFrases?: string;
  quandoApontou?: string;
  alimentacaoBebeCrianca?: string;
  tipoBebe?: string;

  comportamentoCasa?: string;
  comunidade?: string;
  possuiRelatorioEscola?: string;
  possuiPdi?: string;
  interesseAtividades?: string;
  lidaComRegras?: string;
  pontuacaoProfessora?: string;
  habilidadesMotFinas?: string;
  habilidadesMotGrossas?: string;

  memoria?: string;
  atencao?: string;
  compreensao?: string;
  linguagemCognicao?: string;

  desafios?: string;
  potencialidades?: string;

  pessoaQueSeIdentifica?: string;
  brincaComCriancas?: string;
  preferenciaBrinquedos?: string;
  sonoAtual?: string;
  atividadesVidaDiaria?: string;
  oQueFazPede?: string;
  rotinaCuidados?: string;
  tempoTela?: string;
  rendaFamiliar?: string;
  relacaoFamiliar?: string;
  observacoes?: string;

  nomeEscola?: string;
  telefoneEscola?: string;
  ano?: string;
  periodo?: string;

  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  complemento?: string;

  responsaveis?: Guardian[];

  nomeMae?: string;
  idadeMae?: string;
  profissaoMae?: string;
  nomePai?: string;
  idadePai?: string;
  profissaoPai?: string;

  createdAt?: string;
  updatedAt?: string;
  
  user?: any;
}

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  private api = 'http://localhost:8080/patient';

  constructor(private http: HttpClient) {}

  listar(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.api}/listar`);
  }

  listarPorUsuario(userId: number): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.api}/listar/${userId}`);
  }

testar() {
  return this.http.get(`${this.api}/fast`, {
    responseType: 'text'
  });
}

  getById(id: number, userId: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.api}/${id}?userId=${userId}`);
  }

  adicionar(patient: Patient): Observable<Patient> {
    // Remove campos que causam problemas na serialização
    const pacienteParaEnviar: Partial<Patient> = { ...patient };
    
    // Remove campos vazios e undefined para evitar conflitos de serialização
    Object.keys(pacienteParaEnviar).forEach(key => {
      const field = key as keyof Patient;
      const value = pacienteParaEnviar[field];

      if (value === undefined || value === null || value === '') {
        delete pacienteParaEnviar[field];
      }
    });

    console.log('Enviando paciente para backend:', JSON.stringify(pacienteParaEnviar));
    return this.http.post<Patient>(`${this.api}/criar`, pacienteParaEnviar);
  }

  atualizar(id: number, patient: Patient, userId: number): Observable<Patient> {
    const pacienteParaEnviar: Partial<Patient> = { ...patient };

    Object.keys(pacienteParaEnviar).forEach(key => {
      const field = key as keyof Patient;
      const value = pacienteParaEnviar[field];

      if (value === undefined || value === null || value === '') {
        delete pacienteParaEnviar[field];
      }
    });

    return this.http.put<Patient>(`${this.api}/${id}?userId=${userId}`, pacienteParaEnviar);
  }

  deletar(id: number, userId: number) {
    return this.http.delete(`${this.api}/${id}?userId=${userId}`);
  }
}
