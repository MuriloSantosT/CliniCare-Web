import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  standalone: true
})
export class Sidebar {
  menu = [
    { label: 'Painel', icon: '🏠', route: '/dashboard' },
    { label: 'Agenda', icon: '📅', route: '/agenda' },
    { label: 'Pacientes', icon: '👥', route: '/patients' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get userInitials(): string {
    const nome = this.currentUser?.nome ?? '';
    return nome
      .split(' ')
      .slice(0, 2)
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
