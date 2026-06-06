import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService, Patient, Guardian } from '../../services/patient.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-patient.html',
  styleUrl: './edit-patient.css',
})
export class EditPatient implements OnInit {
  patient: Partial<Patient> = {};

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

  constructor(
    private patientService: PatientService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const user = this.authService.getCurrentUser();
    if (!user) { this.router.navigate(['/login']); return; }
    if (id) {
      this.patientService.getById(+id, user.id).subscribe({
        next: (patient) => {
          this.patient = patient;
          if (!this.patient.responsaveis) {
            this.patient.responsaveis = [];
          }
        },
        error: (erro) => {
          if (erro.status === 403 || erro.status === 404) {
            this.router.navigate(['/patients']);
          } else {
            console.error('Erro ao carregar paciente:', erro);
            this.router.navigate(['/patients']);
          }
        }
      });
    }
  }

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
    const user = this.authService.getCurrentUser();
    if (!user) { alert('Sessão expirada. Faça login novamente.'); return; }

    if (this.patient.id && this.patient.nome && this.patient.cpf && this.patient.dataNascimento) {
      const { id, user: _user, createdAt, updatedAt, ...rest } = this.patient as any;
      const pacienteParaEnviar = {
        ...rest,
        cpf: (this.patient.cpf || '').replace(/\D/g, ''),
        telefoneEmergencia: (this.patient.telefoneEmergencia || '').replace(/\D/g, ''),
        telefoneEscola: (this.patient.telefoneEscola || '').replace(/\D/g, ''),
        cep: (this.patient.cep || '').replace(/\D/g, ''),
        responsaveis: (this.patient.responsaveis && this.patient.responsaveis.length > 0)
          ? this.patient.responsaveis
          : [],
      };

      console.log('Dados enviados:', pacienteParaEnviar);

      this.patientService.atualizar(this.patient.id, pacienteParaEnviar as Patient, user.id).subscribe({
        next: (pacienteSalvo) => {
          console.log('Paciente atualizado com sucesso:', pacienteSalvo);
          this.router.navigate(['/patients']);
        },
        error: (erro) => {
          console.error('Erro ao atualizar paciente:', erro);
          alert('Erro ao atualizar paciente. Verifique os dados e tente novamente.');
        }
      });
    } else {
      alert('Por favor, preencha os campos obrigatórios: Nome, CPF e Data de Nascimento.');
    }
  }

  cancelar() {
    this.router.navigate(['/patients']);
  }
}