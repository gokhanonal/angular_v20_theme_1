import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

interface User {
    name: string; email: string; role: string; status: string; avatar: string; initials: string;
}

@Component({
    selector: 'app-tables',
    standalone: true,
    imports: [CommonModule, FormsModule, TranslateModule],
    template: `
    <div class="page-header">
      <h2>{{ 'TABLES.TITLE' | translate }}</h2>
    </div>

    <!-- Basic Table -->
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0">Basic Table with Search & Pagination</h6>
        <div class="d-flex gap-2">
          <input type="text" class="form-control form-control-sm" style="width: 200px;"
            placeholder="Search..." [(ngModel)]="searchTerm" (ngModelChange)="filterData()">
          <button class="btn btn-sm btn-gradient-primary"><i class="bi bi-download me-1"></i>Export</button>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>{{ 'TABLES.NAME' | translate }}</th>
                <th>{{ 'TABLES.EMAIL' | translate }}</th>
                <th>{{ 'TABLES.ROLE' | translate }}</th>
                <th>{{ 'TABLES.STATUS' | translate }}</th>
                <th>{{ 'TABLES.ACTIONS' | translate }}</th>
              </tr>
            </thead>
            <tbody>
              @for (user of paginatedData(); track user.email; let i = $index) {
                <tr>
                  <td>{{ (currentPage() - 1) * pageSize + i + 1 }}</td>
                  <td>
                    <div class="d-flex align-items-center gap-2">
                      <div class="avatar avatar-sm" [style.background]="user.avatar">{{ user.initials }}</div>
                      <span class="fw-medium">{{ user.name }}</span>
                    </div>
                  </td>
                  <td>{{ user.email }}</td>
                  <td><span class="badge bg-primary bg-opacity-10 text-primary">{{ user.role }}</span></td>
                  <td>
                    <span class="d-flex align-items-center gap-1">
                      <span class="status-dot" [ngClass]="user.status === 'Active' ? 'active' : user.status === 'Inactive' ? 'inactive' : 'pending'"></span>
                      {{ user.status }}
                    </span>
                  </td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <button class="btn btn-outline-primary"><i class="bi bi-eye"></i></button>
                      <button class="btn btn-outline-success"><i class="bi bi-pencil"></i></button>
                      <button class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-between align-items-center">
        <small class="text-secondary">
          {{ 'TABLES.SHOWING' | translate }} {{ (currentPage() - 1) * pageSize + 1 }} - {{ Math.min(currentPage() * pageSize, filteredData().length) }}
          {{ 'TABLES.OF' | translate }} {{ filteredData().length }} {{ 'TABLES.ENTRIES' | translate }}
        </small>
        <nav>
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item" [class.disabled]="currentPage() === 1">
              <a class="page-link" (click)="currentPage.set(currentPage() - 1)">Previous</a>
            </li>
            @for (page of totalPages(); track page) {
              <li class="page-item" [class.active]="page === currentPage()">
                <a class="page-link" (click)="currentPage.set(page)">{{ page }}</a>
              </li>
            }
            <li class="page-item" [class.disabled]="currentPage() === totalPages().length">
              <a class="page-link" (click)="currentPage.set(currentPage() + 1)">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Striped & Bordered Table -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">Striped & Bordered Table</h6></div>
      <div class="card-body p-0">
        <table class="table table-striped table-bordered mb-0">
          <thead class="table-dark">
            <tr><th>#</th><th>Product</th><th>Category</th><th>Price</th><th>Stock</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>MacBook Pro 16"</td><td>Laptop</td><td>$2,499</td><td><span class="badge bg-success">In Stock</span></td></tr>
            <tr><td>2</td><td>iPhone 16 Pro</td><td>Phone</td><td>$1,199</td><td><span class="badge bg-warning text-dark">Low</span></td></tr>
            <tr><td>3</td><td>iPad Air M2</td><td>Tablet</td><td>$599</td><td><span class="badge bg-success">In Stock</span></td></tr>
            <tr><td>4</td><td>AirPods Pro 3</td><td>Audio</td><td>$249</td><td><span class="badge bg-danger">Out of Stock</span></td></tr>
            <tr><td>5</td><td>Apple Watch Ultra</td><td>Watch</td><td>$799</td><td><span class="badge bg-success">In Stock</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class TablesComponent {
    Math = Math;
    searchTerm = '';
    pageSize = 5;
    currentPage = signal(1);

    allUsers: User[] = [
        { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: 'var(--gradient-primary)', initials: 'JD' },
        { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', avatar: 'var(--gradient-success)', initials: 'JS' },
        { name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Inactive', avatar: 'var(--gradient-danger)', initials: 'MJ' },
        { name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Admin', status: 'Active', avatar: 'var(--gradient-warning)', initials: 'SW' },
        { name: 'Tom Brown', email: 'tom@example.com', role: 'User', status: 'Pending', avatar: 'var(--gradient-info)', initials: 'TB' },
        { name: 'Emily Davis', email: 'emily@example.com', role: 'Editor', status: 'Active', avatar: 'var(--gradient-primary)', initials: 'ED' },
        { name: 'Chris Lee', email: 'chris@example.com', role: 'User', status: 'Active', avatar: 'var(--gradient-success)', initials: 'CL' },
        { name: 'Anna White', email: 'anna@example.com', role: 'Admin', status: 'Inactive', avatar: 'var(--gradient-danger)', initials: 'AW' },
        { name: 'David Kim', email: 'david@example.com', role: 'User', status: 'Active', avatar: 'var(--gradient-warning)', initials: 'DK' },
        { name: 'Lisa Chen', email: 'lisa@example.com', role: 'Editor', status: 'Pending', avatar: 'var(--gradient-info)', initials: 'LC' },
        { name: 'Robert Taylor', email: 'robert@example.com', role: 'User', status: 'Active', avatar: 'var(--gradient-primary)', initials: 'RT' },
        { name: 'Maria Garcia', email: 'maria@example.com', role: 'Admin', status: 'Active', avatar: 'var(--gradient-success)', initials: 'MG' },
    ];

    filteredData = signal<User[]>(this.allUsers);

    paginatedData = computed(() => {
        const start = (this.currentPage() - 1) * this.pageSize;
        return this.filteredData().slice(start, start + this.pageSize);
    });

    totalPages = computed(() => {
        const count = Math.ceil(this.filteredData().length / this.pageSize);
        return Array.from({ length: count }, (_, i) => i + 1);
    });

    filterData(): void {
        const term = this.searchTerm.toLowerCase();
        this.filteredData.set(
            this.allUsers.filter(u => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term) || u.role.toLowerCase().includes(term))
        );
        this.currentPage.set(1);
    }
}
