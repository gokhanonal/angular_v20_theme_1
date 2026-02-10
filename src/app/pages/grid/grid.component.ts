import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-grid',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    template: `
    <div class="page-header">
      <h2>{{ 'GRID.TITLE' | translate }}</h2>
    </div>

    <!-- Equal Columns -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'GRID.COLUMNS' | translate }} — Equal Width</h6></div>
      <div class="card-body">
        <div class="row g-2 mb-3">
          <div class="col"><div class="demo-col">col</div></div>
          <div class="col"><div class="demo-col">col</div></div>
        </div>
        <div class="row g-2 mb-3">
          <div class="col"><div class="demo-col">col</div></div>
          <div class="col"><div class="demo-col">col</div></div>
          <div class="col"><div class="demo-col">col</div></div>
        </div>
        <div class="row g-2 mb-3">
          <div class="col"><div class="demo-col">col</div></div>
          <div class="col"><div class="demo-col">col</div></div>
          <div class="col"><div class="demo-col">col</div></div>
          <div class="col"><div class="demo-col">col</div></div>
        </div>
        <div class="row g-2">
          @for (i of [1,2,3,4,5,6]; track i) {
            <div class="col"><div class="demo-col">col</div></div>
          }
        </div>
      </div>
    </div>

    <!-- Sized Columns -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'GRID.COLUMNS' | translate }} — Sized</h6></div>
      <div class="card-body">
        @for (cols of sizedCols; track $index) {
          <div class="row g-2 mb-2">
            @for (col of cols; track $index) {
              <div [class]="'col-' + col"><div class="demo-col">col-{{ col }}</div></div>
            }
          </div>
        }
      </div>
    </div>

    <!-- Offset -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'GRID.OFFSET' | translate }}</h6></div>
      <div class="card-body">
        <div class="row g-2 mb-2">
          <div class="col-md-4"><div class="demo-col">col-md-4</div></div>
          <div class="col-md-4 offset-md-4"><div class="demo-col">col-md-4 offset-md-4</div></div>
        </div>
        <div class="row g-2 mb-2">
          <div class="col-md-3 offset-md-3"><div class="demo-col">col-md-3 offset-md-3</div></div>
          <div class="col-md-3 offset-md-3"><div class="demo-col">col-md-3 offset-md-3</div></div>
        </div>
        <div class="row g-2">
          <div class="col-md-6 offset-md-3"><div class="demo-col">col-md-6 offset-md-3</div></div>
        </div>
      </div>
    </div>

    <!-- Nesting -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'GRID.NESTING' | translate }}</h6></div>
      <div class="card-body">
        <div class="row g-2">
          <div class="col-sm-3"><div class="demo-col">Level 1: col-sm-3</div></div>
          <div class="col-sm-9">
            <div class="demo-col mb-2" style="opacity: 0.6">Level 1: col-sm-9</div>
            <div class="row g-2">
              <div class="col-8"><div class="demo-col" style="background: var(--gradient-success)">Level 2: col-8</div></div>
              <div class="col-4"><div class="demo-col" style="background: var(--gradient-success)">Level 2: col-4</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Responsive -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'GRID.RESPONSIVE' | translate }} Breakpoints</h6></div>
      <div class="card-body">
        <div class="row g-2 mb-2">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"><div class="demo-col">Responsive</div></div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"><div class="demo-col">Responsive</div></div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"><div class="demo-col">Responsive</div></div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"><div class="demo-col">Responsive</div></div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"><div class="demo-col">Responsive</div></div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"><div class="demo-col">Responsive</div></div>
        </div>
        <div class="alert alert-info mt-3 mb-0">
          <i class="bi bi-info-circle me-2"></i>
          Resize your browser window to see how the columns stack at different breakpoints (xs, sm, md, lg, xl, xxl).
        </div>
      </div>
    </div>
  `
})
export class GridComponent {
    sizedCols = [
        [12],
        [6, 6],
        [4, 4, 4],
        [3, 3, 3, 3],
        [2, 2, 2, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [8, 4],
        [3, 6, 3],
        [2, 8, 2],
    ];
}
