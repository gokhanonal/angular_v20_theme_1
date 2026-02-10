import { Component, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modals',
    standalone: true,
    imports: [CommonModule, TranslateModule, NgbModalModule],
    template: `
    <div class="page-header">
      <h2>{{ 'MODALS.TITLE' | translate }}</h2>
    </div>

    <div class="row g-4">
      <!-- Basic Modal -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-header"><h6 class="mb-0">{{ 'MODALS.BASIC_MODAL' | translate }}</h6></div>
          <div class="card-body">
            <p class="text-secondary">A standard modal with header, body, and footer.</p>
            <button class="btn btn-gradient-primary" (click)="openBasic(basicModal)">
              <i class="bi bi-window me-1"></i>{{ 'MODALS.OPEN' | translate }}
            </button>
          </div>
        </div>
      </div>

      <!-- Confirm Dialog -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-header"><h6 class="mb-0">{{ 'MODALS.CONFIRM_DIALOG' | translate }}</h6></div>
          <div class="card-body">
            <p class="text-secondary">A confirmation dialog with Yes/No actions.</p>
            <button class="btn btn-gradient-danger" (click)="openConfirm(confirmModal)">
              <i class="bi bi-exclamation-triangle me-1"></i>{{ 'MODALS.OPEN' | translate }}
            </button>
          </div>
        </div>
      </div>

      <!-- Large Modal -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-header"><h6 class="mb-0">{{ 'MODALS.LARGE_MODAL' | translate }}</h6></div>
          <div class="card-body">
            <p class="text-secondary">A large-sized modal for more content.</p>
            <button class="btn btn-gradient-success" (click)="openLarge(largeModal)">
              <i class="bi bi-arrows-fullscreen me-1"></i>{{ 'MODALS.OPEN' | translate }}
            </button>
          </div>
        </div>
      </div>

      <!-- Scrollable Modal -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-header"><h6 class="mb-0">{{ 'MODALS.SCROLLABLE' | translate }}</h6></div>
          <div class="card-body">
            <p class="text-secondary">A modal with scrollable content.</p>
            <button class="btn btn-outline-primary" (click)="openScrollable(scrollableModal)">
              <i class="bi bi-arrow-down-up me-1"></i>{{ 'MODALS.OPEN' | translate }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Basic Modal Template -->
    <ng-template #basicModal let-modal>
      <div class="modal-header">
        <h5 class="modal-title">{{ 'MODALS.BASIC_MODAL' | translate }}</h5>
        <button type="button" class="btn-close" (click)="modal.dismiss()"></button>
      </div>
      <div class="modal-body">
        <p>This is a basic modal dialog. You can put any content here including forms, text, images, and more.</p>
        <div class="alert alert-info mb-0"><i class="bi bi-info-circle me-2"></i>This is built with ng-bootstrap NgbModal.</div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline-secondary" (click)="modal.dismiss()">{{ 'MODALS.CLOSE' | translate }}</button>
        <button class="btn btn-gradient-primary" (click)="modal.close('saved')">{{ 'MODALS.SAVE' | translate }}</button>
      </div>
    </ng-template>

    <!-- Confirm Modal Template -->
    <ng-template #confirmModal let-modal>
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title"><i class="bi bi-exclamation-triangle me-2"></i>{{ 'MODALS.ARE_YOU_SURE' | translate }}</h5>
        <button type="button" class="btn-close btn-close-white" (click)="modal.dismiss()"></button>
      </div>
      <div class="modal-body text-center py-4">
        <i class="bi bi-trash display-4 text-danger mb-3 d-block"></i>
        <h5>{{ 'MODALS.ARE_YOU_SURE' | translate }}</h5>
        <p class="text-secondary">{{ 'MODALS.CONFIRM_MESSAGE' | translate }}</p>
      </div>
      <div class="modal-footer justify-content-center">
        <button class="btn btn-outline-secondary px-4" (click)="modal.dismiss()">{{ 'MODALS.CANCEL' | translate }}</button>
        <button class="btn btn-danger px-4" (click)="modal.close('confirmed')">{{ 'MODALS.CONFIRM' | translate }}</button>
      </div>
    </ng-template>

    <!-- Large Modal Template -->
    <ng-template #largeModal let-modal>
      <div class="modal-header">
        <h5 class="modal-title">{{ 'MODALS.LARGE_MODAL' | translate }}</h5>
        <button type="button" class="btn-close" (click)="modal.dismiss()"></button>
      </div>
      <div class="modal-body">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">First Name</label>
            <input type="text" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">Last Name</label>
            <input type="text" class="form-control">
          </div>
          <div class="col-12">
            <label class="form-label">Email</label>
            <input type="email" class="form-control">
          </div>
          <div class="col-12">
            <label class="form-label">Message</label>
            <textarea class="form-control" rows="4"></textarea>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline-secondary" (click)="modal.dismiss()">{{ 'MODALS.CLOSE' | translate }}</button>
        <button class="btn btn-gradient-success" (click)="modal.close('saved')">{{ 'MODALS.SAVE' | translate }}</button>
      </div>
    </ng-template>

    <!-- Scrollable Modal Template -->
    <ng-template #scrollableModal let-modal>
      <div class="modal-header">
        <h5 class="modal-title">{{ 'MODALS.SCROLLABLE' | translate }}</h5>
        <button type="button" class="btn-close" (click)="modal.dismiss()"></button>
      </div>
      <div class="modal-body">
        @for (i of [1,2,3,4,5,6,7,8,9,10]; track i) {
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        }
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline-secondary" (click)="modal.dismiss()">{{ 'MODALS.CLOSE' | translate }}</button>
      </div>
    </ng-template>
  `
})
export class ModalsComponent {
    private modalService = inject(NgbModal);

    openBasic(content: TemplateRef<any>): void {
        this.modalService.open(content, { centered: true });
    }

    openConfirm(content: TemplateRef<any>): void {
        this.modalService.open(content, { centered: true });
    }

    openLarge(content: TemplateRef<any>): void {
        this.modalService.open(content, { size: 'lg' });
    }

    openScrollable(content: TemplateRef<any>): void {
        this.modalService.open(content, { scrollable: true, size: 'lg' });
    }
}
