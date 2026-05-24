import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PatientService, Patient } from '../../services/patient.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  pacientes: Patient[] = [];
  mensagem: string = '';

  totalConsultas = 122;
  prontuarios = 102;
  pacientesDoDia = 4;
  proximoAtendimentoHorario = '16:30';
  notas = 'Guardar alguns minutos para pesquisar novas dinâmicas';

  readonly dataHoje = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  readonly mesAtual = new Date().toLocaleDateString('pt-BR', { month: 'long' });

  primeiroNome(nomeCompleto: string): string {
    return nomeCompleto.trim().split(' ')[0];
  }

  constructor(private patientService: PatientService) {}

  get pacientesCadastrados(): number {
    return this.pacientes.length;
  }

  get aniversariantesDoMes(): Patient[] {
    const mesAtual = new Date().getMonth();
    return this.pacientes
      .filter((patient) => {
        const nascimento = new Date(patient.dataNascimento);
        return nascimento.getMonth() === mesAtual;
      })
      .sort((a, b) =>
        new Date(a.dataNascimento).getDate() - new Date(b.dataNascimento).getDate()
      );
  }

  formatarData(data: string): string {
    const nascimento = new Date(data);
    const dia = String(nascimento.getDate()).padStart(2, '0');
    const mes = String(nascimento.getMonth() + 1).padStart(2, '0');
    const ano = nascimento.getFullYear();
    return `${dia}/${mes}/${ano}`;
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

  ngOnInit() {
    this.carregarPacientes();

    this.patientService.testar().subscribe((res) => {
      console.log(res);
      this.mensagem = res as string;
    });
  }

  carregarPacientes() {
    this.patientService.listar().subscribe({
      next: (dados) => {
        this.pacientes = dados;
        console.log(dados);
      },
      error: (erro) => {
        console.error('Erro ao buscar pacientes', erro);
      },
    });
  }
}
