import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RecaptchaModule } from 'ng-recaptcha';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
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
          <div class="auth-logo"><i class="bi bi-hexagon-fill"></i></div>
          <h2>{{ 'AUTH.CREATE_ACCOUNT' | translate }}</h2>
          <p>{{ 'AUTH.REGISTER' | translate }}</p>
        </div>

        <form (ngSubmit)="onRegister()">
          <div class="mb-3">
            <label class="form-label">{{ 'AUTH.FULL_NAME' | translate }}</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-person"></i></span>
              <input type="text" class="form-control" [(ngModel)]="fullName" name="fullName" placeholder="John Doe">
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">{{ 'AUTH.EMAIL' | translate }}</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-envelope"></i></span>
              <input type="email" class="form-control" [(ngModel)]="email" name="email" placeholder="john&#64;example.com">
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">{{ 'AUTH.PASSWORD' | translate }}</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-lock"></i></span>
              <input type="password" class="form-control" [(ngModel)]="password" name="password" placeholder="••••••••">
            </div>
          </div>
          <div class="mb-4">
            <label class="form-label">{{ 'AUTH.CONFIRM_PASSWORD' | translate }}</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
              <input type="password" class="form-control" [(ngModel)]="confirmPassword" name="confirmPassword" placeholder="••••••••">
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
          <div class="form-check mb-4">
            <input class="form-check-input" type="checkbox" id="terms">
            <label class="form-check-label" for="terms">I agree to the Terms of Service and Privacy Policy</label>
          </div>
          <button type="submit" class="btn btn-gradient-primary w-100 mb-3">
            <i class="bi bi-person-plus me-2"></i>{{ 'AUTH.SIGN_UP' | translate }}
          </button>
          <div class="text-center">
            <span class="text-secondary">{{ 'AUTH.HAS_ACCOUNT' | translate }} </span>
            <a routerLink="/login" class="auth-link">{{ 'AUTH.SIGN_IN' | translate }}</a>
          </div>
        </form>
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
      width: 100%; max-width: 440px; background: var(--bg-card);
      border-radius: 1rem; padding: 2.5rem; box-shadow: var(--shadow-lg);
    }
    .auth-header {
      text-align: center; margin-bottom: 2rem;
      h2 { font-weight: 700; margin-bottom: 0.25rem; }
      p { color: var(--text-secondary); }
    }
    .auth-logo { font-size: 2.5rem; color: #667eea; margin-bottom: 1rem; }
    .auth-link { color: #667eea; text-decoration: none; font-size: 0.875rem; cursor: pointer; &:hover { text-decoration: underline; } }
  `]
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  captchaResponse: string | null = null;
  captchaError = false;
  confirmPassword = '';
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

  onRegister(): void {
    // For local dev/mock, we'll be more lenient if needed, 
    // but the user should solve the standard test reCAPTCHA.
    if (!this.captchaResponse) {
      this.captchaError = true;
      return;
    }
  }
}
