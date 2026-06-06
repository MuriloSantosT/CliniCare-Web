import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService, Patient, Guardian } from '../../services/patient.service';
import { AnamneseService, Anamnese } from '../../services/anamnese.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-patient.html',
  styleUrl: './new-patient.css',
})
export class NewPatient {
  patient: Partial<Patient> = {
    nome: '',
    cpf: '',
    dataNascimento: '',
    sexo: '',
    alergias: '',
    convenio: '',
    telefoneEmergencia: '',
    observacoesGerais: '',
    nomeEscola: '',
    telefoneEscola: '',
    ano: '',
    periodo: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    complemento: '',
    responsaveis: [],
    nomeMae: '',
    idadeMae: '',
    profissaoMae: '',
    nomePai: '',
    idadePai: '',
    profissaoPai: '',
  };

  anamnese: Partial<Anamnese> = {
    medicamentos: '',
    acompanhamentoProfissional: '',
    cirurgiasPrevias: '',
    deficienciaTranstorno: '',
    gravidezPlanejada: '',
    usoBebidasAlcoolicas: '',
    gestacaoParto: '',
    usoMedicamentosGestacao: '',
    idadeGravidez: '',
    fezPreNatal: '',
    partoPrematuro: '',
    condicoesBebe: '',
    partoProlongadoDuracao: '',
    usouForceps: '',
    pontuacaoApgar: '',
    triagemNeonatal: '',
    bebeRecebeuVacinas: '',
    problemaSaudeNascimento: '',
    pesoBebe: '',
    tamanhoBebe: '',
    alimentacaoPrimeirosMeses: '',
    sonoPrimeirosMeses: '',
    interacaoAmbiente: '',
    contatoVisual: '',
    sorria: '',
    deitarRolar: '',
    inicioEngatinhar: '',
    inicioRodar: '',
    inicioSentar: '',
    inicioAndar: '',
    primeiraspalavras: '',
    primeirasFrases: '',
    quandoApontou: '',
    alimentacaoBebeCrianca: '',
    tipoBebe: '',
    comportamentoCasa: '',
    comunidade: '',
    possuiRelatorioEscola: '',
    possuiPdi: '',
    interesseAtividades: '',
    lidaComRegras: '',
    pontuacaoProfessora: '',
    habilidadesMotFinas: '',
    habilidadesMotGrossas: '',
    memoria: '',
    atencao: '',
    compreensao: '',
    linguagemCognicao: '',
    desafios: '',
    potencialidades: '',
    pessoaQueSeIdentifica: '',
    brincaComCriancas: '',
    preferenciaBrinquedos: '',
    sonoAtual: '',
    atividadesVidaDiaria: '',
    oQueFazPede: '',
    rotinaCuidados: '',
    tempoTela: '',
    rendaFamiliar: '',
    relacaoFamiliar: '',
    observacoes: '',
  };

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  get isMenorDeIdade(): boolean {
    if (!this.patient.dataNascimento) return false;
    const nascimento = new Date(this.patient.dataNascimento);
    const dezoitoAnos = new Date(nascimento);
    dezoitoAnos.setFullYear(dezoitoAnos.getFullYear() + 18);
    return new Date() < dezoitoAnos;
  }

  novoResponsavel: Partial<Guardian> = {
    nome: '',
    cpf: '',
    telefone: ''
  };

  constructor(
    private patientService: PatientService,
    private anamneseService: AnamneseService,
    private authService: AuthService,
    private router: Router
  ) {}

  adicionarResponsavel() {
    if (this.novoResponsavel.nome && this.novoResponsavel.cpf) {
      const cpfDigits = (this.novoResponsavel.cpf || '').replace(/\D/g, '');
      if (cpfDigits.length !== 11) {
        alert('CPF do responsável inválido. Informe exatamente 11 dígitos.');
        return;
      }
      if (!this.patient.responsaveis) {
        this.patient.responsaveis = [];
      }
      this.patient.responsaveis.push({
        nome: this.novoResponsavel.nome,
        cpf: cpfDigits,
        telefone: (this.novoResponsavel.telefone || '').replace(/\D/g, '')
      });
      this.novoResponsavel = { nome: '', cpf: '', telefone: '' };
    }
  }

  removerResponsavel(index: number) {
    if (this.patient.responsaveis) {
      this.patient.responsaveis.splice(index, 1);
    }
  }

  salvarPaciente() {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      alert('Sessão expirada. Faça login novamente.');
      return;
    }

    if (!this.patient.nome || !this.patient.cpf || !this.patient.dataNascimento) {
      alert('Por favor, preencha os campos obrigatórios: Nome, CPF e Data de Nascimento.');
      return;
    }

    const cpfDigits = (this.patient.cpf || '').replace(/\D/g, '');
    if (cpfDigits.length !== 11) {
      alert('CPF inválido. O CPF deve conter exatamente 11 dígitos.');
      return;
    }

    const dataNasc = new Date(this.patient.dataNascimento + 'T00:00:00');
    const hoje = new Date();
    hoje.setHours(23, 59, 59, 999);
    if (dataNasc > hoje) {
      alert('Data de nascimento inválida. A data não pode ser posterior à data atual.');
      return;
    }

    const pacienteParaEnviar = {
      nome: this.patient.nome || '',
      cpf: cpfDigits,
      dataNascimento: this.patient.dataNascimento || '',
      sexo: this.patient.sexo || '',
      alergias: this.patient.alergias || '',
      convenio: this.patient.convenio || '',
      telefoneEmergencia: (this.patient.telefoneEmergencia || '').replace(/\D/g, ''),
      observacoesGerais: this.patient.observacoesGerais || '',
      nomeEscola: this.patient.nomeEscola || '',
      telefoneEscola: (this.patient.telefoneEscola || '').replace(/\D/g, ''),
      ano: this.patient.ano || '',
      periodo: this.patient.periodo || '',
      rua: this.patient.rua || '',
      numero: this.patient.numero || '',
      bairro: this.patient.bairro || '',
      cidade: this.patient.cidade || '',
      estado: this.patient.estado || '',
      cep: (this.patient.cep || '').replace(/\D/g, ''),
      complemento: this.patient.complemento || '',
      nomeMae: this.patient.nomeMae || '',
      idadeMae: this.patient.idadeMae || '',
      profissaoMae: this.patient.profissaoMae || '',
      nomePai: this.patient.nomePai || '',
      idadePai: this.patient.idadePai || '',
      profissaoPai: this.patient.profissaoPai || '',
      responsaveis: (this.patient.responsaveis && this.patient.responsaveis.length > 0)
        ? this.patient.responsaveis
        : [],
      userId: currentUser.id,
    };

    this.patientService.adicionar(pacienteParaEnviar as Patient).subscribe({
      next: (pacienteSalvo) => {
        const anamneseParaEnviar: Anamnese = {
          ...this.anamnese,
          patientId: pacienteSalvo.id!,
          userId: currentUser.id,
          data: new Date().toISOString().split('T')[0],
          resumo: '',
          textoCompleto: '',
        } as Anamnese;

        this.anamneseService.criar(anamneseParaEnviar).subscribe({
          next: () => this.router.navigate(['/patients']),
          error: (erro) => {
            console.error('Erro ao salvar anamnese:', erro);
            this.router.navigate(['/patients']);
          }
        });
      },
      error: (erro) => {
        console.error('Erro ao salvar paciente:', erro);
        console.error('Detalhes do erro:', erro.error);
        alert('Erro ao salvar paciente. Verifique os dados e tente novamente.');
      }
    });
  }

  cancelar() {
    this.router.navigate(['/patient-list']);
  }
}
