import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDatepickerModule, NgbTimepickerModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiSelectComponent, SelectOption } from '../../shared/components/multi-select/multi-select.component';

@Component({
  selector: 'app-forms-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, NgbDatepickerModule, NgbTimepickerModule, NgbAlertModule, MultiSelectComponent],
  template: `
    <div class="page-header">
      <h2>{{ 'FORMS.TITLE' | translate }}</h2>
    </div>

    <!-- Basic Inputs (Template-Driven Validation) -->
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0">{{ 'FORMS.BASIC_INPUTS' | translate }} (Template-Driven)</h6>
      </div>
      <div class="card-body">
        <form #basicForm="ngForm">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">{{ 'FORMS.FIRST_NAME' | translate }} *</label>
              <input type="text" class="form-control" name="templateFirstName" 
                     [(ngModel)]="templateData.firstName" required #tFirstName="ngModel"
                     [class.is-invalid]="tFirstName.invalid && tFirstName.touched"
                     [class.is-valid]="tFirstName.valid && tFirstName.touched">
              <div class="invalid-feedback" *ngIf="tFirstName.errors?.['required']">
                {{ 'FORMS.REQUIRED' | translate }}
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label">{{ 'FORMS.EMAIL' | translate }} *</label>
              <input type="email" class="form-control" name="templateEmail" 
                     [(ngModel)]="templateData.email" required email #tEmail="ngModel"
                     [class.is-invalid]="tEmail.invalid && tEmail.touched"
                     [class.is-valid]="tEmail.valid && tEmail.touched">
              <div class="invalid-feedback" *ngIf="tEmail.errors?.['required']">
                {{ 'FORMS.REQUIRED' | translate }}.
              </div>
              <div class="invalid-feedback" *ngIf="tEmail.errors?.['email']">
                {{ 'FORMS.INVALID_EMAIL' | translate }}.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Select -->
    <div class="card mb-4">
      <div class="card-header bg-secondary text-white d-flex justify-content-between align-items-center"><h6 class="mb-0">{{ 'FORMS.SELECT' | translate }}</h6></div>
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
            <label class="form-label">Frameworks (Text Only)</label>
            <app-multi-select 
              [options]="multiSelectOptions" 
              placeholder="Search frameworks..."
              [(ngModel)]="selectedFrameworks">
            </app-multi-select>
          </div>

          <div class="col-md-6">
            <label class="form-label">Countries (with Flags)</label>
            <app-multi-select 
              [options]="countryOptions" 
              placeholder="Search countries..."
              [(ngModel)]="selectedCountries">
            </app-multi-select>
          </div>
          <div class="col-12 mt-2 pt-2 border-top">
            <div class="small text-muted mb-1">Frameworks: {{ selectedFrameworks | json }}</div>
            <div class="small text-muted">Countries: {{ selectedCountries | json }}</div>
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
          </div>
        </div>
      </div>
    </div>

    <!-- Colored Form Controls Showcase -->
    <div class="card mb-4">
      <div class="card-header bg-soft-info text-primary"><h6 class="mb-0">Colored & Pastel Form Controls</h6></div>
      <div class="card-body">
        <div class="row g-4">
          <!-- Colored Checkboxes -->
          <div class="col-md-3">
            <h6 class="small fw-bold mb-3 text-uppercase">Colored Checkboxes</h6>
            @for (color of colors; track color) {
              <div class="form-check mb-2">
                <input class="form-check-input check-{{color}}" type="checkbox" [id]="'check-' + color" checked>
                <label class="form-check-label text-capitalize" [for]="'check-' + color">{{color}}</label>
              </div>
            }
          </div>

          <!-- Outline Checkboxes -->
          <div class="col-md-3">
            <h6 class="small fw-bold mb-3 text-uppercase">Outline Checkboxes</h6>
            @for (color of colors; track color) {
              <div class="form-check mb-2">
                <input class="form-check-input check-outline-{{color}}" type="checkbox" [id]="'check-out-' + color" checked>
                <label class="form-check-label text-capitalize" [for]="'check-out-' + color">{{color}}</label>
              </div>
            }
          </div>

          <!-- Toggle Switches Style-1 -->
          <div class="col-md-3">
            <h6 class="small fw-bold mb-3 text-uppercase">Switches Style-1 (Label)</h6>
            @for (color of colors; track color) {
              <div class="form-check form-switch mb-2">
                <input class="form-check-input switch-style-1 switch-{{color}}" type="checkbox" [id]="'sw1-' + color" checked>
                <label class="form-check-label text-capitalize ms-2" [for]="'sw1-' + color">{{color}}</label>
              </div>
            }
          </div>

          <!-- Toggle Switches Style-2 -->
          <div class="col-md-3">
            <h6 class="small fw-bold mb-3 text-uppercase">Switches Style-2 (Pastel)</h6>
            @for (color of colors; track color) {
              <div class="form-check form-switch mb-2">
                <input class="form-check-input switch-pastel-{{color}} switch-{{color}}" type="checkbox" [id]="'sw2-' + color" checked>
                <label class="form-check-label text-capitalize" [for]="'sw2-' + color">{{color}}</label>
              </div>
            }
          </div>
        </div>

        <hr class="my-4 op-02">

        <div class="row g-4">
          <!-- Switch Sizes -->
          <div class="col-md-6">
            <h6 class="small fw-bold mb-3 text-uppercase">Toggle Switch Sizes</h6>
            <div class="d-flex align-items-center gap-4 flex-wrap">
              <div class="form-check form-switch">
                <input class="form-check-input toggle-sm switch-success" type="checkbox" id="size-sm" checked>
                <label class="form-check-label ms-2" for="size-sm">Small</label>
              </div>
              <div class="form-check form-switch">
                <input class="form-check-input toggle-md switch-secondary" type="checkbox" id="size-md" checked>
                <label class="form-check-label ms-2" for="size-md">Default</label>
              </div>
              <div class="form-check form-switch">
                <input class="form-check-input toggle-lg switch-info" type="checkbox" id="size-lg" checked>
                <label class="form-check-label ms-2" for="size-lg">Large</label>
              </div>
            </div>
          </div>
          
          <!-- Radio Colors -->
          <div class="col-md-6">
            <h6 class="small fw-bold mb-3 text-uppercase">Colored Radios</h6>
            <div class="d-flex gap-3 flex-wrap">
              @for (color of colors; track color) {
                <div class="form-check">
                  <input class="form-check-input check-{{color}}" type="radio" name="radioColors" [id]="'radio-' + color" [checked]="color === 'primary'">
                  <label class="form-check-label text-capitalize" [for]="'radio-' + color">{{color}}</label>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Validation (Reactive Forms) -->
    <div class="card mb-4 border-primary">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h6 class="mb-0">{{ 'FORMS.VALIDATION' | translate }} (Reactive)</h6>
        <span class="badge bg-light text-primary">Advanced</span>
      </div>
      <div class="card-body">
        <ngb-alert type="success" *ngIf="submitted" (closed)="submitted = false">
          {{ 'FORMS.SUCCESS_MESSAGE' | translate }}
        </ngb-alert>

        <form [formGroup]="validationForm" (ngSubmit)="onSubmit()">
          <div class="row g-3">
            <!-- First Name -->
            <div class="col-md-6">
              <label class="form-label">{{ 'FORMS.FIRST_NAME' | translate }} *</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-person"></i></span>
                <input type="text" class="form-control" formControlName="firstName"
                  [class.is-invalid]="f['firstName'].invalid && f['firstName'].touched"
                  [class.is-valid]="f['firstName'].valid && f['firstName'].touched">
              </div>
              <div class="invalid-feedback d-block" *ngIf="f['firstName'].invalid && f['firstName'].touched">
                <span *ngIf="f['firstName'].errors?.['required']">{{ 'FORMS.REQUIRED' | translate }}</span>
              </div>
            </div>

            <!-- Email -->
            <div class="col-md-6">
              <label class="form-label">{{ 'FORMS.EMAIL' | translate }} *</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                <input type="email" class="form-control" formControlName="email"
                  [class.is-invalid]="f['email'].invalid && f['email'].touched"
                  [class.is-valid]="f['email'].valid && f['email'].touched">
              </div>
              <div class="invalid-feedback d-block" *ngIf="f['email'].invalid && f['email'].touched">
                <span *ngIf="f['email'].errors?.['required']">{{ 'FORMS.REQUIRED' | translate }}</span>
                <span *ngIf="f['email'].errors?.['email']">{{ 'FORMS.INVALID_EMAIL' | translate }}</span>
              </div>
            </div>

            <!-- Password -->
            <div class="col-md-6">
              <label class="form-label">{{ 'FORMS.PASSWORD' | translate }} *</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-lock"></i></span>
                <input [type]="showPassword ? 'text' : 'password'" class="form-control" formControlName="password"
                  [class.is-invalid]="f['password'].invalid && f['password'].touched">
                <button class="btn btn-outline-secondary" type="button" (click)="showPassword = !showPassword">
                  <i class="bi" [ngClass]="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
                </button>
              </div>
              <div class="invalid-feedback d-block" *ngIf="f['password'].invalid && f['password'].touched">
                <span *ngIf="f['password'].errors?.['required']">{{ 'FORMS.REQUIRED' | translate }}</span>
                <span *ngIf="f['password'].errors?.['minlength']">
                  {{ 'FORMS.MIN_LENGTH' | translate: { min: f['password'].errors?.['minlength'].requiredLength } }}
                </span>
                <span *ngIf="f['password'].errors?.['pattern']">Needs at least one special character</span>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="col-md-6">
              <label class="form-label">{{ 'FORMS.CONFIRM_PASSWORD' | translate }} *</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-shield-check"></i></span>
                <input [type]="showPassword ? 'text' : 'password'" class="form-control" formControlName="confirmPassword"
                  [class.is-invalid]="f['confirmPassword'].invalid && f['confirmPassword'].touched"
                  [class.is-valid]="f['confirmPassword'].valid && f['confirmPassword'].touched">
              </div>
              <div class="invalid-feedback d-block" *ngIf="f['confirmPassword'].invalid && f['confirmPassword'].touched">
                <span *ngIf="f['confirmPassword'].errors?.['required']">{{ 'FORMS.REQUIRED' | translate }}</span>
                <span *ngIf="f['confirmPassword'].errors?.['mustMatch']">{{ 'FORMS.PASSWORDS_DONT_MATCH' | translate }}</span>
              </div>
            </div>

            <!-- Role Select -->
            <div class="col-md-6">
              <label class="form-label">{{ 'FORMS.SELECT' | translate }} *</label>
              <select class="form-select" formControlName="role"
                [class.is-invalid]="f['role'].invalid && f['role'].touched">
                <option value="">{{ 'FORMS.SELECT_OPTION' | translate }}</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <div class="invalid-feedback" *ngIf="f['role'].invalid && f['role'].touched">{{ 'FORMS.REQUIRED' | translate }}</div>
            </div>

            <div class="col-12">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" formControlName="agree" id="agreeCheck"
                  [class.is-invalid]="f['agree'].invalid && f['agree'].touched">
                <label class="form-check-label" for="agreeCheck">I agree up the terms and conditions</label>
              </div>
            </div>

            <div class="col-12">
              <button class="btn btn-gradient-primary me-2" type="submit" [disabled]="validationForm.invalid && validationForm.touched">
                {{ 'FORMS.SUBMIT' | translate }}
              </button>
              <button class="btn btn-outline-secondary" type="button" (click)="onReset()">{{ 'FORMS.RESET' | translate }}</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Input Groups -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">Input Groups & Helpers</h6></div>
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <div class="input-group mb-3">
              <span class="input-group-text">&#64;</span>
              <input type="text" class="form-control" placeholder="Username">
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
  submitted = false;
  templateData = { firstName: '', email: '' };
  selectedFrameworks: any[] = ['angular', 'react'];
  selectedCountries: any[] = ['tr', 'us'];
  colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'dark'];

  multiSelectOptions: SelectOption[] = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' }
  ];

  countryOptions: SelectOption[] = [
    { label: 'Turkey', value: 'tr', image: 'https://flagcdn.com/w40/tr.png' },
    { label: 'United States', value: 'us', image: 'https://flagcdn.com/w40/us.png' },
    { label: 'Germany', value: 'de', image: 'https://flagcdn.com/w40/de.png' },
    { label: 'France', value: 'fr', image: 'https://flagcdn.com/w40/fr.png' },
    { label: 'United Kingdom', value: 'gb', image: 'https://flagcdn.com/w40/gb.png' },
    { label: 'Italy', value: 'it', image: 'https://flagcdn.com/w40/it.png' },
    { label: 'Spain', value: 'es', image: 'https://flagcdn.com/w40/es.png' },
    { label: 'Japan', value: 'jp', image: 'https://flagcdn.com/w40/jp.png' }
  ];

  validationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.validationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/)
      ]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      agree: [false, Validators.requiredTrue]
    }, {
      validators: this.mustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.validationForm.controls; }

  mustMatch(controlName: string, matchingControlName: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      if (!control || !matchingControl) return null;

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }

  onSubmit(): void {
    this.submitted = false;
    if (this.validationForm.invalid) {
      this.validationForm.markAllAsTouched();
      return;
    }
    this.submitted = true;
    console.log('Form Submitted', this.validationForm.value);
  }

  onReset(): void {
    this.submitted = false;
    this.validationForm.reset();
  }
}
