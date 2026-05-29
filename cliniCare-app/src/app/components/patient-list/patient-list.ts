import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService, Patient } from '../../services/patient.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-list.html',
  styleUrls: ['./patient-list.css'],
})
export class PatientList implements OnInit {
  pacientes: Patient[] = [];
  filtroNome: string = '';
  mensagem: string = '';

  constructor(
    private patientService: PatientService,
    private authService: AuthService,
    private router: Router
  ) {}

  get pacientesFiltrados(): Patient[] {
    const filtro = this.filtroNome.trim().toLowerCase();
    return filtro
      ? this.pacientes.filter((patient) =>
          patient.nome.toLowerCase().includes(filtro)
        )
      : this.pacientes;
  }

  ngOnInit() {
    this.carregarPacientes();
    this.patientService.testar().subscribe((res) => {
      console.log(res);
      this.mensagem = res as string;
    });
  }

  carregarPacientes() {
    const user = this.authService.getCurrentUser();
    if (!user) return;
    this.patientService.listarPorUsuario(user.id).subscribe({
      next: (dados) => {
        this.pacientes = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar pacientes', erro);
      },
    });
  }

  visualizarPaciente(id: number) {
    this.router.navigate([`/patients/${id}`]);
  }

  editarPaciente(id: number) {
    this.router.navigate([`/patients/${id}/edit`]);
  }

  deletar(id: number) {
    const user = this.authService.getCurrentUser();
    if (!user) return;
    this.patientService.deletar(id, user.id).subscribe(() => {
      this.carregarPacientes();
    });
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

  novoPaciente() {
    this.router.navigate(['patients/new']);
  }

  trackByPatient(_: number, patient: Patient) {
    return patient.id;
  }
}

