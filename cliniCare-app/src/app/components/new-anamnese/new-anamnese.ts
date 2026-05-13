import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnamneseService, Anamnese } from '../../services/anamnese.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-anamnese',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-anamnese.html',
  styleUrl: './new-anamnese.css'
})
export class NewAnamnese implements OnInit {

  patientId: number = 0;
  patientName: string = '';
  saving: boolean = false;

  anamnese: Partial<Anamnese> = {
    data: new Date().toISOString().split('T')[0],
    resumo: '',
    textoCompleto: '',
    patientId: 0,
    observacoes: '',
    medicamentos: '',
    acompanhamentoProfissional: '',
    cirurgiasPrevias: '',
    deficienciaTranstorno: '',
    responsavel: '',
    irmaos: '',
    quemMoraNaCasa: '',
    escolaAnamnese: '',
    turnoEscolar: '',
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
    fazAcompanhamento: '',
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
    relacaoFamiliar: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private anamneseService: AnamneseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.patientId = Number(this.route.snapshot.paramMap.get('patientId'));
    this.anamnese.patientId = this.patientId;
    this.patientName = `Paciente ID: ${this.patientId}`;
  }

  salvarAnamnese() {
    if (this.anamnese.data) {
      const currentUser = this.authService.getCurrentUser();
      if (!currentUser) {
        alert('Sessão expirada. Faça login novamente.');
        return;
      }
      this.saving = true;

      const anamneseParaEnviar = {
        ...this.anamnese,
        resumo: this.gerarResumoAutomatico(),
        textoCompleto: this.gerarTextoCompleto(),
        patientId: this.patientId,
        userId: currentUser.id
      };

      this.anamneseService.criar(anamneseParaEnviar as Anamnese).subscribe({
        next: (anamneseSalva) => {
          console.log('Anamnese salva com sucesso:', anamneseSalva);
          this.saving = false;
          alert('Anamnese familiar criada com sucesso!');
          this.router.navigate(['/patients', this.patientId]);
        },
        error: (erro) => {
          console.error('Erro ao salvar anamnese:', erro);
          this.saving = false;
          alert('Erro ao salvar anamnese. Verifique os dados e tente novamente.');
        }
      });
    } else {
      alert('Por favor, preencha o campo obrigatório: Data da Anamnese.');
    }
  }

  private gerarResumoAutomatico(): string {
    let resumo = 'Anamnese Familiar - ';

    if (this.anamnese.responsavel) {
      resumo += `Responsável: ${this.anamnese.responsavel.substring(0, 100)}`;
      if (this.anamnese.responsavel.length > 100) {
        resumo += '...';
      }
    } else if (this.anamnese.fazAcompanhamento) {
      resumo += this.anamnese.fazAcompanhamento.substring(0, 100);
      if (this.anamnese.fazAcompanhamento.length > 100) {
        resumo += '...';
      }
    }

    return resumo;
  }

  private gerarTextoCompleto(): string {
    let texto = '';

    texto += `ANAMNESE FAMILIAR\n`;
    texto += `${'='.repeat(50)}\n\n`;
    texto += `Data: ${this.formatarData(this.anamnese.data || '')}\n`;
    texto += `Paciente ID: ${this.patientId}\n\n`;

    texto += `1 - IDENTIFICAÇÃO DO PACIENTE\n${'-'.repeat(50)}\n`;
    texto += `Medicamentos: ${this.anamnese.medicamentos || 'Não informado'}\n`;
    texto += `Acompanhamento Profissional: ${this.anamnese.acompanhamentoProfissional || 'Não informado'}\n`;
    texto += `Cirurgias Prévias: ${this.anamnese.cirurgiasPrevias || 'Não informado'}\n`;
    texto += `Deficiência/Transtorno: ${this.anamnese.deficienciaTranstorno || 'Não informado'}\n`;
    texto += `Responsável: ${this.anamnese.responsavel || 'Não informado'}\n`;
    texto += `Irmãos: ${this.anamnese.irmaos || 'Não informado'}\n`;
    texto += `Quem mora na casa: ${this.anamnese.quemMoraNaCasa || 'Não informado'}\n`;
    texto += `Escola: ${this.anamnese.escolaAnamnese || 'Não informado'}\n`;
    texto += `Turno Escolar: ${this.anamnese.turnoEscolar || 'Não informado'}\n\n`;

    texto += `2 - HISTÓRICO DA GESTAÇÃO\n${'-'.repeat(50)}\n`;
    texto += `Gravidez Planejada: ${this.anamnese.gravidezPlanejada || 'Não informado'}\n`;
    texto += `Uso de Bebidas Alcoólicas: ${this.anamnese.usoBebidasAlcoolicas || 'Não informado'}\n`;
    texto += `Gestação/Parto: ${this.anamnese.gestacaoParto || 'Não informado'}\n`;
    texto += `Uso de Medicamentos na Gestação: ${this.anamnese.usoMedicamentosGestacao || 'Não informado'}\n`;
    texto += `Idade na Gravidez: ${this.anamnese.idadeGravidez || 'Não informado'}\n`;
    texto += `Fez Pré-Natal: ${this.anamnese.fezPreNatal || 'Não informado'}\n`;
    texto += `Parto Prematuro: ${this.anamnese.partoPrematuro || 'Não informado'}\n`;
    texto += `Condições do Bebê ao Nascer: ${this.anamnese.condicoesBebe || 'Não informado'}\n`;
    texto += `Parto Prolongado/Duração: ${this.anamnese.partoProlongadoDuracao || 'Não informado'}\n`;
    texto += `Usou Fórceps: ${this.anamnese.usouForceps || 'Não informado'}\n`;
    texto += `Pontuação Apgar: ${this.anamnese.pontuacaoApgar || 'Não informado'}\n`;
    texto += `Triagem Neonatal: ${this.anamnese.triagemNeonatal || 'Não informado'}\n`;
    texto += `Bebê Recebeu Vacinas: ${this.anamnese.bebeRecebeuVacinas || 'Não informado'}\n`;
    texto += `Problema de Saúde ao Nascer: ${this.anamnese.problemaSaudeNascimento || 'Não informado'}\n\n`;

    texto += `3 - HISTÓRICO E DESENVOLVIMENTO DO BEBÊ\n${'-'.repeat(50)}\n`;
    texto += `Peso ao Nascer: ${this.anamnese.pesoBebe || 'Não informado'}\n`;
    texto += `Tamanho ao Nascer: ${this.anamnese.tamanhoBebe || 'Não informado'}\n`;
    texto += `Alimentação nos Primeiros Meses: ${this.anamnese.alimentacaoPrimeirosMeses || 'Não informado'}\n`;
    texto += `Sono nos Primeiros Meses: ${this.anamnese.sonoPrimeirosMeses || 'Não informado'}\n`;
    texto += `Interação com o Ambiente: ${this.anamnese.interacaoAmbiente || 'Não informado'}\n`;
    texto += `Contato Visual: ${this.anamnese.contatoVisual || 'Não informado'}\n`;
    texto += `Sorria: ${this.anamnese.sorria || 'Não informado'}\n`;
    texto += `Deitar/Rolar: ${this.anamnese.deitarRolar || 'Não informado'}\n`;
    texto += `Início do Engatinhar: ${this.anamnese.inicioEngatinhar || 'Não informado'}\n`;
    texto += `Início do Rolar: ${this.anamnese.inicioRodar || 'Não informado'}\n`;
    texto += `Início do Sentar: ${this.anamnese.inicioSentar || 'Não informado'}\n`;
    texto += `Início do Andar: ${this.anamnese.inicioAndar || 'Não informado'}\n\n`;

    texto += `4 - LINGUAGEM E COMUNICAÇÃO\n${'-'.repeat(50)}\n`;
    texto += `Primeiras Palavras: ${this.anamnese.primeiraspalavras || 'Não informado'}\n`;
    texto += `Primeiras Frases: ${this.anamnese.primeirasFrases || 'Não informado'}\n`;
    texto += `Quando Apontou: ${this.anamnese.quandoApontou || 'Não informado'}\n`;
    texto += `Alimentação Bebê/Criança: ${this.anamnese.alimentacaoBebeCrianca || 'Não informado'}\n`;
    texto += `Tipo de Bebê: ${this.anamnese.tipoBebe || 'Não informado'}\n\n`;

    texto += `5 - AMBIENTE ESCOLAR E SOCIAL\n${'-'.repeat(50)}\n`;
    texto += `Comportamento em Casa: ${this.anamnese.comportamentoCasa || 'Não informado'}\n`;
    texto += `Comunidade: ${this.anamnese.comunidade || 'Não informado'}\n`;
    texto += `Possui Relatório Escolar: ${this.anamnese.possuiRelatorioEscola || 'Não informado'}\n`;
    texto += `Possui PDI: ${this.anamnese.possuiPdi || 'Não informado'}\n`;
    texto += `Interesse em Atividades: ${this.anamnese.interesseAtividades || 'Não informado'}\n`;
    texto += `Lida com Regras: ${this.anamnese.lidaComRegras || 'Não informado'}\n`;
    texto += `Pontuação da Professora: ${this.anamnese.pontuacaoProfessora || 'Não informado'}\n`;
    texto += `Habilidades Motoras Finas: ${this.anamnese.habilidadesMotFinas || 'Não informado'}\n`;
    texto += `Habilidades Motoras Grossas: ${this.anamnese.habilidadesMotGrossas || 'Não informado'}\n\n`;

    texto += `6 - ACOMPANHAMENTO\n${'-'.repeat(50)}\n`;
    texto += `Faz Acompanhamento: ${this.anamnese.fazAcompanhamento || 'Não informado'}\n\n`;

    texto += `7 - COGNIÇÃO/APRENDIZAGEM\n${'-'.repeat(50)}\n`;
    texto += `Memória: ${this.anamnese.memoria || 'Não informado'}\n`;
    texto += `Atenção: ${this.anamnese.atencao || 'Não informado'}\n`;
    texto += `Compreensão: ${this.anamnese.compreensao || 'Não informado'}\n`;
    texto += `Linguagem/Cognição: ${this.anamnese.linguagemCognicao || 'Não informado'}\n\n`;

    texto += `8 - POTENCIALIDADES E DÉFICITS\n${'-'.repeat(50)}\n`;
    texto += `Desafios: ${this.anamnese.desafios || 'Não informado'}\n`;
    texto += `Potencialidades: ${this.anamnese.potencialidades || 'Não informado'}\n\n`;

    texto += `9 - SOCIALIZAÇÃO\n${'-'.repeat(50)}\n`;
    texto += `Pessoa que se Identifica: ${this.anamnese.pessoaQueSeIdentifica || 'Não informado'}\n`;
    texto += `Brinca com Crianças: ${this.anamnese.brincaComCriancas || 'Não informado'}\n`;
    texto += `Preferência de Brinquedos: ${this.anamnese.preferenciaBrinquedos || 'Não informado'}\n`;
    texto += `Sono Atual: ${this.anamnese.sonoAtual || 'Não informado'}\n`;
    texto += `Atividades de Vida Diária: ${this.anamnese.atividadesVidaDiaria || 'Não informado'}\n`;
    texto += `O que faz/pede: ${this.anamnese.oQueFazPede || 'Não informado'}\n`;
    texto += `Rotina de Cuidados: ${this.anamnese.rotinaCuidados || 'Não informado'}\n`;
    texto += `Tempo de Tela: ${this.anamnese.tempoTela || 'Não informado'}\n`;
    texto += `Renda Familiar: ${this.anamnese.rendaFamiliar || 'Não informado'}\n`;
    texto += `Relação Familiar: ${this.anamnese.relacaoFamiliar || 'Não informado'}\n`;

    if (this.anamnese.observacoes) {
      texto += `\nOBSERVAÇÕES:\n${'-'.repeat(50)}\n${this.anamnese.observacoes}\n`;
    }

    return texto;
  }

  private formatarData(data: string): string {
    if (!data) return '';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  }

  cancelar() {
    this.router.navigate(['/patients', this.patientId]);
  }
}
