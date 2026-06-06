import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService, Patient } from '../../services/patient.service';
import { AnamneseService, Anamnese } from '../../services/anamnese.service';
import { AppointmentService } from '../../services/appointment.service';
import { EvolutionService } from '../../services/evolution.service';
import { ReportService } from '../../services/report.service';
import { AuthService } from '../../services/auth.service';
import { Evolution } from '../../models/evolution.model';
import { Report } from '../../models/report.model';
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
  anamnese: Anamnese | null = null;
  showGallery = false;

  evolutionFiles: DocumentItem[] = [];
  reportFiles: DocumentItem[] = [];
  private evolucoes: Evolution[] = [];
  private relatorios: Report[] = [];

  documentType: 'evolution' | 'reports' = 'evolution';
  showDocumentTypeMenu = false;

  showConsultaForm = false;
  novaConsulta: any = this.emptyConsulta();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private anamneseService: AnamneseService,
    private evolutionService: EvolutionService,
    private reportService: ReportService,
    private appointmentService: AppointmentService,
    private authService: AuthService
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
    const user = this.authService.getCurrentUser();
    if (!user) { this.router.navigate(['/login']); return; }

    this.patientService.getById(id, user.id).subscribe({
      next: (patient) => {
        this.patient = patient;
        this.carregarEvolucoes(id);
        this.carregarRelatorios(id);
        this.carregarAnamnese(id);
      },
      error: (erro) => {
        if (erro.status === 403 || erro.status === 404) {
          this.router.navigate(['/patients']);
        } else {
          console.error('Erro ao buscar paciente', erro);
        }
      },
    });
  }

  carregarAnamnese(patientId: number) {
    this.anamneseService.listarPorPaciente(patientId).subscribe({
      next: (anamneses) => {
        this.anamnese = anamneses.length > 0 ? anamneses[0] : null;
      },
      error: (err) => console.error('Erro ao carregar anamnese:', err),
    });
  }

  carregarEvolucoes(patientId: number) {
    this.evolutionService.listByPatient(patientId).subscribe({
      next: (evolucoes) => {
        this.evolucoes = evolucoes;
        this.evolutionFiles = evolucoes.map(e => ({
          id: e.id ?? 0,
          title: e.titulo || `Evolução — ${e.data ?? ''}`,
          date: e.data ?? '',
          description: (e.texto ?? '').substring(0, 120) + ((e.texto ?? '').length > 120 ? '…' : ''),
        }));
      },
      error: (err) => console.error('Erro ao carregar evoluções:', err),
    });
  }

  carregarRelatorios(patientId: number) {
    this.reportService.listByPatient(patientId).subscribe({
      next: (relatorios: Report[]) => {
        this.relatorios = relatorios;
        this.reportFiles = relatorios.map(r => ({
          id: r.id ?? 0,
          title: r.titulo || `Relatório — ${r.data ?? ''}`,
          date: r.data ?? r.createdAt ?? '',
          description: (r.descricao ?? '').substring(0, 120) + ((r.descricao ?? '').length > 120 ? '…' : ''),
        }));
      },
      error: (err) => console.error('Erro ao carregar relatórios:', err),
    });
  }

  toggleDocumentMenu() {
    this.showDocumentTypeMenu = !this.showDocumentTypeMenu;
  }

  selectDocumentType(type: 'evolution' | 'reports') {
    this.documentType = type;
    this.showDocumentTypeMenu = false;
  }

  get documentTypeTitle(): string {
    return this.documentType === 'evolution' ? 'Ficha de Evolução' : 'Relatórios';
  }

  get documentIcon(): string {
    return this.documentType === 'evolution' ? '📄' : '📋';
  }

  get currentDocuments(): DocumentItem[] {
    return this.documentType === 'evolution' ? this.evolutionFiles : this.reportFiles;
  }

  editarPaciente() {
    if (this.patient) {
      this.router.navigate([`/patients/${this.patient.id}/edit`]);
    }
  }

  novaFichaEvolucao() {
    if (this.patient) {
      this.router.navigate(['/evolution/new'], {
        queryParams: { patientId: this.patient.id, patientName: this.patient.nome }
      });
    }
  }

  novoRelatorio() {
    if (this.patient) {
      this.router.navigate(['/report/new'], {
        queryParams: { patientId: this.patient.id, patientName: this.patient.nome }
      });
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
    const user = this.authService.getCurrentUser();
    if (!user) return;
    const payload: Appointment = {
      dataInicio: this.withSeconds(this.novaConsulta.dataInicio),
      dataFim: this.withSeconds(this.novaConsulta.dataFim),
      status: this.novaConsulta.status,
      observacoes: this.novaConsulta.observacoes,
      valor: this.novaConsulta.valor,
      formaPagamento: this.novaConsulta.formaPagamento,
      patient: { id: this.patient.id },
      user: { id: user.id },
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
    if (this.documentType === 'evolution') {
      const evo = this.evolucoes.find(e => e.id === documento.id);
      this.router.navigate(['/evolution/view'], {
        queryParams: { patientId: this.patient?.id, patientName: this.patient?.nome },
        state: { evolution: evo }
      });
    } else {
      const rel = this.relatorios.find(r => r.id === documento.id);
      this.router.navigate(['/report/view'], {
        queryParams: { patientId: this.patient?.id, patientName: this.patient?.nome },
        state: { report: rel }
      });
    }
  }

  get enderecoCompleto(): string {
    if (!this.patient) return '';
    const { rua, numero, bairro, cidade, estado, cep, complemento } = this.patient;
    return [rua, numero ? `${numero}` : '', complemento, bairro, cidade, estado, cep ? `${cep}` : '']
      .filter(Boolean)
      .join(', ');
  }
}
