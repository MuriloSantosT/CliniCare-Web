import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService, Patient } from '../../services/patient.service';
import { AnamneseService } from '../../services/anamnese.service';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment.model';

interface DocumentItem {
  id: number;
  title: string;
  date: string;
  description: string;
}

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './patient.html',
  styleUrls: ['./patient.css'],
})
export class PatientComponent implements OnInit {
  patient: Patient | null = null;
  activeTab: 'evolution' | 'reports' | null = null;
  showGallery = false;

  evolutionFiles: DocumentItem[] = [];
  reportFiles: DocumentItem[] = [];
  anamneseFiles: DocumentItem[] = [];

  documentType: 'evolution' | 'reports' | 'anamnese' = 'evolution';
  showDocumentTypeMenu = false;

  showConsultaForm = false;
  novaConsulta: any = this.emptyConsulta();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private anamneseService: AnamneseService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const patientId = params['id'];
      if (patientId) {
        this.carregarPaciente(+patientId);
      }
    });
  }

  carregarPaciente(id: number) {
    this.patientService.getById(id).subscribe({
      next: (patient) => {
        this.patient = patient;
        if (this.patient) {
          this.carregarDocumentos();
          this.carregarAnamneses(id);
        }
      },
      error: (erro) => {
        console.error('Erro ao buscar paciente', erro);
      },
    });
  }

  carregarDocumentos() {
    // TODO: Substituir por chamadas API reais quando disponível
    this.evolutionFiles = [
      {
        id: 1,
        title: 'Consulta do dia 12/08',
        date: '12/08/2024',
        description: 'Algum comentário que eu não tenho a menor ideia se vai ser necessário ou não, tenho que lembrar de perguntar pro Gu.',
      },
      {
        id: 2,
        title: 'Consulta do dia 08/08',
        date: '08/08/2024',
        description: 'Algum comentário que eu não tenho a menor ideia se vai ser necessário ou não, tenho que lembrar de perguntar pro Gu.',
      },
    ];

    this.reportFiles = [
      {
        id: 1,
        title: 'Relatório parental 08/08',
        date: '08/08/2024',
        description: 'Algum comentário que eu não tenho a menor ideia se vai ser necessário ou não, tenho que lembrar de perguntar pro Gu.',
      },
      {
        id: 2,
        title: 'Relatório 23/07',
        date: '23/07/2024',
        description: 'Algum comentário que eu não tenho a menor ideia se vai ser necessário ou não, tenho que lembrar de perguntar pro Gu.',
      },
    ];
  }

  carregarAnamneses(patientId: number) {
    this.anamneseService.listarPorPaciente(patientId).subscribe({
      next: (anamneses) => {
        this.anamneseFiles = anamneses.map((a) => ({
          id: a.id ?? 0,
          title: `Anamnese — ${a.data ?? ''}`,
          date: a.data ?? '',
          description: a.resumo ?? 'Sem resumo.',
        }));
      },
      error: (erro) => {
        console.error('Erro ao carregar anamneses', erro);
        this.anamneseFiles = [];
      },
    });
  }

  toggleTab(tab: 'evolution' | 'reports') {
    this.activeTab = this.activeTab === tab ? null : tab;
  }

  toggleDocumentMenu() {
    this.showDocumentTypeMenu = !this.showDocumentTypeMenu;
  }

  selectDocumentType(type: 'evolution' | 'reports' | 'anamnese') {
    this.documentType = type;
    this.showDocumentTypeMenu = false;
  }

  get documentTypeTitle(): string {
    if (this.documentType === 'evolution') return 'Ficha de Evolução';
    if (this.documentType === 'reports') return 'Relatórios';
    return 'Anamneses';
  }

  get documentIcon(): string {
    if (this.documentType === 'evolution') return '📄';
    if (this.documentType === 'reports') return '📋';
    return '🩺';
  }

  get currentDocuments(): DocumentItem[] {
    if (this.documentType === 'evolution') return this.evolutionFiles;
    if (this.documentType === 'reports') return this.reportFiles;
    return this.anamneseFiles;
  }

  editarPaciente() {
    if (this.patient) {
      this.router.navigate([`/patients/${this.patient.id}/edit`]);
    }
  }

  novaAnamnese() {
    if (this.patient) {
      this.router.navigate([`/patients/${this.patient.id}/anamnese/new`]);
    }
  }

  novaFichaEvolucao() {
    if (this.patient) {
      this.router.navigate([`/patients/${this.patient.id}/evolution/new`]);
    }
  }

  novoRelatorio() {
    if (this.patient) {
      this.router.navigate([`/patients/${this.patient.id}/report/new`]);
    }
  }

  abrirNovaConsulta() {
    const start = new Date();
    start.setMinutes(0, 0, 0);
    const end = new Date(start);
    end.setHours(start.getHours() + 1);
    this.novaConsulta = {
      ...this.emptyConsulta(),
      dataInicio: this.toDatetimeLocal(start),
      dataFim: this.toDatetimeLocal(end),
    };
    this.showConsultaForm = true;
  }

  fecharNovaConsulta() {
    this.showConsultaForm = false;
  }

  onInicioChange() {
    if (this.novaConsulta.dataInicio) {
      const start = new Date(this.novaConsulta.dataInicio);
      const end = new Date(start);
      end.setHours(end.getHours() + 1);
      this.novaConsulta.dataFim = this.toDatetimeLocal(end);
    }
  }

  salvarConsulta() {
    if (!this.novaConsulta.dataInicio || !this.novaConsulta.dataFim || !this.patient) return;
    const payload: Appointment = {
      dataInicio: this.withSeconds(this.novaConsulta.dataInicio),
      dataFim: this.withSeconds(this.novaConsulta.dataFim),
      status: this.novaConsulta.status,
      observacoes: this.novaConsulta.observacoes,
      valor: this.novaConsulta.valor,
      formaPagamento: this.novaConsulta.formaPagamento,
      patient: { id: this.patient.id },
      user: { id: 1 },
    };
    this.appointmentService.create(payload).subscribe({
      next: () => this.fecharNovaConsulta(),
      error: (err) => console.error('Erro ao salvar consulta:', err),
    });
  }

  private emptyConsulta() {
    return {
      dataInicio: '',
      dataFim: '',
      status: 'Agendado',
      observacoes: '',
      valor: null as number | null,
      formaPagamento: '',
    };
  }

  private toDatetimeLocal(date: Date): string {
    const p = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}T${p(date.getHours())}:${p(date.getMinutes())}`;
  }

  private withSeconds(dt: string): string {
    return /T\d{2}:\d{2}$/.test(dt) ? `${dt}:00` : dt;
  }

  mostrarNotificacao() {
    alert('Galeria de fotos em construção! Em breve estará disponível.');
  }

  abrirDocumento(documento: DocumentItem) {
    console.log('Abrindo documento:', documento);
    // TODO: Implementar lógica para abrir documento
  }

  get enderecoCompleto(): string {
    if (!this.patient) return '';
    const { rua, numero, bairro, cidade, estado, cep, complemento } = this.patient;
    return [rua, numero ? `${numero}` : '', complemento, bairro, cidade, estado, cep ? `${cep}` : '']
      .filter(Boolean)
      .join(', ');
  }
}
