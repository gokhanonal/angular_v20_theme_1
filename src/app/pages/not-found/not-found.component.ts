import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [RouterLink],
    template: `
    <div class="not-found-container">
      <div class="not-found-content animate-fade-in">
        <div class="error-code">404</div>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <div class="d-flex gap-3 justify-content-center">
          <a routerLink="/dashboard" class="btn btn-gradient-primary">
            <i class="bi bi-house me-2"></i>Go Home
          </a>
          <button class="btn btn-outline-secondary" onclick="history.back()">
            <i class="bi bi-arrow-left me-2"></i>Go Back
          </button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .not-found-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-body);
      text-align: center;
      padding: 2rem;
    }
    .error-code {
      font-size: 8rem;
      font-weight: 900;
      background: var(--gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      margin-bottom: 1rem;
    }
    h2 { font-weight: 700; margin-bottom: 0.5rem; }
    p { color: var(--text-secondary); margin-bottom: 2rem; }
  `]
})
export class NotFoundComponent { }
