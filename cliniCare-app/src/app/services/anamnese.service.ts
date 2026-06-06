import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Anamnese {
  id?: number;
  data: string;
  resumo: string;
  textoCompleto: string;
  docPath?: string;
  patientId: number;
  userId: number;
  createdAt?: string;
  observacoes?: string;

  // Section 1 - Identificação do paciente
  medicamentos?: string;
  acompanhamentoProfissional?: string;
  cirurgiasPrevias?: string;
  deficienciaTranstorno?: string;
  nomeMae?: string;
  idadeMae?: string;
  profissaoMae?: string;
  nomePai?: string;
  idadePai?: string;
  profissaoPai?: string;
  responsavel?: string;
  irmaos?: string;
  quemMoraNaCasa?: string;
  escolaAnamnese?: string;
  turnoEscolar?: string;

  // Section 2 - Histórico da gestação
  gravidezPlanejada?: string;
  usoBebidasAlcoolicas?: string;
  gestacaoParto?: string;
  usoMedicamentosGestacao?: string;
  idadeGravidez?: string;
  fezPreNatal?: string;
  partoPrematuro?: string;
  condicoesBebe?: string;
  partoProlongadoDuracao?: string;
  usouForceps?: string;
  pontuacaoApgar?: string;
  triagemNeonatal?: string;
  bebeRecebeuVacinas?: string;
  problemaSaudeNascimento?: string;

  // Section 3 - Histórico e desenvolvimento do bebê
  pesoBebe?: string;
  tamanhoBebe?: string;
  alimentacaoPrimeirosMeses?: string;
  sonoPrimeirosMeses?: string;
  interacaoAmbiente?: string;
  contatoVisual?: string;
  sorria?: string;
  deitarRolar?: string;
  inicioEngatinhar?: string;
  inicioRodar?: string;
  inicioSentar?: string;
  inicioAndar?: string;

  // Section 4 - Linguagem e comunicação
  primeiraspalavras?: string;
  primeirasFrases?: string;
  quandoApontou?: string;
  alimentacaoBebeCrianca?: string;
  tipoBebe?: string;

  // Section 5 - Ambiente escolar e social
  comportamentoCasa?: string;
  comunidade?: string;
  possuiRelatorioEscola?: string;
  possuiPdi?: string;
  interesseAtividades?: string;
  lidaComRegras?: string;
  pontuacaoProfessora?: string;
  habilidadesMotFinas?: string;
  habilidadesMotGrossas?: string;

  // Section 6 - Acompanhamento
  fazAcompanhamento?: string;

  // Section 7 - Cognição/aprendizagem
  memoria?: string;
  atencao?: string;
  compreensao?: string;
  linguagemCognicao?: string;

  // Section 8 - Potencialidades e déficits
  desafios?: string;
  potencialidades?: string;

  // Section 9 - Socialização
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
}

@Injectable({
  providedIn: 'root'
})
export class AnamneseService {

  private apiUrl = `${environment.apiUrl}/anamnese`;

  constructor(private http: HttpClient) { }

  criar(anamnese: Anamnese): Observable<Anamnese> {
    return this.http.post<Anamnese>(`${this.apiUrl}/criar`, anamnese);
  }

  listarTodas(): Observable<Anamnese[]> {
    return this.http.get<Anamnese[]>(`${this.apiUrl}/listarTodos`);
  }

  listarPorPaciente(patientId: number): Observable<Anamnese[]> {
    return this.http.get<Anamnese[]>(`${this.apiUrl}/paciente/${patientId}`);
  }

  atualizar(id: number, anamnese: Partial<Anamnese>): Observable<Anamnese> {
    return this.http.put<Anamnese>(`${this.apiUrl}/${id}`, anamnese);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete?id=${id}`);
  }
}
