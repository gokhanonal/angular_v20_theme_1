import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-two-factor',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, TranslateModule],
    template: `
    <div class="auth-container">
      <div class="auth-card animate-fade-in">
        <div class="auth-header">
          <div class="auth-logo">
            <i class="bi bi-shield-lock-fill"></i>
          </div>
          <h2>{{ 'AUTH.TWO_FACTOR_TITLE' | translate }}</h2>
          <p>{{ 'AUTH.TWO_FACTOR_SUBTITLE' | translate }}</p>
        </div>

        <form (ngSubmit)="onVerify()">
          <div class="mb-4">
            <label class="form-label d-block text-center mb-3">{{ 'AUTH.ENTER_OTP' | translate }}</label>
            <div class="d-flex justify-content-between gap-2 otp-input-container">
              @for (digit of otpDigits; track $index) {
                <input 
                  type="text" 
                  class="form-control otp-input" 
                  maxlength="1" 
                  [(ngModel)]="otpDigits[$index]"
                  [name]="'otp' + $index"
                  (keyup)="onKeyUp($event, $index)"
                  #otpInput
                >
              }
            </div>
          </div>

          <button type="submit" class="btn btn-gradient-primary w-100 mb-3" [disabled]="!isOtpComplete()">
            <i class="bi bi-check-circle me-2"></i>{{ 'AUTH.VERIFY' | translate }}
          </button>

          <div class="text-center">
            <span class="text-secondary small">{{ 'AUTH.DIDNT_RECEIVE_CODE' | translate }} </span>
            <a class="auth-link small">{{ 'AUTH.RESEND_CODE' | translate }}</a>
          </div>
          
          <div class="text-center mt-3">
            <a routerLink="/login" class="text-muted small text-decoration-none">
              <i class="bi bi-arrow-left me-1"></i>{{ 'AUTH.BACK_TO_LOGIN' | translate }}
            </a>
          </div>
        </form>
      </div>
    </div>
  `,
    styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-body);
      padding: 2rem;
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
    .otp-input-container {
      max-width: 320px;
      margin: 0 auto;
    }
    .otp-input {
      width: 45px;
      height: 55px;
      text-align: center;
      font-size: 1.5rem;
      font-weight: 700;
      border-radius: 0.75rem;
      border: 2px solid var(--border-color);
      background: var(--bg-body);
      transition: all 0.2s;
      
      &:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
      }
    }
  `]
})
export class TwoFactorComponent implements OnInit {
    otpDigits = ['', '', '', '', '', ''];

    constructor(private router: Router) { }

    ngOnInit(): void { }

    onKeyUp(event: any, index: number): void {
        const key = event.key;
        if (key >= '0' && key <= '9') {
            if (index < 5) {
                const nextInput = event.target.nextElementSibling as HTMLInputElement;
                if (nextInput) nextInput.focus();
            }
        } else if (key === 'Backspace') {
            if (index > 0) {
                const prevInput = event.target.previousElementSibling as HTMLInputElement;
                if (prevInput) prevInput.focus();
            }
        }
    }

    isOtpComplete(): boolean {
        return this.otpDigits.every(digit => digit !== '');
    }

    onVerify(): void {
        if (this.isOtpComplete()) {
            // Simulate verification
            this.router.navigate(['/dashboard']);
        }
    }
}
