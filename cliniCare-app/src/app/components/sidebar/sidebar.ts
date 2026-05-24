import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  standalone: true
})
export class Sidebar implements OnInit, OnDestroy {
  menu = [
    { label: 'Painel', icon: 'dashboard.png', route: '/dashboard' },
    { label: 'Agenda', icon: 'calendar.png', route: '/agenda' },
    { label: 'Pacientes', icon: 'group.png', route: '/patients' }
  ];

  isOpen = false;
  private routerSub?: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => (this.isOpen = false));
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

  toggleMenu() { this.isOpen = !this.isOpen; }
  closeMenu()  { this.isOpen = false; }

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
