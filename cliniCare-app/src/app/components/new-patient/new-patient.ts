import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService, Patient, Guardian } from '../../services/patient.service';
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
    medicamentos: '',
    acompanhamentoProfissional: '',
    cirurgiasPrevias: '',
    deficienciaTranstorno: '',
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
    gravidezPlanejada: '',
    usoBebidasAlcoolicas: '',
    gestacaoParto: '',
    usoMedicamentosGestacao: '',
    idadeGravidez: '',
    fezPreNatal: '',
    partoPrematuro: '',
    condicoesBebe: '',
    duracaoParto: '',
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
    deitava: '',
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
    observacoes: ''
  };

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

  adicionarAnamnese: boolean = false;

  constructor(
    private patientService: PatientService,
    private authService: AuthService,
    private router: Router
  ) {}

  adicionarResponsavel() {
    if (this.novoResponsavel.nome && this.novoResponsavel.cpf) {
      if (!this.patient.responsaveis) {
        this.patient.responsaveis = [];
      }
      this.patient.responsaveis.push({
        nome: this.novoResponsavel.nome,
        cpf: (this.novoResponsavel.cpf || '').replace(/\D/g, ''), // Remove formatação
        telefone: (this.novoResponsavel.telefone || '').replace(/\D/g, '') // Remove formatação
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
    if (this.patient.nome && this.patient.cpf && this.patient.dataNascimento) {
      const pacienteParaEnviar = {
        nome: this.patient.nome || '',
        cpf: (this.patient.cpf || '').replace(/\D/g, ''),
        dataNascimento: this.patient.dataNascimento || '',
        sexo: this.patient.sexo || '',
        alergias: this.patient.alergias || '',
        convenio: this.patient.convenio || '',
        telefoneEmergencia: (this.patient.telefoneEmergencia || '').replace(/\D/g, ''),
        observacoesGerais: this.patient.observacoesGerais || '',
        medicamentos: this.patient.medicamentos || '',
        acompanhamentoProfissional: this.patient.acompanhamentoProfissional || '',
        cirurgiasPrevias: this.patient.cirurgiasPrevias || '',
        deficienciaTranstorno: this.patient.deficienciaTranstorno || '',
        gravidezPlanejada: this.patient.gravidezPlanejada || '',
        usoBebidasAlcoolicas: this.patient.usoBebidasAlcoolicas || '',
        gestacaoParto: this.patient.gestacaoParto || '',
        usoMedicamentosGestacao: this.patient.usoMedicamentosGestacao || '',
        idadeGravidez: this.patient.idadeGravidez || '',
        fezPreNatal: this.patient.fezPreNatal || '',
        partoPrematuro: this.patient.partoPrematuro || '',
        condicoesBebe: this.patient.condicoesBebe || '',
        duracaoParto: this.patient.duracaoParto || '',
        usouForceps: this.patient.usouForceps || '',
        pontuacaoApgar: this.patient.pontuacaoApgar || '',
        triagemNeonatal: this.patient.triagemNeonatal || '',
        bebeRecebeuVacinas: this.patient.bebeRecebeuVacinas || '',
        problemaSaudeNascimento: this.patient.problemaSaudeNascimento || '',
        pesoBebe: this.patient.pesoBebe || '',
        tamanhoBebe: this.patient.tamanhoBebe || '',
        alimentacaoPrimeirosMeses: this.patient.alimentacaoPrimeirosMeses || '',
        sonoPrimeirosMeses: this.patient.sonoPrimeirosMeses || '',
        interacaoAmbiente: this.patient.interacaoAmbiente || '',
        contatoVisual: this.patient.contatoVisual || '',
        sorria: this.patient.sorria || '',
        deitava: this.patient.deitava || '',
        inicioEngatinhar: this.patient.inicioEngatinhar || '',
        inicioRodar: this.patient.inicioRodar || '',
        inicioSentar: this.patient.inicioSentar || '',
        inicioAndar: this.patient.inicioAndar || '',
        primeiraspalavras: this.patient.primeiraspalavras || '',
        primeirasFrases: this.patient.primeirasFrases || '',
        quandoApontou: this.patient.quandoApontou || '',
        alimentacaoBebeCrianca: this.patient.alimentacaoBebeCrianca || '',
        tipoBebe: this.patient.tipoBebe || '',
        comportamentoCasa: this.patient.comportamentoCasa || '',
        comunidade: this.patient.comunidade || '',
        possuiRelatorioEscola: this.patient.possuiRelatorioEscola || '',
        possuiPdi: this.patient.possuiPdi || '',
        interesseAtividades: this.patient.interesseAtividades || '',
        lidaComRegras: this.patient.lidaComRegras || '',
        pontuacaoProfessora: this.patient.pontuacaoProfessora || '',
        habilidadesMotFinas: this.patient.habilidadesMotFinas || '',
        habilidadesMotGrossas: this.patient.habilidadesMotGrossas || '',
        memoria: this.patient.memoria || '',
        atencao: this.patient.atencao || '',
        compreensao: this.patient.compreensao || '',
        linguagemCognicao: this.patient.linguagemCognicao || '',
        desafios: this.patient.desafios || '',
        potencialidades: this.patient.potencialidades || '',
        pessoaQueSeIdentifica: this.patient.pessoaQueSeIdentifica || '',
        brincaComCriancas: this.patient.brincaComCriancas || '',
        preferenciaBrinquedos: this.patient.preferenciaBrinquedos || '',
        sonoAtual: this.patient.sonoAtual || '',
        atividadesVidaDiaria: this.patient.atividadesVidaDiaria || '',
        oQueFazPede: this.patient.oQueFazPede || '',
        rotinaCuidados: this.patient.rotinaCuidados || '',
        tempoTela: this.patient.tempoTela || '',
        rendaFamiliar: this.patient.rendaFamiliar || '',
        relacaoFamiliar: this.patient.relacaoFamiliar || '',
        observacoes: this.patient.observacoes || '',
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
        responsaveis: (this.patient.responsaveis && this.patient.responsaveis.length > 0)
          ? this.patient.responsaveis
          : [],
        userId: currentUser.id,
      };
      
      this.patientService.adicionar(pacienteParaEnviar as Patient).subscribe({
        next: (pacienteSalvo) => {
          
          // Verifica se deve adicionar anamnese
          if (this.adicionarAnamnese) {
            // Redireciona para o componente de criação de anamnese
            this.router.navigate(['/patients', pacienteSalvo.id, 'anamnese', 'new']);
          } else {
            // Redireciona para a lista de pacientes
            this.router.navigate(['/patients']);
          }
        },
        error: (erro) => {
          console.error('Erro ao salvar paciente:', erro);
          console.error('Detalhes do erro:', erro.error);
          alert('Erro ao salvar paciente. Verifique os dados e tente novamente.');
        }
      });
    } else {
      alert('Por favor, preencha os campos obrigatórios: Nome, CPF e Data de Nascimento.');
    }
  }

  cancelar() {
    this.router.navigate(['/patient-list']);
  }
}
