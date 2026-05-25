import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EvolutionService } from '../../services/evolution.service';

@Component({
  selector: 'app-view-evolution',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-evolution.html',
  styleUrl: './view-evolution.css',
})
export class ViewEvolution implements OnInit {
  patientId: number | null = null;
  patientName = '';

  evolutionId: number | null = null;
  titulo = '';
  texto = '';
  planoProximaSessao = '';
  data = '';

  editMode = false;
  saving = false;

  private originalState: { titulo: string; texto: string; planoProximaSessao: string } = {
    titulo: '',
    texto: '',
    planoProximaSessao: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evolutionService: EvolutionService,
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.queryParamMap;
    const pid = params.get('patientId');
    this.patientId = pid ? +pid : null;
    this.patientName = params.get('patientName') ?? '';

    const evo = window.history.state?.evolution;
    if (evo) {
      this.evolutionId = evo.id ?? null;
      this.titulo = evo.titulo ?? '';
      this.texto = evo.texto ?? '';
      this.planoProximaSessao = evo.planoProximaSessao ?? '';
      this.data = evo.data ?? '';
      this.originalState = { titulo: this.titulo, texto: this.texto, planoProximaSessao: this.planoProximaSessao };
    }
  }

  entrarEdicao() {
    this.editMode = true;
  }

  cancelarEdicao() {
    this.titulo = this.originalState.titulo;
    this.texto = this.originalState.texto;
    this.planoProximaSessao = this.originalState.planoProximaSessao;
    this.editMode = false;
  }

  salvar() {
    if (!this.texto.trim() || !this.evolutionId) return;
    this.saving = true;
    this.evolutionService.update(this.evolutionId, {
      titulo: this.titulo.trim() || undefined,
      texto: this.texto,
      planoProximaSessao: this.planoProximaSessao.trim() || undefined,
    }).subscribe({
      next: () => {
        this.originalState = { titulo: this.titulo, texto: this.texto, planoProximaSessao: this.planoProximaSessao };
        this.editMode = false;
        this.saving = false;
      },
      error: (err) => {
        console.error('Erro ao atualizar evolução:', err);
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
