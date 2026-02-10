import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar, Validators, NgxEditorComponent, NgxEditorMenuComponent } from 'ngx-editor';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxEditorModule, NgxEditorComponent, NgxEditorMenuComponent],
  template: `
    <div class="page-header">
      <h2>Rich Text Editor</h2>
      <p>Modern and powerful rich text editor for Angular based on ProseMirror.</p>
    </div>

    <div class="row g-4">
      <!-- Basic Editor -->
      <div class="col-12">
        <div class="card">
          <div class="card-header"><h6 class="mb-0">Basic Implementation</h6></div>
          <div class="card-body">
            <div class="NgxEditor__Wrapper">
              <ngx-editor-menu [editor]="editor" [toolbar]="toolbar"></ngx-editor-menu>
              <ngx-editor
                [editor]="editor"
                [(ngModel)]="html"
                [placeholder]="'Type here...'"
              ></ngx-editor>
            </div>
            
            <div class="mt-4">
              <h6 class="small fw-bold text-uppercase text-muted mb-2">HTML Output:</h6>
              <div class="bg-light p-3 rounded border font-monospace small overflow-auto" style="max-height: 200px;">
                {{ html }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reactive Forms Integration -->
      <div class="col-lg-8">
        <div class="card h-100">
          <div class="card-header"><h6 class="mb-0">Reactive Forms Integration</h6></div>
          <div class="card-body">
            <form [formGroup]="form">
              <div class="mb-3">
                <label class="form-label">Post Title</label>
                <input type="text" class="form-control" placeholder="Enter title">
              </div>
              <div class="mb-3">
                <label class="form-label">Content</label>
                <div class="NgxEditor__Wrapper">
                  <ngx-editor-menu [editor]="formEditor" [toolbar]="toolbar"></ngx-editor-menu>
                  <ngx-editor
                    [editor]="formEditor"
                    formControlName="editorContent"
                    [placeholder]="'Write your story...'"
                  ></ngx-editor>
                </div>
              </div>
              <button class="btn btn-primary" [disabled]="form.invalid">Submit Post</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Features Card -->
      <div class="col-lg-4">
        <div class="card h-100 bg-soft-primary border-primary">
          <div class="card-body">
            <h6 class="text-primary mb-3"><i class="bi bi-info-circle-fill me-2"></i>Editor Features</h6>
            <ul class="list-unstyled mb-0">
              <li class="mb-2 d-flex align-items-center"><i class="bi bi-check2 text-success me-2"></i> ProseMirror based</li>
              <li class="mb-2 d-flex align-items-center"><i class="bi bi-check2 text-success me-2"></i> Lightweight & Extensible</li>
              <li class="mb-2 d-flex align-items-center"><i class="bi bi-check2 text-success me-2"></i> Reactive Forms support</li>
              <li class="mb-2 d-flex align-items-center"><i class="bi bi-check2 text-success me-2"></i> Custom Toolbars</li>
              <li class="mb-2 d-flex align-items-center"><i class="bi bi-check2 text-success me-2"></i> Material Design support</li>
              <li class="d-flex align-items-center"><i class="bi bi-check2 text-success me-2"></i> Floating menus</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .NgxEditor__Wrapper {
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background: var(--bg-card);
      overflow: hidden;
    }
  `]
})
export class EditorComponent implements OnInit, OnDestroy {
  editor!: Editor;
  formEditor!: Editor;
  html = '<h3>Hello World!</h3><p>This is a <b>Rich Text Editor</b> demo.</p>';

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  ngOnInit(): void {
    this.editor = new Editor();
    this.formEditor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.formEditor.destroy();
  }
}
