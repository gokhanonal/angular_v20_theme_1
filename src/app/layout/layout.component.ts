import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../services/theme.service';
import { LoggerService } from '../services/logger.service';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, TranslateModule, NgbDropdownModule],
  template: `
    <!-- Sidebar -->
    <aside class="sidebar" [class.collapsed]="sidebarCollapsed()">
      <div class="sidebar-brand">
        <i class="bi bi-hexagon-fill brand-icon"></i>
        <span class="brand-text" *ngIf="!sidebarCollapsed()">Angular<span class="text-accent">v20</span></span>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section" *ngIf="!sidebarCollapsed()">
          <span class="nav-section-title">{{ 'SIDEBAR.COMPONENTS' | translate }}</span>
        </div>
        @for (item of menuItems; track item.label) {
          @if (!item.children) {
            <a class="nav-item" [routerLink]="item.route" routerLinkActive="active">
              <i class="bi" [ngClass]="item.icon"></i>
              <span class="nav-label" *ngIf="!sidebarCollapsed()">{{ item.label | translate }}</span>
            </a>
          } @else {
            <div class="nav-group">
              <button class="nav-item nav-toggle" (click)="toggleMenu(item.label)" [class.open]="openMenus()[item.label]">
                <i class="bi" [ngClass]="item.icon"></i>
                <span class="nav-label" *ngIf="!sidebarCollapsed()">{{ item.label | translate }}</span>
                <i class="bi bi-chevron-down nav-arrow" *ngIf="!sidebarCollapsed()"></i>
              </button>
              <div class="nav-submenu" *ngIf="openMenus()[item.label]">
                @for (child of item.children; track child.label) {
                  <a class="nav-item sub-item" [routerLink]="child.route" routerLinkActive="active">
                    <i class="bi bi-dot"></i>
                    <span class="nav-label">{{ child.label | translate }}</span>
                  </a>
                }
              </div>
            </div>
          }
        }
      </nav>

      <div class="sidebar-footer" *ngIf="!sidebarCollapsed()">
        <div class="env-badge">
          <i class="bi bi-server"></i>
          <span>{{ environment.envName | uppercase }}</span>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="main-wrapper" [class.sidebar-collapsed]="sidebarCollapsed()">
      <!-- Header -->
      <header class="app-header">
        <div class="header-left">
          <button class="btn-icon" (click)="toggleSidebar()">
            <i class="bi bi-list"></i>
          </button>
          <div class="search-box">
            <i class="bi bi-search"></i>
            <input type="text" [placeholder]="'HEADER.SEARCH' | translate">
          </div>
        </div>
        <div class="header-right">
          <!-- Theme toggle -->
          <button class="btn-icon" (click)="themeService.toggleTheme()" [title]="'HEADER.THEME_TOGGLE' | translate">
            <i class="bi" [ngClass]="themeService.currentTheme() === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill'"></i>
          </button>

          <!-- Notifications -->
          <button class="btn-icon position-relative">
            <i class="bi bi-bell"></i>
            <span class="notification-badge">3</span>
          </button>

          <!-- Language -->
          <div class="dropdown" ngbDropdown>
            <button class="btn-icon dropdown-toggle" ngbDropdownToggle>
              <i class="bi bi-translate"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" ngbDropdownMenu>
              <li><button class="dropdown-item" (click)="switchLang('en')">🇬🇧 English</button></li>
              <li><button class="dropdown-item" (click)="switchLang('tr')">🇹🇷 Türkçe</button></li>
            </ul>
          </div>

          <!-- User -->
          <div class="dropdown" ngbDropdown>
            <button class="user-avatar dropdown-toggle" ngbDropdownToggle>
              <div class="avatar avatar-sm" style="background: var(--gradient-primary)">JD</div>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" ngbDropdownMenu>
              <li><a class="dropdown-item" routerLink="/profile"><i class="bi bi-person me-2"></i>{{ 'HEADER.PROFILE' | translate }}</a></li>
              <li><a class="dropdown-item"><i class="bi bi-gear me-2"></i>{{ 'HEADER.SETTINGS' | translate }}</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-danger"><i class="bi bi-box-arrow-right me-2"></i>{{ 'HEADER.LOGOUT' | translate }}</a></li>
            </ul>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="page-content animate-fade-in">
        <router-outlet />
      </main>

      <!-- Footer -->
      <footer class="app-footer">
        <span>{{ 'COMMON.FOOTER_TEXT' | translate }}</span>
        <span>{{ 'COMMON.ENVIRONMENT' | translate }}: <strong>{{ environment.envName | uppercase }}</strong></span>
      </footer>
    </div>

    <!-- Mobile overlay -->
    <div class="sidebar-overlay" *ngIf="!sidebarCollapsed()" (click)="toggleSidebar()"></div>
  `,
  styles: [`
    :host { display: flex; min-height: 100vh; }

    // === Sidebar ===
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: var(--sidebar-width);
      background: var(--bg-sidebar);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      transition: width var(--transition-speed);
      overflow-y: auto;
      overflow-x: hidden;

      &.collapsed { width: var(--sidebar-collapsed-width); }
    }

    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .brand-icon { font-size: 1.75rem; color: #667eea; }
    .brand-text { font-size: 1.15rem; font-weight: 700; color: #fff; letter-spacing: -0.01em; }
    .text-accent { color: #667eea; }

    .sidebar-nav { flex: 1; padding: 0.75rem 0; }

    .nav-section-title {
      display: block;
      padding: 0.75rem 1.5rem 0.4rem;
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: rgba(168, 178, 193, 0.5);
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.6rem 1.5rem;
      color: var(--text-sidebar);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 400;
      transition: all 0.2s;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      cursor: pointer;

      i { font-size: 1.1rem; }

      &:hover, &.active {
        color: var(--text-sidebar-active);
        background: var(--bg-sidebar-active);
      }

      &.active {
        border-right: 3px solid #667eea;
        font-weight: 500;
      }
    }

    .nav-toggle {
      .nav-arrow {
        margin-left: auto;
        font-size: 0.7rem;
        transition: transform 0.2s;
      }
      &.open .nav-arrow { transform: rotate(180deg); }
    }

    .nav-submenu {
      .sub-item {
        padding-left: 2.75rem;
        font-size: 0.8rem;
      }
    }

    .sidebar-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }

    .env-badge {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.7rem;
      font-weight: 600;
      color: #667eea;
      background: rgba(102, 126, 234, 0.1);
      padding: 0.35rem 0.75rem;
      border-radius: 1rem;
    }

    // === Main ===
    .main-wrapper {
      flex: 1;
      margin-left: var(--sidebar-width);
      transition: margin-left var(--transition-speed);
      display: flex;
      flex-direction: column;
      min-height: 100vh;

      &.sidebar-collapsed { margin-left: 0; }
    }

    // === Header ===
    .app-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1.5rem;
      height: var(--header-height);
      background: var(--bg-header);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-left, .header-right { display: flex; align-items: center; gap: 0.5rem; }

    .btn-icon {
      background: none;
      border: none;
      width: 38px;
      height: 38px;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      font-size: 1.15rem;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: rgba(102, 126, 234, 0.08);
        color: #667eea;
      }
    }

    .search-box {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      padding: 0.4rem 0.75rem;
      margin-left: 0.5rem;

      i { color: var(--text-secondary); font-size: 0.85rem; }

      input {
        border: none;
        outline: none;
        background: transparent;
        color: var(--text-primary);
        font-size: 0.85rem;
        width: 200px;
      }
    }

    .notification-badge {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #ef4444;
      color: #fff;
      font-size: 0.6rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .user-avatar {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    // === Page ===
    .page-content {
      flex: 1;
      padding: 1.5rem;
    }

    // === Footer ===
    .app-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      font-size: 0.8rem;
      color: var(--text-secondary);
      border-top: 1px solid var(--border-color);
    }

    // === Overlay ===
    .sidebar-overlay { display: none; }

    @media (max-width: 991.98px) {
      .sidebar {
        transform: translateX(-100%);
        &:not(.collapsed) { transform: translateX(0); }
      }
      .main-wrapper { margin-left: 0 !important; }
      .sidebar-overlay {
        display: block;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
      }
      .search-box input { width: 100px; }
    }
  `]
})
export class LayoutComponent {
  sidebarCollapsed = signal(false);
  openMenus = signal<Record<string, boolean>>({});
  environment = environment;

  menuItems: MenuItem[] = [
    { label: 'SIDEBAR.DASHBOARD', icon: 'bi-grid-1x2-fill', route: '/dashboard' },
    {
      label: 'SIDEBAR.COMPONENTS', icon: 'bi-layers-fill',
      children: [
        { label: 'SIDEBAR.UI_ELEMENTS', icon: '', route: '/ui-elements' },
        { label: 'SIDEBAR.FORMS', icon: '', route: '/forms' },
        { label: 'SIDEBAR.TABLES', icon: '', route: '/tables' },
        { label: 'SIDEBAR.CHARTS', icon: '', route: '/charts' },
        { label: 'SIDEBAR.MODALS', icon: '', route: '/modals' },
        { label: 'SIDEBAR.NAVIGATION', icon: '', route: '/navigation' },
        { label: 'SIDEBAR.ICONS', icon: '', route: '/icons' },
        { label: 'SIDEBAR.GRID', icon: '', route: '/grid' },
      ]
    },
    {
      label: 'SIDEBAR.PAGES', icon: 'bi-file-earmark-text-fill',
      children: [
        { label: 'SIDEBAR.PROFILE', icon: '', route: '/profile' },
        { label: 'SIDEBAR.LOGIN', icon: '', route: '/login' },
        { label: 'SIDEBAR.REGISTER', icon: '', route: '/register' },
        { label: 'SIDEBAR.NOT_FOUND', icon: '', route: '/404' },
      ]
    }
  ];

  constructor(
    public themeService: ThemeService,
    private translate: TranslateService,
    private logger: LoggerService
  ) {
    this.logger.info('Layout initialized', { env: environment.envName });
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }

  toggleMenu(label: string): void {
    this.openMenus.update(menus => ({ ...menus, [label]: !menus[label] }));
  }

  switchLang(lang: string): void {
    this.translate.use(lang);
    this.logger.info('Language switched', { lang });
  }
}
