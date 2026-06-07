import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { PatientService, Patient } from '../../services/patient.service';
import { AuthService } from '../../services/auth.service';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './agenda.html',
  styleUrl: './agenda.css',
})
export class Agenda implements OnInit {
  appointments: Appointment[] = [];
  patients: Patient[] = [];
  weekStart: Date = this.getMonday(new Date());
  showForm = false;
  errorMsg = '';
  selectedApt: Appointment | null = null;
  hours: number[] = Array.from({ length: 14 }, (_, i) => i + 7); // 07–20
  newAppointment: any = this.emptyAppointment();

  readonly CELL_HEIGHT = 48;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadAppointments();
    this.loadPatients();
    this.route.queryParams.subscribe(params => {
      const pid = params['patientId'];
      if (pid) {
        this.openAppointmentForm();
        this.newAppointment.patientId = +pid;
      }
    });
  }

  loadAppointments() {
    const user = this.authService.getCurrentUser();
    if (!user) return;
    this.appointmentService.listByUser(user.id).subscribe({
      next: (data) => { this.appointments = data; },
      error: (err) => { console.error('Erro ao carregar compromissos:', err); }
    });
  }

  loadPatients() {
    const user = this.authService.getCurrentUser();
    if (!user) return;
    this.patientService.listarPorUsuario(user.id).subscribe({
      next: (data) => { this.patients = data; },
      error: (err) => { console.error('Erro ao carregar pacientes:', err); }
    });
  }

  // ── Semana ────────────────────────────────────────────────────────────────

  get weekDays(): Date[] {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(this.weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }

  get weekLabel(): string {
    const days = this.weekDays;
    const start = days[0];
    const end = days[6];
    const endMonth = this.cap(end.toLocaleDateString('pt-BR', { month: 'long' }));
    const endYear = end.getFullYear();
    if (start.getMonth() === end.getMonth()) {
      return `${start.getDate()} – ${end.getDate()} de ${endMonth} de ${endYear}`;
    }
    const startMonth = this.cap(start.toLocaleDateString('pt-BR', { month: 'short' }));
    return `${start.getDate()} ${startMonth} – ${end.getDate()} ${endMonth} ${endYear}`;
  }

  isCurrentWeek(): boolean {
    return this.getMonday(new Date()).toDateString() === this.weekStart.toDateString();
  }

  previousWeek() {
    const d = new Date(this.weekStart);
    d.setDate(d.getDate() - 7);
    this.weekStart = d;
  }

  nextWeek() {
    const d = new Date(this.weekStart);
    d.setDate(d.getDate() + 7);
    this.weekStart = d;
  }

  goToday() {
    this.weekStart = this.getMonday(new Date());
  }

  isToday(day: Date): boolean {
    return day.toDateString() === new Date().toDateString();
  }

  isCurrentHour(hour: number): boolean {
    return this.isCurrentWeek() && new Date().getHours() === hour;
  }

  getDayAbbr(day: Date): string {
    return day.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
  }

  formatHour(hour: number): string {
    return `${hour.toString().padStart(2, '0')}:00`;
  }

  // ── Appointments ──────────────────────────────────────────────────────────

  getAppointmentsForDay(day: Date): Appointment[] {
    return this.appointments.filter(apt =>
      new Date(apt.dataInicio).toDateString() === day.toDateString()
    );
  }

  getAptTop(apt: Appointment): number {
    const start = new Date(apt.dataInicio);
    const minutesFromGridStart = (start.getHours() - this.hours[0]) * 60 + start.getMinutes();
    return minutesFromGridStart / 60 * this.CELL_HEIGHT;
  }

  getAptHeight(apt: Appointment): number {
    const start = new Date(apt.dataInicio);
    const end = new Date(apt.dataFim);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return this.CELL_HEIGHT;
    const durationMinutes = (end.getTime() - start.getTime()) / 60000;
    return Math.max(durationMinutes / 60 * this.CELL_HEIGHT, 20);
  }

  // ── Formulário ────────────────────────────────────────────────────────────

  selectCell(day: Date, hour: number) {
    const start = new Date(day);
    start.setHours(hour, 0, 0, 0);
    const end = new Date(start);
    end.setHours(hour + 1, 0, 0, 0);
    this.newAppointment = {
      ...this.emptyAppointment(),
      dataInicio: this.toDatetimeLocal(start),
      dataFim: this.toDatetimeLocal(end),
    };
    this.errorMsg = '';
    this.showForm = true;
  }

  openAppointmentForm() {
    const start = new Date();
    start.setMinutes(0, 0, 0);
    const end = new Date(start);
    end.setHours(start.getHours() + 1);
    this.newAppointment = {
      ...this.emptyAppointment(),
      dataInicio: this.toDatetimeLocal(start),
      dataFim: this.toDatetimeLocal(end),
    };
    this.errorMsg = '';
    this.showForm = true;
  }

  onStartChange() {
    if (this.newAppointment.dataInicio) {
      const start = new Date(this.newAppointment.dataInicio);
      const end = new Date(start);
      end.setHours(end.getHours() + 1);
      this.newAppointment.dataFim = this.toDatetimeLocal(end);
    }
    this.errorMsg = '';
  }

  closeAppointmentForm() {
    this.showForm = false;
    this.errorMsg = '';
  }

  saveAppointment() {
    if (!this.newAppointment.patientId) {
      this.errorMsg = 'Selecione um paciente para continuar.';
      return;
    }
    if (!this.newAppointment.dataInicio || !this.newAppointment.dataFim) return;
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    const dataInicio = this.withSeconds(this.newAppointment.dataInicio);
    const dataFim = this.withSeconds(this.newAppointment.dataFim);

    this.appointmentService.listByUser(currentUser.id).subscribe({
      next: (latestApts) => {
        this.appointments = latestApts;

        if (this.hasConflict(dataInicio, dataFim)) {
          this.errorMsg = 'Já existe um compromisso neste horário.';
          return;
        }
        this.errorMsg = '';

        const payload: Appointment = {
          dataInicio,
          dataFim,
          status: this.newAppointment.status,
          observacoes: this.newAppointment.observacoes,
          valor: this.newAppointment.valor,
          formaPagamento: this.newAppointment.formaPagamento,
          user: { id: currentUser.id },
        };
        if (this.newAppointment.patientId) {
          payload.patient = { id: this.newAppointment.patientId };
        }

        this.appointmentService.create(payload).subscribe({
          next: (apt) => { this.appointments.push(apt); this.closeAppointmentForm(); },
          error: (err) => {
            if (err.status === 409) {
              this.errorMsg = 'Já existe um compromisso neste horário.';
            } else {
              console.error('Erro ao salvar compromisso:', err);
            }
          }
        });
      },
      error: (err) => { console.error('Erro ao verificar disponibilidade:', err); }
    });
  }

  deleteAppointment(id: number | undefined) {
    if (!id || !confirm('Excluir este compromisso?')) return;
    this.appointmentService.delete(id).subscribe({
      next: () => { this.appointments = this.appointments.filter(a => a.id !== id); },
      error: (err) => { console.error('Erro ao excluir:', err); }
    });
  }

  getStatusClass(status: string): string {
    return status?.toLowerCase() ?? '';
  }

  openDetail(apt: Appointment) {
    this.selectedApt = apt;
  }

  closeDetail() {
    this.selectedApt = null;
  }

  openEvolution(apt: Appointment) {
    this.closeDetail();
    this.router.navigate(['/evolution/new'], {
      queryParams: {
        appointmentId: apt.id,
        patientId: apt.patient?.id ?? '',
        patientName: apt.patient?.nome ?? '',
      },
    });
  }

  cancelAppointment(apt: Appointment) {
    if (!apt.id) return;
    this.appointmentService.updateStatus(apt.id, 'Cancelado').subscribe({
      next: (updated) => {
        const idx = this.appointments.findIndex(a => a.id === apt.id);
        if (idx !== -1) this.appointments[idx] = updated;
        this.closeDetail();
      },
      error: (err) => console.error('Erro ao cancelar compromisso:', err),
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private hasConflict(startStr: string, endStr: string): boolean {
    const newStart = new Date(startStr).getTime();
    const newEnd = new Date(endStr).getTime();
    return this.appointments.some(apt => {
      if (apt.status === 'Cancelado') return false;
      if (!apt.dataInicio || !apt.dataFim) return false;
      const aptStart = new Date(apt.dataInicio).getTime();
      const aptEnd = new Date(apt.dataFim).getTime();
      if (isNaN(aptStart) || isNaN(aptEnd)) return false;
      return newStart < aptEnd && newEnd > aptStart;
    });
  }

  private getMonday(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() + (day === 0 ? -6 : 1 - day));
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private cap(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private emptyAppointment() {
    return {
      dataInicio: '',
      dataFim: '',
      status: 'Agendado',
      observacoes: '',
      patientId: null,
    };
  }

  private toDatetimeLocal(date: Date): string {
    const p = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}T${p(date.getHours())}:${p(date.getMinutes())}`;
  }

  private withSeconds(dt: string): string {
    return /T\d{2}:\d{2}$/.test(dt) ? `${dt}:00` : dt;
  }
}
