import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-view-report',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-report.html',
  styleUrl: './view-report.css',
})
export class ViewReport implements OnInit {
  patientId: number | null = null;
  patientName = '';

  reportId: number | null = null;
  titulo = '';
  descricao = '';
  data = '';

  editMode = false;
  saving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService,
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.queryParamMap;
    const pid = params.get('patientId');
    this.patientId = pid ? +pid : null;
    this.patientName = params.get('patientName') ?? '';

    const report = window.history.state?.report;
    if (report) {
      this.reportId = report.id ?? null;
      this.titulo = report.titulo ?? '';
      this.descricao = report.descricao ?? '';
      this.data = report.data ?? '';
    }
  }

  entrarEdicao() {
    this.editMode = true;
  }

  cancelarEdicao() {
    const report = window.history.state?.report;
    if (report) {
      this.titulo = report.titulo ?? '';
      this.descricao = report.descricao ?? '';
    }
    this.editMode = false;
  }

  salvar() {
    if (!this.descricao.trim() || !this.reportId) return;
    this.saving = true;
    this.reportService.update(this.reportId, {
      titulo: this.titulo.trim() || undefined,
      descricao: this.descricao,
    }).subscribe({
      next: () => {
        this.editMode = false;
        this.saving = false;
      },
      error: (err) => {
        console.error('Erro ao atualizar relatório:', err);
        this.saving = false;
      },
    });
  }

  baixarPdf() {
    window.print();
  }

  voltar() {
    if (this.patientId) {
      this.router.navigate(['/patients', this.patientId]);
    } else {
      this.router.navigate(['/patients']);
    }
  }
}
