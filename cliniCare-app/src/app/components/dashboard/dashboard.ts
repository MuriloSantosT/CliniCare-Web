import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PatientService, Patient } from '../../services/patient.service';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';
import { Appointment } from '../../models/appointment.model';

interface ProximoAtendimento {
  pacienteId?: number;
  pacienteNome: string;
  horario: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  pacientes: Patient[] = [];
  appointments: Appointment[] = [];

  proximoAtendimento: ProximoAtendimento | null = null;

  notas = '';
  editandoNotas = false;
  notasRascunho = '';

  constructor(
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private authService: AuthService,
  ) {}

  get nomeUsuario(): string {
    return this.authService.getCurrentUser()?.nome ?? 'Usuário';
  }

  get primeiroNome(): string {
    return this.nomeUsuario.trim().split(' ')[0];
  }

  get pacientesCadastrados(): number {
    return this.pacientes.length;
  }

  get pacientesDoDia(): number {
    const hoje = new Date().toDateString();
    return this.appointments.filter(
      a => a.status !== 'Cancelado' && new Date(a.dataInicio).toDateString() === hoje
    ).length;
  }

  get consultasDoMes(): number {
    const agora = new Date();
    const mes = agora.getMonth();
    const ano = agora.getFullYear();
    return this.appointments.filter(a => {
      const d = new Date(a.dataInicio);
      return a.status === 'Realizado' && d.getMonth() === mes && d.getFullYear() === ano;
    }).length;
  }

  get nomeMesAtual(): string {
    const nome = new Date().toLocaleDateString('pt-BR', { month: 'long' });
    return nome.charAt(0).toUpperCase() + nome.slice(1);
  }

  get aniversariantesDoMes(): Patient[] {
    const mesAtual = new Date().getMonth();
    return this.pacientes
      .filter(p => new Date(p.dataNascimento).getMonth() === mesAtual)
      .sort((a, b) =>
        new Date(a.dataNascimento).getDate() - new Date(b.dataNascimento).getDate()
      );
  }

  private notasKey(): string {
    return `dashboard_notas_${this.authService.getCurrentUser()?.id}`;
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;
    this.carregarPacientes(user.id);
    this.carregarAppointments(user.id);
    this.notas = localStorage.getItem(this.notasKey()) ?? '';
  }

  carregarPacientes(userId: number): void {
    this.patientService.listarPorUsuario(userId).subscribe({
      next: dados => (this.pacientes = dados),
      error: err => console.error('Erro ao buscar pacientes', err),
    });
  }

  carregarAppointments(userId: number): void {
    this.appointmentService.listByUser(userId).subscribe({
      next: dados => {
        this.appointments = dados;
        this.proximoAtendimento = this.resolverProximoAtendimento(dados);
      },
      error: err => console.error('Erro ao buscar compromissos', err),
    });
  }

  get agendamentosCancelados(): number {
    const agora = new Date();
    return this.appointments.filter(a => {
      const d = new Date(a.dataInicio);
      return a.status === 'Cancelado' && d.getMonth() === agora.getMonth() && d.getFullYear() === agora.getFullYear();
    }).length;
  }

  private resolverProximoAtendimento(appointments: Appointment[]): ProximoAtendimento | null {
    const agora = new Date();

    const proximo = appointments
      .filter(a =>
        a.status !== 'Cancelado' &&
        a.status !== 'Realizado' &&
        new Date(a.dataFim) >= agora
      )
      .sort((a, b) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime())[0];

    if (!proximo) return null;

    const inicio = new Date(proximo.dataInicio);
    const hh = String(inicio.getHours()).padStart(2, '0');
    const mm = String(inicio.getMinutes()).padStart(2, '0');

    return {
      pacienteId: proximo.patient?.id,
      pacienteNome: proximo.patient?.nome ?? 'Paciente não identificado',
      horario: `${hh}:${mm}`,
    };
  }

  iniciarEdicaoNotas(): void {
    this.notasRascunho = this.notas;
    this.editandoNotas = true;
  }

  salvarNotas(): void {
    this.notas = this.notasRascunho;
    localStorage.setItem(this.notasKey(), this.notas);
    this.editandoNotas = false;
  }

  cancelarEdicaoNotas(): void {
    this.editandoNotas = false;
  }

  formatarData(data: string): string {
    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}/${d.getFullYear()}`;
  }

  calcularIdade(data: string): number {
    const nascimento = new Date(data);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  }
}
