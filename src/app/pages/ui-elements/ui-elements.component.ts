import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-ui-elements',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="page-header">
      <h2>{{ 'UI_ELEMENTS.TITLE' | translate }}</h2>
    </div>

    <!-- Buttons -->
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center"><h6 class="mb-0">{{ 'UI_ELEMENTS.BUTTONS' | translate }}</h6></div>
      <div class="card-body">
        <div class="d-flex flex-wrap gap-2 mb-3">
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-success">Success</button>
          <button class="btn btn-danger">Danger</button>
          <button class="btn btn-warning">Warning</button>
          <button class="btn btn-info">Info</button>
          <button class="btn btn-light">Light</button>
          <button class="btn btn-dark">Dark</button>
        </div>
        <div class="d-flex flex-wrap gap-2 mb-3">
          <button class="btn btn-outline-primary">Primary</button>
          <button class="btn btn-outline-secondary">Secondary</button>
          <button class="btn btn-outline-success">Success</button>
          <button class="btn btn-outline-danger">Danger</button>
          <button class="btn btn-outline-warning">Warning</button>
          <button class="btn btn-outline-info">Info</button>
        </div>
        <div class="d-flex flex-wrap gap-2 mb-3">
          <button class="btn btn-gradient-primary">Gradient Primary</button>
          <button class="btn btn-gradient-success">Gradient Success</button>
          <button class="btn btn-gradient-danger">Gradient Danger</button>
        </div>
        <div class="d-flex flex-wrap gap-2 mb-3">
          <button class="btn btn-primary btn-sm">Small</button>
          <button class="btn btn-primary">Default</button>
          <button class="btn btn-primary btn-lg">Large</button>
        </div>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-primary" disabled>Disabled</button>
          <button class="btn btn-primary"><i class="bi bi-download me-1"></i>With Icon</button>
          <button class="btn btn-primary rounded-pill">Pill Button</button>
        </div>
      </div>
    </div>

    <!-- Badges -->
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center"><h6 class="mb-0">{{ 'UI_ELEMENTS.BADGES' | translate }}</h6></div>
      <div class="card-body">
        <div class="d-flex flex-wrap gap-2 mb-3">
          <span class="badge bg-primary">Primary</span>
          <span class="badge bg-secondary">Secondary</span>
          <span class="badge bg-success">Success</span>
          <span class="badge bg-danger">Danger</span>
          <span class="badge bg-warning text-dark">Warning</span>
          <span class="badge bg-info">Info</span>
        </div>
        <div class="d-flex flex-wrap gap-2">
          <span class="badge rounded-pill bg-primary">Pill</span>
          <span class="badge rounded-pill bg-success">99+</span>
          <span class="badge rounded-pill bg-danger">New</span>
        </div>
      </div>
    </div>

    <!-- Avatars -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'UI_ELEMENTS.AVATARS' | translate }}</h6></div>
      <div class="card-body">
        <div class="d-flex align-items-center gap-3">
          <div class="avatar avatar-sm" style="background: var(--gradient-primary)">SM</div>
          <div class="avatar avatar-md" style="background: var(--gradient-success)">MD</div>
          <div class="avatar avatar-lg" style="background: var(--gradient-danger)">LG</div>
          <div class="avatar avatar-xl" style="background: var(--gradient-warning)">XL</div>
        </div>
      </div>
    </div>

    <!-- Alerts -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'UI_ELEMENTS.ALERTS' | translate }}</h6></div>
      <div class="card-body">
        <div class="alert alert-primary d-flex align-items-center" role="alert">
          <i class="bi bi-info-circle-fill me-2"></i> A simple primary alert — check it out!
        </div>
        <div class="alert alert-success d-flex align-items-center" role="alert">
          <i class="bi bi-check-circle-fill me-2"></i> Operation completed successfully.
        </div>
        <div class="alert alert-warning d-flex align-items-center" role="alert">
          <i class="bi bi-exclamation-triangle-fill me-2"></i> Warning! Please review the changes.
        </div>
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <i class="bi bi-x-circle-fill me-2"></i> Error occurred while processing.
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
      </div>
    </div>

    <!-- Spinners -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'UI_ELEMENTS.SPINNERS' | translate }}</h6></div>
      <div class="card-body">
        <div class="d-flex flex-wrap gap-3 mb-3">
          <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>
          <div class="spinner-border text-success" role="status"></div>
          <div class="spinner-border text-danger" role="status"></div>
          <div class="spinner-border text-warning" role="status"></div>
          <div class="spinner-border text-info" role="status"></div>
        </div>
        <div class="d-flex flex-wrap gap-3">
          <div class="spinner-grow text-primary" role="status"></div>
          <div class="spinner-grow text-success" role="status"></div>
          <div class="spinner-grow text-danger" role="status"></div>
          <div class="spinner-grow text-warning" role="status"></div>
        </div>
      </div>
    </div>

    <!-- Progress Bars -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'UI_ELEMENTS.PROGRESS' | translate }}</h6></div>
      <div class="card-body">
        <div class="progress mb-3" style="height: 8px;">
          <div class="progress-bar" style="width: 25%">25%</div>
        </div>
        <div class="progress mb-3" style="height: 12px;">
          <div class="progress-bar bg-success" style="width: 50%">50%</div>
        </div>
        <div class="progress mb-3" style="height: 14px;">
          <div class="progress-bar bg-info progress-bar-striped progress-bar-animated" style="width: 75%">75%</div>
        </div>
        <div class="progress" style="height: 16px;">
          <div class="progress-bar bg-primary" style="width: 30%">30%</div>
          <div class="progress-bar bg-success" style="width: 20%">20%</div>
          <div class="progress-bar bg-warning" style="width: 15%">15%</div>
        </div>
      </div>
    </div>

    <!-- Tooltips & Labels -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'UI_ELEMENTS.LABELS' | translate }} & {{ 'UI_ELEMENTS.TOOLTIPS' | translate }}</h6></div>
      <div class="card-body">
        <div class="d-flex flex-wrap gap-2 mb-3">
          <span class="badge bg-primary">Default Label</span>
          <span class="badge bg-success"><i class="bi bi-check me-1"></i>Approved</span>
          <span class="badge bg-warning text-dark"><i class="bi bi-clock me-1"></i>Pending</span>
          <span class="badge bg-danger"><i class="bi bi-x me-1"></i>Rejected</span>
          <span class="badge bg-info"><i class="bi bi-star me-1"></i>Featured</span>
        </div>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-outline-secondary" title="Tooltip on top" data-bs-toggle="tooltip" data-bs-placement="top">Top</button>
          <button class="btn btn-sm btn-outline-secondary" title="Tooltip on right" data-bs-toggle="tooltip" data-bs-placement="right">Right</button>
          <button class="btn btn-sm btn-outline-secondary" title="Tooltip on bottom" data-bs-toggle="tooltip" data-bs-placement="bottom">Bottom</button>
          <button class="btn btn-sm btn-outline-secondary" title="Tooltip on left" data-bs-toggle="tooltip" data-bs-placement="left">Left</button>
        </div>
      </div>
    </div>

    <!-- Toasts -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'UI_ELEMENTS.TOASTS' | translate }}</h6></div>
      <div class="card-body">
        <button class="btn btn-gradient-primary me-2" (click)="showToast('success')">Show Success Toast</button>
        <button class="btn btn-gradient-danger me-2" (click)="showToast('error')">Show Error Toast</button>
        <button class="btn btn-gradient-success" (click)="showToast('info')">Show Info Toast</button>
      </div>
    </div>

    <!-- Toast container -->
    <div class="toast-container">
      @for (toast of toasts(); track toast.id) {
        <div class="toast show animate-fade-in" role="alert">
          <div class="toast-header">
            <div class="status-dot me-2" [ngClass]="toast.type === 'success' ? 'active' : toast.type === 'error' ? 'inactive' : 'pending'"></div>
            <strong class="me-auto">{{ toast.title }}</strong>
            <small>Just now</small>
            <button class="btn-close" (click)="removeToast(toast.id)"></button>
          </div>
          <div class="toast-body">{{ toast.message }}</div>
        </div>
      }
    </div>

    <!-- Pagination -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'UI_ELEMENTS.PAGINATION' | translate }}</h6></div>
      <div class="card-body">
        <nav>
          <ul class="pagination mb-3">
            <li class="page-item disabled"><a class="page-link">Previous</a></li>
            <li class="page-item active"><a class="page-link">1</a></li>
            <li class="page-item"><a class="page-link">2</a></li>
            <li class="page-item"><a class="page-link">3</a></li>
            <li class="page-item"><a class="page-link">4</a></li>
            <li class="page-item"><a class="page-link">5</a></li>
            <li class="page-item"><a class="page-link">Next</a></li>
          </ul>
        </nav>
        <nav>
          <ul class="pagination pagination-sm">
            <li class="page-item active"><a class="page-link">1</a></li>
            <li class="page-item"><a class="page-link">2</a></li>
            <li class="page-item"><a class="page-link">3</a></li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- List Groups -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'UI_ELEMENTS.LIST_GROUPS' | translate }}</h6></div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <ul class="list-group">
              <li class="list-group-item active">Active item</li>
              <li class="list-group-item">A second item with some text</li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                With badge <span class="badge bg-primary rounded-pill">14</span>
              </li>
              <li class="list-group-item disabled">Disabled item</li>
            </ul>
          </div>
          <div class="col-md-6">
            <div class="list-group">
              <a class="list-group-item list-group-item-action list-group-item-primary">Primary</a>
              <a class="list-group-item list-group-item-action list-group-item-success">Success</a>
              <a class="list-group-item list-group-item-action list-group-item-danger">Danger</a>
              <a class="list-group-item list-group-item-action list-group-item-warning">Warning</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UiElementsComponent {
  toasts = signal<{ id: number; type: string; title: string; message: string }[]>([]);
  private toastId = 0;

  showToast(type: string): void {
    const titles: Record<string, string> = { success: 'Success', error: 'Error', info: 'Information' };
    const messages: Record<string, string> = {
      success: 'Operation completed successfully!',
      error: 'Something went wrong. Please try again.',
      info: 'Here is some useful information.'
    };
    const id = ++this.toastId;
    this.toasts.update(t => [...t, { id, type, title: titles[type], message: messages[type] }]);
    setTimeout(() => this.removeToast(id), 4000);
  }

  removeToast(id: number): void {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }
}
