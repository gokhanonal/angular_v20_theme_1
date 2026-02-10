import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-file-upload',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="page-header">
      <h2>File Upload</h2>
      <p>Custom and standard file upload components for various use cases.</p>
    </div>

    <div class="row g-4">
      <!-- Bootstrap File Inputs -->
      <div class="col-lg-6">
        <div class="card h-100">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h6 class="mb-0">Bootstrap File Input</h6>
            <button class="btn btn-sm btn-soft-success">Show Code <i class="bi bi-code-slash ms-1"></i></button>
          </div>
          <div class="card-body">
            <div class="mb-4">
              <label class="form-label small fw-bold text-uppercase">Default file input example</label>
              <input class="form-control" type="file" id="formFile">
            </div>
            <div class="mb-4">
              <label class="form-label small fw-bold text-uppercase">Multiple files input example</label>
              <input class="form-control" type="file" id="formFileMultiple" multiple>
            </div>
            <div class="mb-4">
              <label class="form-label small fw-bold text-uppercase">Disabled file input example</label>
              <input class="form-control" type="file" id="formFileDisabled" disabled>
            </div>
            <div class="mb-4">
              <label class="form-label small fw-bold text-uppercase">Small file input example</label>
              <input class="form-control form-control-sm" id="formFileSm" type="file">
            </div>
            <div>
              <label class="form-label small fw-bold text-uppercase">Large file input example</label>
              <input class="form-control form-control-lg" id="formFileLg" type="file">
            </div>
          </div>
        </div>
      </div>

      <!-- FilePond Style (Custom) -->
      <div class="col-lg-6">
        <div class="mb-4">
          <h6 class="mb-3">Filepond:</h6>
          <div class="card">
            <div class="card-body">
              <h6 class="small fw-bold text-uppercase mb-3">Multiple Upload</h6>
              <div 
                class="file-pond-zone" 
                [class.active]="dragActivePond()"
                (dragover)="onPondDragOver($event)" 
                (dragleave)="onPondDragLeave($event)" 
                (drop)="onPondDrop($event)">
                <div class="pond-content text-center py-4">
                  <p class="mb-0 text-muted">Drop files here to Upload...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h6 class="small fw-bold text-uppercase mb-3">Single Upload</h6>
            <div class="d-flex justify-content-center py-4">
               <div 
                class="file-pond-circular" 
                [class.active]="dragActiveCircular()"
                (dragover)="onCircularDragOver($event)" 
                (dragleave)="onCircularDragLeave($event)" 
                (drop)="onCircularDrop($event)">
                <div class="circular-content text-center px-4">
                  <p class="mb-0 x-small text-muted">Drop files here to Upload...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dropzone Style -->
      <div class="col-12">
        <div class="card">
          <div class="card-header"><h6 class="mb-0">Dropzone</h6></div>
          <div class="card-body">
            <div 
              class="dropzone-area" 
              [class.active]="dragActiveDropzone()"
              (dragover)="onDropzoneDragOver($event)" 
              (dragleave)="onDropzoneDragLeave($event)" 
              (drop)="onDropzoneDrop($event)">
              <div class="dz-message text-center py-5">
                <i class="bi bi-cloud-arrow-up display-4 text-muted mb-3 d-block"></i>
                <h5 class="text-muted">Drop Files here to upload</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .btn-soft-success {
      background-color: rgba(56, 239, 125, 0.1);
      color: #11998e;
      border: 1px solid rgba(56, 239, 125, 0.2);
      &:hover { background-color: rgba(56, 239, 125, 0.2); }
    }

    .file-pond-zone {
      border: 1px dashed var(--border-color);
      background: var(--bg-body);
      border-radius: 0.5rem;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover, &.active {
        background: rgba(102, 126, 234, 0.05);
        border-color: #667eea;
      }
    }

    .file-pond-circular {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 1px dashed var(--border-color);
      background: var(--bg-body);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover, &.active {
        background: rgba(102, 126, 234, 0.05);
        border-color: #667eea;
      }
      .x-small { font-size: 0.7rem; }
    }

    .dropzone-area {
      border: 1px dashed var(--border-color);
      background: var(--bg-body);
      border-radius: 0.75rem;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover, &.active {
        background: rgba(102, 126, 234, 0.05);
        border-color: #667eea;
      }
    }
  `]
})
export class FileUploadComponent {
    dragActivePond = signal(false);
    dragActiveCircular = signal(false);
    dragActiveDropzone = signal(false);

    // Pond
    onPondDragOver(event: DragEvent) {
        event.preventDefault();
        this.dragActivePond.set(true);
    }
    onPondDragLeave(event: DragEvent) {
        this.dragActivePond.set(false);
    }
    onPondDrop(event: DragEvent) {
        event.preventDefault();
        this.dragActivePond.set(false);
        console.log('Files dropped in Pond:', event.dataTransfer?.files);
    }

    // Circular
    onCircularDragOver(event: DragEvent) {
        event.preventDefault();
        this.dragActiveCircular.set(true);
    }
    onCircularDragLeave(event: DragEvent) {
        this.dragActiveCircular.set(false);
    }
    onCircularDrop(event: DragEvent) {
        event.preventDefault();
        this.dragActiveCircular.set(false);
        console.log('Files dropped in Circular:', event.dataTransfer?.files);
    }

    // Dropzone
    onDropzoneDragOver(event: DragEvent) {
        event.preventDefault();
        this.dragActiveDropzone.set(true);
    }
    onDropzoneDragLeave(event: DragEvent) {
        this.dragActiveDropzone.set(false);
    }
    onDropzoneDrop(event: DragEvent) {
        event.preventDefault();
        this.dragActiveDropzone.set(false);
        console.log('Files dropped in Dropzone:', event.dataTransfer?.files);
    }
}
