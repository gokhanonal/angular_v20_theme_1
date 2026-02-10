import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, TranslateModule],
    template: `
    <div class="auth-container">
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
      min-height: 100vh; display: flex; align-items: center;
      justify-content: center; background: var(--bg-body); padding: 2rem;
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
    confirmPassword = '';
    onRegister(): void { }
}
