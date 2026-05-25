import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-report',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-report.html',
  styleUrl: './new-report.css',
})
export class NewReport implements OnInit {
  patientId: number | null = null;
  patientName = '';

  titulo = '';
  descricao = '';
  saving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.queryParamMap;
    const pid = params.get('patientId');
    this.patientId = pid ? +pid : null;
    this.patientName = params.get('patientName') ?? '';
  }

  salvar() {
    if (!this.descricao.trim() || !this.patientId) return;
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.saving = true;

    const hoje = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const data = `${hoje.getFullYear()}-${pad(hoje.getMonth() + 1)}-${pad(hoje.getDate())}`;

    const payload = {
      data,
      titulo: this.titulo.trim() || undefined,
      descricao: this.descricao,
      patientId: this.patientId,
      user: { id: user.id },
    };

    this.reportService.create(payload).subscribe({
      next: () => this.voltar(),
      error: (err) => {
        console.error('Erro ao salvar relatório:', err);
        this.saving = false;
      },
    });
  }

  voltar() {
    if (this.patientId) {
      this.router.navigate(['/patients', this.patientId]);
    } else {
      this.router.navigate(['/patients']);
    }
  }
}
