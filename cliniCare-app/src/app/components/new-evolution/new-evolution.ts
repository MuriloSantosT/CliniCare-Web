import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { EvolutionService } from '../../services/evolution.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-evolution',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './new-evolution.html',
  styleUrl: './new-evolution.css',
})
export class NewEvolution implements OnInit {
  appointmentId: number | null = null;
  patientId: number | null = null;
  patientName = '';

  titulo = '';
  texto = '';
  planoProximaSessao = '';
  data = '';
  saving = false;
  viewMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evolutionService: EvolutionService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.queryParamMap;
    const aid = params.get('appointmentId');
    const pid = params.get('patientId');

    this.appointmentId = aid ? +aid : null;
    this.patientId = pid ? +pid : null;
    this.patientName = params.get('patientName') ?? '';

    const evo = window.history.state?.evolution;
    if (evo) {
      this.viewMode = true;
      this.titulo = evo.titulo ?? '';
      this.texto = evo.texto ?? '';
      this.planoProximaSessao = evo.planoProximaSessao ?? '';
      this.data = evo.data ?? '';
    }
  }

  salvar() {
    if (!this.texto.trim() || !this.patientId) return;
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.saving = true;

    const hoje = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const data = `${hoje.getFullYear()}-${pad(hoje.getMonth() + 1)}-${pad(hoje.getDate())}`;

    const payload = {
      data,
      titulo: this.titulo.trim() || undefined,
      texto: this.texto,
      planoProximaSessao: this.planoProximaSessao.trim() || undefined,
      patientId: this.patientId,
      appointmentId: this.appointmentId,
      user: { id: user.id },
    };

    this.evolutionService.create(payload).subscribe({
      next: () => this.voltar(),
      error: (err) => {
        console.error('Erro ao salvar evolução:', err);
        this.saving = false;
      },
    });
  }

  voltar() {
    if (this.patientId) {
      this.router.navigate(['/patients', this.patientId]);
    } else {
      this.router.navigate(['/agenda']);
    }
  }
}
