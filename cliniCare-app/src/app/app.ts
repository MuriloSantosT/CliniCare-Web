import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

const AUTH_ROUTES = ['/login', '/signup'];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('cliniCare-app');
  isAuthPage = signal(false);

  private routerSub?: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isAuthPage.set(AUTH_ROUTES.includes(this.router.url));

    this.routerSub = this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.isAuthPage.set(AUTH_ROUTES.some(r => e.urlAfterRedirects.startsWith(r)));
    });
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }
}
