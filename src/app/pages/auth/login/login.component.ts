import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RecaptchaModule } from 'ng-recaptcha';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslateModule, RecaptchaModule],
  template: `
    <div class="auth-container" [style.backgroundImage]="'url(' + backgroundImage + ')'">
      <!-- Language Switcher -->
      <div class="lang-switcher animate-fade-in">
        <button class="btn btn-sm" [class.btn-primary]="currentLang === 'en'" (click)="changeLanguage('en')">EN</button>
        <button class="btn btn-sm ms-1" [class.btn-primary]="currentLang === 'tr'" (click)="changeLanguage('tr')">TR</button>
      </div>

      <div class="auth-card animate-fade-in">
        <div class="auth-header">
          <div class="auth-logo">
            <i class="bi bi-hexagon-fill"></i>
          </div>
          <h2>{{ 'AUTH.WELCOME_BACK' | translate }}</h2>
          <p>{{ 'AUTH.LOGIN' | translate }}</p>
        </div>

        <form (ngSubmit)="onLogin()">
          <div class="mb-3">
            <label class="form-label">{{ 'AUTH.EMAIL' | translate }}</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-envelope"></i></span>
              <input type="text" class="form-control" [(ngModel)]="username" name="username" placeholder="admin">
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">{{ 'AUTH.PASSWORD' | translate }}</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-lock"></i></span>
              <input [type]="showPw ? 'text' : 'password'" class="form-control" [(ngModel)]="password" name="password" placeholder="••••••••">
              <button type="button" class="btn btn-outline-secondary" (click)="showPw = !showPw">
                <i class="bi" [ngClass]="showPw ? 'bi-eye-slash' : 'bi-eye'"></i>
              </button>
            </div>
          </div>

          <!-- Google reCAPTCHA Section -->
          <div class="mb-3 d-flex flex-column align-items-center">
            <re-captcha
              (resolved)="resolved($event)"
              siteKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI">
            </re-captcha>
            <div *ngIf="captchaError" class="text-danger small mt-1 animate-shake w-100 text-center">
              <i class="bi bi-exclamation-circle me-1"></i>{{ 'AUTH.CAPTCHA_ERROR' | translate }}
            </div>
          </div>

          <div *ngIf="loginError" class="alert alert-danger py-2 small mb-3">
            <i class="bi bi-exclamation-triangle me-2"></i>Invalid credentials
          </div>

          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="remember">
              <label class="form-check-label" for="remember">{{ 'AUTH.REMEMBER_ME' | translate }}</label>
            </div>
            <a class="auth-link">{{ 'AUTH.FORGOT_PASSWORD' | translate }}</a>
          </div>
          <button type="submit" class="btn btn-gradient-primary w-100 mb-3">
            <i class="bi bi-box-arrow-in-right me-2"></i>{{ 'AUTH.SIGN_IN' | translate }}
          </button>
          <div class="text-center">
            <span class="text-secondary">{{ 'AUTH.NO_ACCOUNT' | translate }} </span>
            <a routerLink="/register" class="auth-link">{{ 'AUTH.SIGN_UP' | translate }}</a>
          </div>
        </form>

        <hr class="my-4">
        <div class="d-flex gap-2 justify-content-center">
          <button class="btn btn-outline-secondary btn-sm"><i class="bi bi-google me-1"></i>Google</button>
          <button class="btn btn-outline-secondary btn-sm"><i class="bi bi-github me-1"></i>GitHub</button>
          <button class="btn btn-outline-secondary btn-sm"><i class="bi bi-microsoft me-1"></i>Microsoft</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--bg-body);
      padding: 2rem;
      position: relative;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(2px);
        z-index: 0;
      }
    }
    .lang-switcher, .auth-card {
      position: relative;
      z-index: 1;
    }
    .lang-switcher {
      position: absolute;
      top: 2rem;
      right: 2rem;
      background: var(--bg-card);
      padding: 0.5rem;
      border-radius: 0.5rem;
      box-shadow: var(--shadow-sm);
    }
    .auth-card {
      width: 100%;
      max-width: 440px;
      background: var(--bg-card);
      border-radius: 1rem;
      padding: 2.5rem;
      box-shadow: var(--shadow-lg);
    }
    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
      h2 { font-weight: 700; margin-bottom: 0.25rem; }
      p { color: var(--text-secondary); }
    }
    .auth-logo {
      font-size: 2.5rem;
      color: #667eea;
      margin-bottom: 1rem;
    }
    .auth-link {
      color: #667eea;
      text-decoration: none;
      font-size: 0.875rem;
      cursor: pointer;
      &:hover { text-decoration: underline; }
    }
    .animate-shake {
      animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
    @keyframes shake {
      10%, 90% { transform: translate3d(-1px, 0, 0); }
      20%, 80% { transform: translate3d(2px, 0, 0); }
      30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
      40%, 60% { transform: translate3d(4px, 0, 0); }
    }
  `]
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  showPw = false;
  captchaResponse: string | null = null;
  captchaError = false;
  loginError = false;
  currentLang = 'en';
  backgroundImage = '';

  constructor(
    private router: Router,
    private translate: TranslateService,
    private authService: AuthService
  ) {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'en';

    // Sync language if it changes elsewhere
    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
    });
  }

  ngOnInit(): void {
    this.updateBackground();
  }

  updateBackground(): void {
    const hour = new Date().getHours();
    let image = 'day.png';

    if (hour >= 17 && hour < 20) {
      image = 'evening.jpg';
    } else if (hour >= 20 || hour < 6) {
      image = 'night.jpg';
    }

    this.backgroundImage = `assets/i18n/images/background/${image}`;
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  resolved(captchaResponse: string | null) {
    this.captchaResponse = captchaResponse;
    this.captchaError = false;
  }

  onLogin(): void {
    // For local dev/mock, we'll be more lenient if needed, 
    // but the user should solve the standard test reCAPTCHA.
    if (!this.captchaResponse) {
      this.captchaError = true;
      return;
    }

    const success = this.authService.login({
      email: this.username.trim(),
      password: this.password.trim()
    });

    if (success) {
      this.loginError = false;
      this.router.navigate(['/two-factor']);
    } else {
      this.loginError = true;
      // Shake animation effect is already in template
    }
  }
}
