import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-forms-page',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, NgbDatepickerModule, NgbTimepickerModule],
    template: `
    <div class="page-header">
      <h2>{{ 'FORMS.TITLE' | translate }}</h2>
    </div>

    <!-- Basic Inputs -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'FORMS.BASIC_INPUTS' | translate }}</h6></div>
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">{{ 'FORMS.FIRST_NAME' | translate }}</label>
            <input type="text" class="form-control" placeholder="John">
          </div>
          <div class="col-md-6">
            <label class="form-label">{{ 'FORMS.LAST_NAME' | translate }}</label>
            <input type="text" class="form-control" placeholder="Doe">
          </div>
          <div class="col-md-6">
            <label class="form-label">{{ 'FORMS.EMAIL' | translate }}</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-envelope"></i></span>
              <input type="email" class="form-control" placeholder="john&#64;example.com">
            </div>
          </div>
          <div class="col-md-6">
            <label class="form-label">{{ 'FORMS.PASSWORD' | translate }}</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-lock"></i></span>
              <input [type]="showPassword ? 'text' : 'password'" class="form-control" placeholder="••••••••">
              <button class="btn btn-outline-secondary" (click)="showPassword = !showPassword">
                <i class="bi" [ngClass]="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
              </button>
            </div>
          </div>
          <div class="col-12">
            <label class="form-label">{{ 'FORMS.MESSAGE' | translate }}</label>
            <textarea class="form-control" rows="3" placeholder="Enter your message..."></textarea>
          </div>
          <div class="col-md-6">
            <label class="form-label">Input with floating label</label>
            <div class="form-floating">
              <input type="text" class="form-control" id="floatingInput" placeholder="Type here">
              <label for="floatingInput">Floating label</label>
            </div>
          </div>
          <div class="col-md-6">
            <label class="form-label">Disabled & Readonly</label>
            <input type="text" class="form-control mb-2" value="Disabled input" disabled>
            <input type="text" class="form-control" value="Readonly input" readonly>
          </div>
        </div>
      </div>
    </div>

    <!-- Select -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'FORMS.SELECT' | translate }}</h6></div>
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Basic Select</label>
            <select class="form-select">
              <option selected>{{ 'FORMS.SELECT_OPTION' | translate }}</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">Multiple Select</label>
            <select class="form-select" multiple size="3">
              <option>Option A</option>
              <option>Option B</option>
              <option>Option C</option>
              <option>Option D</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">Select sizes</label>
            <select class="form-select form-select-sm mb-2"><option>Small</option></select>
            <select class="form-select mb-2"><option>Default</option></select>
            <select class="form-select form-select-lg"><option>Large</option></select>
          </div>
        </div>
      </div>
    </div>

    <!-- Radio & Checkbox -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'FORMS.RADIO_CHECKBOX' | translate }}</h6></div>
      <div class="card-body">
        <div class="row g-4">
          <div class="col-md-4">
            <h6 class="mb-3">Checkboxes</h6>
            <div class="form-check mb-2">
              <input class="form-check-input" type="checkbox" id="check1" checked>
              <label class="form-check-label" for="check1">Checked checkbox</label>
            </div>
            <div class="form-check mb-2">
              <input class="form-check-input" type="checkbox" id="check2">
              <label class="form-check-label" for="check2">Default checkbox</label>
            </div>
            <div class="form-check mb-2">
              <input class="form-check-input" type="checkbox" id="check3" disabled>
              <label class="form-check-label" for="check3">Disabled checkbox</label>
            </div>
          </div>
          <div class="col-md-4">
            <h6 class="mb-3">Radios</h6>
            <div class="form-check mb-2">
              <input class="form-check-input" type="radio" name="radio1" id="radio1" checked>
              <label class="form-check-label" for="radio1">Selected radio</label>
            </div>
            <div class="form-check mb-2">
              <input class="form-check-input" type="radio" name="radio1" id="radio2">
              <label class="form-check-label" for="radio2">Default radio</label>
            </div>
            <div class="form-check mb-2">
              <input class="form-check-input" type="radio" name="radio1" id="radio3" disabled>
              <label class="form-check-label" for="radio3">Disabled radio</label>
            </div>
          </div>
          <div class="col-md-4">
            <h6 class="mb-3">Switches</h6>
            <div class="form-check form-switch mb-2">
              <input class="form-check-input" type="checkbox" id="switch1" checked>
              <label class="form-check-label" for="switch1">Active switch</label>
            </div>
            <div class="form-check form-switch mb-2">
              <input class="form-check-input" type="checkbox" id="switch2">
              <label class="form-check-label" for="switch2">Default switch</label>
            </div>
            <div class="form-check form-switch mb-2">
              <input class="form-check-input" type="checkbox" id="switch3" disabled>
              <label class="form-check-label" for="switch3">Disabled switch</label>
            </div>
          </div>
          <div class="col-12">
            <h6 class="mb-3">Inline</h6>
            <div class="d-flex gap-4 flex-wrap">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheck1" checked>
                <label class="form-check-label" for="inlineCheck1">Inline 1</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheck2">
                <label class="form-check-label" for="inlineCheck2">Inline 2</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadio" id="inlineRadio1" checked>
                <label class="form-check-label" for="inlineRadio1">Radio 1</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadio" id="inlineRadio2">
                <label class="form-check-label" for="inlineRadio2">Radio 2</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Date & Time Pickers -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'FORMS.DATE_TIME' | translate }}</h6></div>
      <div class="card-body">
        <div class="row g-4">
          <div class="col-md-6">
            <label class="form-label">Date Picker (ng-bootstrap)</label>
            <div class="input-group">
              <input class="form-control" ngbDatepicker #dp="ngbDatepicker" placeholder="yyyy-mm-dd" [(ngModel)]="selectedDate">
              <button class="btn btn-outline-secondary" (click)="dp.toggle()">
                <i class="bi bi-calendar3"></i>
              </button>
            </div>
          </div>
          <div class="col-md-6">
            <label class="form-label">Time Picker (ng-bootstrap)</label>
            <ngb-timepicker [(ngModel)]="selectedTime" [spinners]="true"></ngb-timepicker>
          </div>
          <div class="col-md-6">
            <label class="form-label">HTML Date Input</label>
            <input type="date" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">HTML DateTime-local Input</label>
            <input type="datetime-local" class="form-control">
          </div>
        </div>
      </div>
    </div>

    <!-- Form Validation -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'FORMS.VALIDATION' | translate }}</h6></div>
      <div class="card-body">
        <form [formGroup]="validationForm" (ngSubmit)="onSubmit()">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">{{ 'FORMS.FIRST_NAME' | translate }} *</label>
              <input type="text" class="form-control" formControlName="firstName"
                [class.is-invalid]="validationForm.get('firstName')?.invalid && validationForm.get('firstName')?.touched"
                [class.is-valid]="validationForm.get('firstName')?.valid && validationForm.get('firstName')?.touched">
              <div class="invalid-feedback">{{ 'FORMS.REQUIRED' | translate }}</div>
              <div class="valid-feedback">Looks good!</div>
            </div>
            <div class="col-md-6">
              <label class="form-label">{{ 'FORMS.EMAIL' | translate }} *</label>
              <input type="email" class="form-control" formControlName="email"
                [class.is-invalid]="validationForm.get('email')?.invalid && validationForm.get('email')?.touched"
                [class.is-valid]="validationForm.get('email')?.valid && validationForm.get('email')?.touched">
              <div class="invalid-feedback">{{ 'FORMS.INVALID_EMAIL' | translate }}</div>
            </div>
            <div class="col-md-6">
              <label class="form-label">{{ 'FORMS.PASSWORD' | translate }} *</label>
              <input type="password" class="form-control" formControlName="password"
                [class.is-invalid]="validationForm.get('password')?.invalid && validationForm.get('password')?.touched">
              <div class="invalid-feedback">Minimum 6 characters required</div>
            </div>
            <div class="col-md-6">
              <label class="form-label">{{ 'FORMS.SELECT' | translate }} *</label>
              <select class="form-select" formControlName="role"
                [class.is-invalid]="validationForm.get('role')?.invalid && validationForm.get('role')?.touched">
                <option value="">{{ 'FORMS.SELECT_OPTION' | translate }}</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="editor">Editor</option>
              </select>
              <div class="invalid-feedback">{{ 'FORMS.REQUIRED' | translate }}</div>
            </div>
            <div class="col-12">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" formControlName="agree" id="agreeCheck"
                  [class.is-invalid]="validationForm.get('agree')?.invalid && validationForm.get('agree')?.touched">
                <label class="form-check-label" for="agreeCheck">I agree to the terms and conditions</label>
              </div>
            </div>
            <div class="col-12">
              <button class="btn btn-gradient-primary me-2" type="submit">{{ 'FORMS.SUBMIT' | translate }}</button>
              <button class="btn btn-outline-secondary" type="button" (click)="validationForm.reset()">{{ 'FORMS.RESET' | translate }}</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Input Groups -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">Input Groups</h6></div>
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <div class="input-group mb-3">
              <span class="input-group-text">&#64;</span>
              <input type="text" class="form-control" placeholder="Username">
            </div>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Amount">
              <span class="input-group-text">.00</span>
            </div>
            <div class="input-group">
              <span class="input-group-text">$</span>
              <input type="text" class="form-control" placeholder="Amount">
              <span class="input-group-text">.00</span>
            </div>
          </div>
          <div class="col-md-6">
            <label class="form-label">Range</label>
            <input type="range" class="form-range mb-3">
            <label class="form-label">Color picker</label>
            <input type="color" class="form-control form-control-color" value="#667eea">
          </div>
        </div>
      </div>
    </div>
  `
})
export class FormsPageComponent {
    showPassword = false;
    selectedDate: any;
    selectedTime = { hour: 13, minute: 30 };
    validationForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.validationForm = this.fb.group({
            firstName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            role: ['', Validators.required],
            agree: [false, Validators.requiredTrue]
        });
    }

    onSubmit(): void {
        this.validationForm.markAllAsTouched();
    }
}
