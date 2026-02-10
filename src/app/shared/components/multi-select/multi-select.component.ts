import { Component, Input, Output, EventEmitter, forwardRef, signal, computed, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

export interface SelectOption {
    label: string;
    value: any;
    [key: string]: any;
}

@Component({
    selector: 'app-multi-select',
    standalone: true,
    imports: [CommonModule, FormsModule, TranslateModule, NgbDropdownModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiSelectComponent),
            multi: true
        }
    ],
    template: `
    <div class="multi-select-container" #container>
      <div class="multi-select-input shadow-sm" [class.focused]="isFocused()" (click)="toggleDropdown()">
        <div class="chips-container">
          @for (option of selectedOptions(); track option.value) {
            <span class="chip animate-fade-in">
              <span class="chip-label">{{ option.label }}</span>
              <button type="button" class="chip-remove" (click)="removeOption(option, $event)">
                <i class="bi bi-x"></i>
              </button>
            </span>
          }
          @if (selectedOptions().length === 0 && !isFocused()) {
            <span class="placeholder">{{ placeholder | translate }}</span>
          }
          <input 
            #searchInput
            type="text" 
            class="search-input" 
            [placeholder]="selectedOptions().length > 0 ? '' : (placeholder | translate)"
            [(ngModel)]="searchQuery"
            (input)="onSearchInput($event)"
            (keydown)="onKeydown($event)"
            (focus)="setFocused(true)"
            (blur)="setFocused(false)"
          >
        </div>
        
        <div class="actions">
          @if (selectedOptions().length > 0) {
            <button type="button" class="btn-clear" (click)="clearAll($event)" title="Clear all">
              <i class="bi bi-x-circle-fill"></i>
            </button>
          }
          <i class="bi bi-chevron-down ms-2 arrow-icon" [style.transform]="isFocused() ? 'rotate(180deg)' : 'none'"></i>
        </div>
      </div>

      <!-- Custom Dropdown Menu -->
      <div class="dropdown-menu-custom shadow-lg" *ngIf="isFocused() || showDropdown()">
        <div class="dropdown-content">
          @for (option of filteredOptions(); track option.value; let i = $index) {
            <button type="button" 
                    class="dropdown-item-custom" 
                    [class.selected]="isSelected(option)"
                    [class.active]="i === activeIndex()"
                    (mousedown)="toggleOption(option, $event)"
                    (mouseenter)="activeIndex.set(i)">
              <div class="d-flex align-items-center justify-content-between w-100">
                <span>{{ option.label }}</span>
                <i class="bi bi-check2 text-primary" *ngIf="isSelected(option)"></i>
              </div>
            </button>
          } @empty {
            <div class="no-results p-3 text-center text-muted small">
              No results found for "{{ searchQuery() }}"
            </div>
          }
        </div>
      </div>
    </div>
  `,
    styles: [`
    :host { display: block; width: 100%; }
    
    .multi-select-container {
      position: relative;
      width: 100%;
    }

    .multi-select-input {
      display: flex;
      align-items: center;
      min-height: 45px;
      padding: 4px 12px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      cursor: text;
      transition: all 0.2s;
      gap: 8px;

      &:hover {
        border-color: #667eea;
      }

      &.focused {
        border-color: #667eea;
        box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.15);
      }
    }

    .chips-container {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      flex: 1;
      align-items: center;
    }

    .chip {
      background: var(--gradient-primary);
      color: #fff;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .chip-remove {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.8);
      padding: 0;
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 1rem;
      
      &:hover { color: #fff; }
    }

    .placeholder {
      color: var(--text-secondary);
      font-size: 0.875rem;
      pointer-events: none;
    }

    .search-input {
      border: none !important;
      outline: none !important;
      background: transparent !important;
      color: var(--text-primary);
      font-size: 0.875rem;
      flex: 1;
      min-width: 60px;
      padding: 4px 0;
    }

    .actions {
      display: flex;
      align-items: center;
      color: var(--text-secondary);
    }

    .btn-clear {
      background: none;
      border: none;
      padding: 0;
      color: #adb5bd;
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 1.1rem;
      transition: color 0.2s;
      
      &:hover { color: #ef4444; }
    }

    .arrow-icon {
      font-size: 0.75rem;
      transition: transform 0.2s;
    }

    // === Custom Dropdown ===
    .dropdown-menu-custom {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--bg-header);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      margin-top: 4px;
      z-index: 1000;
      max-height: 250px;
      overflow-y: auto;
      backdrop-filter: blur(10px);
    }

    .dropdown-item-custom {
      width: 100%;
      background: none;
      border: none;
      padding: 8px 16px;
      text-align: left;
      color: var(--text-primary);
      font-size: 0.875rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover, &.active {
        background: rgba(102, 126, 234, 0.08);
      }

      &.selected {
        background: rgba(102, 126, 234, 0.1);
        font-weight: 600;
      }
    }

    ::-webkit-scrollbar { width: 4px; }
  `]
})
export class MultiSelectComponent implements ControlValueAccessor {
    @Input() options: SelectOption[] = [];
    @Input() placeholder = 'Select options...';

    @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
    @ViewChild('container') container!: ElementRef;

    searchQuery = signal('');
    selectedValues = signal<any[]>([]);
    isFocused = signal(false);
    showDropdown = signal(false);
    activeIndex = signal(-1);

    selectedOptions = computed(() =>
        this.options.filter(o => this.selectedValues().includes(o.value))
    );

    filteredOptions = computed(() => {
        const query = this.searchQuery().toLowerCase();
        return this.options.filter(o => o.label.toLowerCase().includes(query));
    });

    private onChange: (value: any[]) => void = () => { };
    private onTouched: () => void = () => { };

    @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent) {
        if (!this.container.nativeElement.contains(event.target)) {
            this.isFocused.set(false);
            this.showDropdown.set(false);
        }
    }

    toggleDropdown() {
        this.searchInput.nativeElement.focus();
        this.showDropdown.set(!this.showDropdown());
        if (this.showDropdown()) {
            this.activeIndex.set(0);
        }
    }

    setFocused(focused: boolean) {
        if (focused) this.isFocused.set(true);
        // Blur delay to allow mousedown on items
    }

    onSearchInput(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.searchQuery.set(value);
        this.showDropdown.set(true);
        this.activeIndex.set(0);
    }

    onKeydown(event: KeyboardEvent) {
        const options = this.filteredOptions();

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                this.showDropdown.set(true);
                this.activeIndex.update(idx => (idx + 1) % options.length);
                break;

            case 'ArrowUp':
                event.preventDefault();
                this.showDropdown.set(true);
                this.activeIndex.update(idx => (idx - 1 + options.length) % options.length);
                break;

            case 'Enter':
            case ' ':
                if (this.showDropdown() && this.activeIndex() >= 0 && options.length > 0) {
                    event.preventDefault();
                    this.toggleOption(options[this.activeIndex()]);
                }
                break;

            case 'Escape':
                event.preventDefault();
                this.showDropdown.set(false);
                this.activeIndex.set(-1);
                this.searchInput.nativeElement.blur();
                break;

            case 'Backspace':
                if (this.searchQuery() === '' && this.selectedValues().length > 0) {
                    const currentValues = this.selectedValues();
                    this.selectedValues.set(currentValues.slice(0, -1));
                    this.publish();
                }
                break;
        }
    }

    toggleOption(option: SelectOption, event?: MouseEvent) {
        if (event) {
            event.preventDefault(); // Prevent blur
            event.stopPropagation();
        }

        const currentValues = this.selectedValues();
        if (currentValues.includes(option.value)) {
            this.selectedValues.set(currentValues.filter(v => v !== option.value));
        } else {
            this.selectedValues.set([...currentValues, option.value]);
        }

        this.searchQuery.set('');
        this.publish();
    }

    removeOption(option: SelectOption, event: MouseEvent) {
        event.stopPropagation();
        const currentValues = this.selectedValues();
        this.selectedValues.set(currentValues.filter(v => v !== option.value));
        this.publish();
    }

    clearAll(event: MouseEvent) {
        event.stopPropagation();
        this.selectedValues.set([]);
        this.searchQuery.set('');
        this.publish();
    }

    isSelected(option: SelectOption): boolean {
        return this.selectedValues().includes(option.value);
    }

    private publish() {
        this.onChange(this.selectedValues());
        this.onTouched();
    }

    // ControlValueAccessor methods
    writeValue(value: any[]): void {
        if (value && Array.isArray(value)) {
            this.selectedValues.set(value);
        } else {
            this.selectedValues.set([]);
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        // Implement if needed
    }
}
