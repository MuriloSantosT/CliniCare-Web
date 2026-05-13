import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService, Patient, Guardian } from '../../services/patient.service';

@Component({
  selector: 'app-edit-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-patient.html',
  styleUrl: './edit-patient.css',
})
export class EditPatient implements OnInit {
  patient: Partial<Patient> = {};
  novoResponsavel: Partial<Guardian> = {
    nome: '',
    cpf: '',
    telefone: ''
  };

  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.patientService.getById(+id).subscribe({
        next: (patient) => {
          this.patient = patient;
          if (!this.patient.responsaveis) {
            this.patient.responsaveis = [];
          }
        },
        error: (erro) => {
          console.error('Erro ao carregar paciente:', erro);
          alert('Erro ao carregar paciente.');
          this.router.navigate(['/patients']);
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
    if (this.patient.id && this.patient.nome && this.patient.cpf && this.patient.dataNascimento) {
      const pacienteParaEnviar = {
        nome: this.patient.nome || '',
        cpf: (this.patient.cpf || '').replace(/\D/g, ''), // Remove formatação do CPF
        dataNascimento: this.patient.dataNascimento || '',
        sexo: this.patient.sexo || '',
        alergias: this.patient.alergias || '',
        convenio: this.patient.convenio || '',
        telefoneEmergencia: (this.patient.telefoneEmergencia || '').replace(/\D/g, ''), // Remove formatação
        observacoesGerais: this.patient.observacoesGerais || '',
        nomeEscola: this.patient.nomeEscola || '',
        telefoneEscola: (this.patient.telefoneEscola || '').replace(/\D/g, ''), // Remove formatação
        ano: this.patient.ano || '',
        periodo: this.patient.periodo || '',
        rua: this.patient.rua || '',
        numero: this.patient.numero || '',
        bairro: this.patient.bairro || '',
        cidade: this.patient.cidade || '',
        estado: this.patient.estado || '',
        cep: (this.patient.cep || '').replace(/\D/g, ''), // Remove formatação
        complemento: this.patient.complemento || '',
        responsaveis: (this.patient.responsaveis && this.patient.responsaveis.length > 0) 
          ? this.patient.responsaveis 
          : [],
      };

      console.log('Dados enviados:', pacienteParaEnviar);
      
      this.patientService.atualizar(this.patient.id, pacienteParaEnviar as Patient).subscribe({
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