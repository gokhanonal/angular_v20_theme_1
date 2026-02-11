import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
  initials: string;
  lastLogin: string;
  joinedDate: string;
  location: string;
  phone: string;
}

interface Column {
  key: keyof User | 'actions';
  label: string;
  visible: boolean;
  sortable: boolean;
  filterable: boolean;
  sticky?: 'left' | 'right';
  width?: number;
}

interface SortState {
  key: keyof User;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, NgbDropdownModule, NgbTooltipModule, CdkDropList, CdkDrag],
  template: `
    <div class="page-header d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="mb-1">{{ 'TABLES.TITLE' | translate }}</h2>
        <p class="text-secondary small mb-0">Advanced data table with multi-sorting, filtering, and sticky columns.</p>
      </div>
      <div class="d-flex gap-2">
        <!-- Column Selection -->
        <div class="dropdown" ngbDropdown>
          <button class="btn btn-outline-secondary btn-sm dropdown-toggle" ngbDropdownToggle>
            <i class="bi bi-columns-gap me-1"></i> Columns
          </button>
          <div class="dropdown-menu dropdown-menu-end p-3" ngbDropdownMenu style="min-width: 200px;">
            <h6 class="dropdown-header px-0 mb-2">Display Columns</h6>
            @for (col of columns(); track col.key) {
              @if (col.key !== 'actions') {
                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" [id]="'col-' + col.key" 
                         [checked]="col.visible" (change)="toggleColumn(col)">
                  <label class="form-check-label" [for]="'col-' + col.key">{{ col.label }}</label>
                </div>
              }
            }
          </div>
        </div>
        <button class="btn btn-sm btn-gradient-primary" (click)="resetFilters()">
          <i class="bi bi-arrow-counterclockwise me-1"></i> Reset
        </button>
      </div>
    </div>

    <!-- Advanced Table Card -->
    <div class="card shadow-sm border-0 overflow-hidden">
      <div class="card-header bg-white py-3">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-3">
            <div class="items-per-page d-flex align-items-center gap-2">
              <span class="small text-secondary">Show</span>
              <select class="form-select form-select-sm" style="width: 70px;" [(ngModel)]="pageSize" (change)="currentPage.set(1)">
                <option [value]="5">5</option>
                <option [value]="10">10</option>
                <option [value]="25">25</option>
              </select>
            </div>
            <div class="search-wrapper">
              <i class="bi bi-search search-icon"></i>
              <input type="text" class="form-control form-control-sm ps-5" style="width: 250px;"
                placeholder="Global search..." [ngModel]="globalSearch()" (ngModelChange)="globalSearch.set($event); currentPage.set(1)">
            </div>
          </div>
          <div class="sort-info small text-muted">
            @if (sortStates().length > 1) {
              <span class="animate-fade-in"><i class="bi bi-info-circle me-1"></i> Multi-sort active ({{ sortStates().length }} columns)</span>
            } @else {
              <span><i class="bi bi-keyboard me-1"></i> Hold <kbd class="small">Shift</kbd> for multi-column sort</span>
            }
          </div>
        </div>
      </div>

      <div class="card-body p-0">
        <div class="table-container shadow-inner">
          <table class="table table-hover align-middle mb-0" [style.table-layout]="resizingColumn ? 'fixed' : 'auto'">
            <thead class="table-light">
              <!-- Header Row -->
              <tr cdkDropList cdkDropListOrientation="horizontal" (cdkDropListDropped)="drop($event)">
                @for (col of visibleColumns(); track col.key) {
                  <th [class.sticky-left]="col.sticky === 'left'" 
                      [class.sticky-right]="col.sticky === 'right'"
                      [style.cursor]="col.sortable ? 'pointer' : 'default'"
                      [style.width.px]="col.width"
                      (click)="onSort(col, $event)"
                      cdkDrag 
                      [cdkDragDisabled]="!!col.sticky">
                    <div class="d-flex align-items-center justify-content-between gap-2 h-100">
                      <span class="text-nowrap">{{ col.label }}</span>
                      @if (col.sortable) {
                        <div class="sort-icons d-flex flex-column line-height-1">
                          <i class="bi bi-caret-up-fill" [class.active]="getSortDirection(col.key) === 'asc'"></i>
                          <i class="bi bi-caret-down-fill" [class.active]="getSortDirection(col.key) === 'desc'"></i>
                        </div>
                      }
                    </div>
                    <div class="resize-handle" (mousedown)="onResizeStart($event, col)"></div>
                  </th>
                }
              </tr>
              <!-- Filter Row -->
              <tr class="filter-row">
                @for (col of visibleColumns(); track col.key) {
                  <td [class.sticky-left]="col.sticky === 'left'" 
                      [class.sticky-right]="col.sticky === 'right'"
                      [style.width.px]="col.width">
                    @if (col.filterable && col.key !== 'actions') {
                      <div class="filter-input-wrapper">
                        <input type="text" class="form-control form-control-sm filter-input" 
                               [placeholder]="'Filter ' + col.label"
                               [ngModel]="columnFilters()[col.key]"
                               (ngModelChange)="updateColumnFilter(col.key, $event)">
                        <i class="bi bi-filter filter-icon" *ngIf="!columnFilters()[col.key]"></i>
                      </div>
                    }
                  </td>
                }
              </tr>
            </thead>
            <tbody>
              @for (user of paginatedData(); track user.id) {
                <tr class="animate-fade-in">
                  @for (col of visibleColumns(); track col.key) {
                    <td [class.sticky-left]="col.sticky === 'left'" 
                        [class.sticky-right]="col.sticky === 'right'"
                        [style.width.px]="col.width">
                      
                      @switch (col.key) {
                        @case ('name') {
                          <div class="d-flex align-items-center gap-3">
                            <div class="avatar avatar-md shadow-sm" [style.background]="user.avatar">
                              {{ user.initials }}
                            </div>
                            <div>
                                <div class="fw-bold text-dark">{{ user.name }}</div>
                                <div class="text-muted small">{{ user.location }}</div>
                            </div>
                          </div>
                        }
                        @case ('status') {
                          <span class="badge rounded-pill" 
                                [class.bg-soft-success]="user.status === 'Active'"
                                [class.bg-soft-danger]="user.status === 'Inactive'"
                                [class.bg-soft-warning]="user.status === 'Pending'">
                            {{ user.status }}
                          </span>
                        }
                        @case ('role') {
                          <span class="text-uppercase small fw-bold text-primary">{{ user.role }}</span>
                        }
                        @case ('actions') {
                          <div class="d-flex gap-1">
                            <button class="btn btn-icon-sm" ngbTooltip="View"><i class="bi bi-eye"></i></button>
                            <button class="btn btn-icon-sm" ngbTooltip="Edit"><i class="bi bi-pencil"></i></button>
                            <button class="btn btn-icon-sm text-danger" ngbTooltip="Delete"><i class="bi bi-trash"></i></button>
                          </div>
                        }
                        @default {
                          <span class="text-secondary">{{ user[col.key] }}</span>
                        }
                      }
                    </td>
                  }
                </tr>
              } @empty {
                <tr>
                  <td [attr.colspan]="visibleColumns().length" class="text-center py-5">
                    <div class="no-results">
                      <i class="bi bi-search text-muted display-4 mb-3 d-block"></i>
                      <h5 class="text-dark">No data found</h5>
                      <p class="text-secondary">Try adjusting your filters or search term.</p>
                      <button class="btn btn-primary btn-sm mt-2" (click)="resetFilters()">Clear all filters</button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Footer / Pagination -->
      <div class="card-footer bg-white py-3 d-flex justify-content-between align-items-center border-top">
        <div class="text-secondary small">
          Showing <strong>{{ (currentPage() - 1) * pageSize + 1 }}</strong> to 
          <strong>{{ Math.min(currentPage() * pageSize, filteredResults().length) }}</strong> of 
          <strong>{{ filteredResults().length }}</strong> entries
        </div>
        
        <nav>
          <ul class="pagination pagination-md mb-0 gap-1">
            <li class="page-item" [class.disabled]="currentPage() === 1">
              <button class="page-link rounded-circle" (click)="currentPage.set(currentPage() - 1)">
                <i class="bi bi-chevron-left"></i>
              </button>
            </li>
            
            @for (page of totalPages(); track page) {
              @if (isPageVisible(page)) {
                <li class="page-item" [class.active]="page === currentPage()">
                  <button class="page-link rounded-circle" (click)="currentPage.set(page)">{{ page }}</button>
                </li>
              } @else if (shouldShowEllipsis(page)) {
                <li class="page-item disabled"><span class="page-link border-0">...</span></li>
              }
            }

            <li class="page-item" [class.disabled]="currentPage() === totalPages().length">
              <button class="page-link rounded-circle" (click)="currentPage.set(currentPage() + 1)">
                <i class="bi bi-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
  styles: [`
    .table-container {
      width: 100%;
      overflow-x: auto;
      max-height: 70vh;
    }

    .table {
      min-width: 1200px;
      border-collapse: separate;
      border-spacing: 0;
    }

    th {
      background: var(--bg-header) !important;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-secondary);
      padding: 1rem 1.25rem;
      border-bottom: 2px solid var(--border-color) !important;
      position: sticky;
      top: 0;
      z-index: 10;
      overflow: hidden;
      
      &:hover .resize-handle { opacity: 1; }
    }

    .resize-handle {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      cursor: col-resize;
      background: rgba(102, 126, 234, 0.2);
      opacity: 0;
      transition: all 0.2s;
      z-index: 5;
      
      &:hover, &.resizing {
        opacity: 1;
        background: var(--color-primary);
        width: 6px;
      }
    }

    td { 
      padding: 1rem 1.25rem;
      border-bottom: 1px solid var(--border-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    // === Sticky Columns ===
    .sticky-left {
      position: sticky;
      left: 0;
      background: inherit;
      z-index: 5;
      box-shadow: 4px 0 8px rgba(0,0,0,0.05);
      &:after {
        content: '';
        position: absolute;
        top: 0; bottom: 0; right: 0;
        width: 1px;
        background: var(--border-color);
      }
    }

    .sticky-right {
      position: sticky;
      right: 0;
      background: inherit;
      z-index: 5;
      box-shadow: -4px 0 8px rgba(0,0,0,0.05);
      &:before {
        content: '';
        position: absolute;
        top: 0; bottom: 0; left: 0;
        width: 1px;
        background: var(--border-color);
      }
    }

    thead th.sticky-left, thead th.sticky-right { z-index: 15; }

    // === Filter Styles ===
    .filter-row td {
      background: #f8f9fa;
      padding: 0.5rem 1.25rem;
    }

    .filter-input-wrapper {
      position: relative;
      .filter-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.75rem;
        color: #adb5bd;
        pointer-events: none;
      }
    }

    .filter-input {
      font-size: 0.75rem;
      padding-right: 25px;
      border-color: #dee2e6;
      &:focus { border-color: #667eea; box-shadow: none; }
    }

    // === UI Elements ===
    .sort-icons {
      i { 
        font-size: 0.6rem; 
        color: #ced4da;
        &.active { color: #667eea; }
      }
    }

    .avatar-md {
      width: 40px;
      height: 40px;
      font-size: 0.9rem;
      font-weight: 700;
      color: #fff;
    }

    .bg-soft-success { background: #d1fae5; color: #065f46; }
    .bg-soft-danger { background: #fee2e2; color: #991b1b; }
    .bg-soft-warning { background: #fef3c7; color: #92400e; }

    .btn-icon-sm {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      border-radius: 0.5rem;
      color: var(--text-secondary);
      transition: all 0.2s;
      &:hover { background: rgba(102, 126, 234, 0.1); color: #667eea; }
    }

    .search-wrapper {
      position: relative;
      .search-icon {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #adb5bd;
      }
    }

    .line-height-1 { line-height: 1; }

    .pagination .page-link {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0 2px;
        font-weight: 600;
        font-size: 0.85rem;
        border: 1px solid transparent;
        color: var(--text-primary);
        background: transparent;

        &:hover:not(.active) {
            background: rgba(102, 126, 234, 0.05);
            border-color: var(--border-color);
        }
    }

    .pagination .page-item.active .page-link {
        background: var(--gradient-primary);
        border: none;
        box-shadow: 0 4px 10px rgba(102, 126, 234, 0.25);
    }

    // === Drag & Drop Styles ===
    .cdk-drag-preview {
      background: var(--bg-header);
      padding: 10px 20px;
      border-radius: 4px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.15);
      border: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: var(--text-primary);
      z-index: 2000;
    }

    .cdk-drag-placeholder {
      opacity: 0.3;
      background: rgba(102, 126, 234, 0.1) !important;
    }

    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .cdk-drop-list-dragging th:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    [data-theme="dark"] {
      .filter-row td { background: #1a1a1a; }
      .bg-soft-success { background: rgba(52, 211, 153, 0.1); color: #34d399; }
      .bg-soft-danger { background: rgba(248, 113, 113, 0.1); color: #f87171; }
      .bg-soft-warning { background: rgba(251, 191, 36, 0.1); color: #fbbf24; }
    }
  `]
})
export class TablesComponent {
  Math = Math;
  pageSize = 10;
  currentPage = signal(1);
  globalSearch = signal('');
  columnFilters = signal<Record<string, string>>({});
  sortStates = signal<SortState[]>([]);

  resizingColumn: Column | null = null;
  startResizeX = 0;
  startResizeWidth = 0;

  columns = signal<Column[]>([
    { key: 'name', label: 'User', visible: true, sortable: true, filterable: true, sticky: 'left', width: 250 },
    { key: 'email', label: 'Email', visible: true, sortable: true, filterable: true, width: 220 },
    { key: 'role', label: 'Role', visible: true, sortable: true, filterable: true, width: 140 },
    { key: 'status', label: 'Status', visible: true, sortable: true, filterable: true, width: 120 },
    { key: 'location', label: 'Location', visible: true, sortable: true, filterable: true, width: 180 },
    { key: 'phone', label: 'Phone', visible: false, sortable: false, filterable: true, width: 150 },
    { key: 'joinedDate', label: 'Joined', visible: true, sortable: true, filterable: false, width: 130 },
    { key: 'actions', label: 'Actions', visible: true, sortable: false, filterable: false, sticky: 'right', width: 120 }
  ]);

  onResizeStart(event: MouseEvent, col: Column): void {
    event.stopPropagation();
    event.preventDefault();
    this.resizingColumn = col;
    this.startResizeX = event.pageX;
    this.startResizeWidth = col.width || 150;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (this.resizingColumn) {
        const delta = moveEvent.pageX - this.startResizeX;
        const newWidth = Math.max(80, this.startResizeWidth + delta);

        this.columns.update(cols => {
          return cols.map(c => c.key === this.resizingColumn?.key ? { ...c, width: newWidth } : c);
        });
      }
    };

    const onMouseUp = () => {
      this.resizingColumn = null;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  allUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: 'var(--gradient-primary)', initials: 'JD', location: 'New York, USA', phone: '+1 234 567 890', joinedDate: '2023-01-15', lastLogin: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', avatar: 'var(--gradient-success)', initials: 'JS', location: 'London, UK', phone: '+44 20 1234 5678', joinedDate: '2023-02-10', lastLogin: '5 mins ago' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Inactive', avatar: 'var(--gradient-danger)', initials: 'MJ', location: 'Berlin, Germany', phone: '+49 30 9876 5432', joinedDate: '2023-03-05', lastLogin: '2 days ago' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Admin', status: 'Active', avatar: 'var(--gradient-warning)', initials: 'SW', location: 'Paris, France', phone: '+33 1 23 45 67 89', joinedDate: '2023-04-20', lastLogin: 'Just now' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'User', status: 'Pending', avatar: 'var(--gradient-info)', initials: 'TB', location: 'Sydney, Australia', phone: '+61 2 9876 5432', joinedDate: '2023-05-12', lastLogin: '1 week ago' },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', role: 'Editor', status: 'Active', avatar: 'var(--gradient-primary)', initials: 'ED', location: 'Toronto, Canada', phone: '+1 416 555 0123', joinedDate: '2023-06-01', lastLogin: '1 hour ago' },
    { id: 7, name: 'Chris Lee', email: 'chris@example.com', role: 'User', status: 'Active', avatar: 'var(--gradient-success)', initials: 'CL', location: 'Seoul, Korea', phone: '+82 2 123 4567', joinedDate: '2023-07-15', lastLogin: '10 mins ago' },
    { id: 8, name: 'Anna White', email: 'anna@example.com', role: 'Admin', status: 'Inactive', avatar: 'var(--gradient-danger)', initials: 'AW', location: 'Tokyo, Japan', phone: '+81 3 1234 5678', joinedDate: '2023-08-22', lastLogin: '3 days ago' },
    { id: 9, name: 'David Kim', email: 'david@example.com', role: 'User', status: 'Active', avatar: 'var(--gradient-warning)', initials: 'DK', location: 'Los Angeles, USA', phone: '+1 310 555 0199', joinedDate: '2023-09-10', lastLogin: '4 hours ago' },
    { id: 10, name: 'Lisa Chen', email: 'lisa@example.com', role: 'Editor', status: 'Pending', avatar: 'var(--gradient-info)', initials: 'LC', location: 'Shanghai, China', phone: '+86 21 1234 5678', joinedDate: '2023-10-05', lastLogin: '1 day ago' },
    { id: 11, name: 'Robert Taylor', email: 'robert@example.com', role: 'User', status: 'Active', avatar: 'var(--gradient-primary)', initials: 'RT', location: 'Rome, Italy', phone: '+39 06 1234 5678', joinedDate: '2023-11-12', lastLogin: '2 hours ago' },
    { id: 12, name: 'Maria Garcia', email: 'maria@example.com', role: 'Admin', status: 'Active', avatar: 'var(--gradient-success)', initials: 'MG', location: 'Madrid, Spain', phone: '+34 91 123 45 67', joinedDate: '2023-12-01', lastLogin: '12 hours ago' },
  ];

  visibleColumns = computed(() => this.columns().filter(c => c.visible));

  filteredResults = computed(() => {
    let results = [...this.allUsers];
    const searchTerm = this.globalSearch().toLowerCase();
    const filters = this.columnFilters();

    // Global Search
    if (searchTerm) {
      results = results.filter(u =>
        u.name.toLowerCase().includes(searchTerm) ||
        u.email.toLowerCase().includes(searchTerm) ||
        u.role.toLowerCase().includes(searchTerm) ||
        u.location.toLowerCase().includes(searchTerm)
      );
    }

    // Column Filters
    Object.entries(filters).forEach(([key, value]) => {
      const filterValue = value?.toLowerCase();
      if (filterValue) {
        results = results.filter(u => (u as any)[key]?.toString().toLowerCase().includes(filterValue));
      }
    });

    // Sorting
    const sorts = this.sortStates();
    if (sorts.length > 0) {
      results.sort((a, b) => {
        for (const sort of sorts) {
          const valA = (a as any)[sort.key];
          const valB = (b as any)[sort.key];

          if (valA === valB) continue;

          const multiplier = sort.direction === 'asc' ? 1 : -1;
          return valA > valB ? multiplier : -multiplier;
        }
        return 0;
      });
    }

    return results;
  });

  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredResults().slice(start, start + this.pageSize);
  });

  totalPages = computed(() => {
    const count = Math.ceil(this.filteredResults().length / this.pageSize);
    return Array.from({ length: count }, (_, i) => i + 1);
  });

  onSort(column: Column, event: MouseEvent): void {
    if (!column.sortable || column.key === 'actions') return;

    const key = column.key as keyof User;
    const currentSorts = [...this.sortStates()];
    const existingIdx = currentSorts.findIndex(s => s.key === key);

    if (event.shiftKey) {
      // Multi-sort logic
      if (existingIdx > -1) {
        const current = currentSorts[existingIdx];
        if (current.direction === 'asc') {
          currentSorts[existingIdx] = { key, direction: 'desc' };
        } else {
          currentSorts.splice(existingIdx, 1);
        }
      } else {
        currentSorts.push({ key, direction: 'asc' });
      }
    } else {
      // Single-sort logic
      if (existingIdx > -1 && currentSorts.length === 1) {
        const current = currentSorts[existingIdx];
        if (current.direction === 'asc') {
          currentSorts[0] = { key, direction: 'desc' };
        } else {
          currentSorts.length = 0;
        }
      } else {
        currentSorts.length = 0;
        currentSorts.push({ key, direction: 'asc' });
      }
    }

    this.sortStates.set(currentSorts);
    this.currentPage.set(1);
  }

  getSortDirection(key: string): 'asc' | 'desc' | null {
    const sort = this.sortStates().find(s => s.key === key);
    return sort ? sort.direction : null;
  }

  drop(event: CdkDragDrop<string[]>): void {
    const visibleCols = this.visibleColumns();
    const prevIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    if (prevIndex === currentIndex) return;

    // We need to map visible indices back to the main 'columns' array
    const colToMove = visibleCols[prevIndex];
    const targetCol = visibleCols[currentIndex];

    this.columns.update(cols => {
      const newCols = [...cols];
      const mainPrevIndex = newCols.indexOf(colToMove);
      const mainCurrentIndex = newCols.indexOf(targetCol);
      moveItemInArray(newCols, mainPrevIndex, mainCurrentIndex);
      return newCols;
    });
  }

  toggleColumn(col: Column): void {
    this.columns.update(cols => {
      return cols.map(c => c.key === col.key ? { ...c, visible: !c.visible } : c);
    });
  }

  updateColumnFilter(key: string, value: string): void {
    this.columnFilters.update(filters => ({ ...filters, [key]: value }));
    this.currentPage.set(1);
  }

  resetFilters(): void {
    this.globalSearch.set('');
    this.columnFilters.set({});
    this.sortStates.set([]);
    this.currentPage.set(1);
  }

  // Pagination Helpers
  isPageVisible(page: number): boolean {
    const current = this.currentPage();
    return page === 1 || page === this.totalPages().length || (page >= current - 1 && page <= current + 1);
  }

  shouldShowEllipsis(page: number): boolean {
    const total = this.totalPages().length;
    const current = this.currentPage();
    return (page === 2 && current > 3) || (page === total - 1 && current < total - 2);
  }
}
