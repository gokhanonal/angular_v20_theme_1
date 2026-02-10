import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, TranslateModule, RouterLink],
    template: `
    <div class="page-header">
      <h2>{{ 'DASHBOARD.TITLE' | translate }}</h2>
      <p>{{ 'DASHBOARD.SALES_OVERVIEW' | translate }}</p>
    </div>

    <!-- Stats Cards -->
    <div class="row g-4 mb-4">
      @for (stat of stats; track stat.title) {
        <div class="col-xl-3 col-md-6">
          <div class="card gradient-card" [ngClass]="stat.gradient">
            <div class="card-body d-flex justify-content-between align-items-center p-4">
              <div>
                <h6 class="mb-1 opacity-75">{{ stat.title | translate }}</h6>
                <h3 class="mb-0 fw-bold">{{ stat.value }}</h3>
                <small class="opacity-75">
                  <i class="bi" [ngClass]="stat.trendIcon"></i> {{ stat.trend }}
                </small>
              </div>
              <div class="stat-icon">
                <i class="bi" [ngClass]="stat.icon"></i>
              </div>
            </div>
          </div>
        </div>
      }
    </div>

    <!-- Charts Row -->
    <div class="row g-4 mb-4">
      <div class="col-lg-8">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h6 class="mb-0">{{ 'DASHBOARD.SALES_OVERVIEW' | translate }}</h6>
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-primary active">Week</button>
              <button class="btn btn-outline-primary">Month</button>
              <button class="btn btn-outline-primary">Year</button>
            </div>
          </div>
          <div class="card-body">
            <div class="chart-placeholder">
              <div class="chart-bars">
                @for (bar of chartData; track bar.label) {
                  <div class="chart-bar-group">
                    <div class="chart-bar" [style.height.%]="bar.value">
                      <span class="chart-value">{{ bar.value }}%</span>
                    </div>
                    <span class="chart-label">{{ bar.label }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card h-100">
          <div class="card-header">
            <h6 class="mb-0">Quick Stats</h6>
          </div>
          <div class="card-body">
            @for (item of quickStats; track item.label) {
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex align-items-center gap-2">
                  <div class="avatar avatar-sm" [style.background]="item.color">
                    <i class="bi" [ngClass]="item.icon"></i>
                  </div>
                  <span class="fw-medium">{{ item.label }}</span>
                </div>
                <span class="fw-bold">{{ item.value }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity Table -->
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0">{{ 'DASHBOARD.RECENT_ACTIVITY' | translate }}</h6>
        <button class="btn btn-sm btn-gradient-primary">View All</button>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th>{{ 'DASHBOARD.USER' | translate }}</th>
                <th>{{ 'DASHBOARD.ACTION' | translate }}</th>
                <th>{{ 'DASHBOARD.DATE' | translate }}</th>
                <th>{{ 'DASHBOARD.STATUS' | translate }}</th>
              </tr>
            </thead>
            <tbody>
              @for (activity of activities; track activity.user) {
                <tr>
                  <td>
                    <div class="d-flex align-items-center gap-2">
                      <div class="avatar avatar-sm" [style.background]="activity.avatar">{{ activity.initials }}</div>
                      <span class="fw-medium">{{ activity.user }}</span>
                    </div>
                  </td>
                  <td>{{ activity.action }}</td>
                  <td class="text-secondary">{{ activity.date }}</td>
                  <td><span class="badge" [ngClass]="'bg-' + activity.statusClass">{{ activity.status }}</span></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .stat-icon {
      font-size: 2.5rem;
      opacity: 0.3;
    }

    .chart-placeholder {
      height: 280px;
      display: flex;
      align-items: flex-end;
    }

    .chart-bars {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      width: 100%;
      height: 100%;
      padding-top: 1rem;
    }

    .chart-bar-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      max-width: 60px;
    }

    .chart-bar {
      width: 32px;
      background: var(--gradient-primary);
      border-radius: 0.5rem 0.5rem 0 0;
      transition: height 0.6s ease;
      position: relative;
      min-height: 20px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    .chart-value {
      font-size: 0.65rem;
      font-weight: 600;
      color: #fff;
      padding-top: 4px;
    }

    .chart-label {
      font-size: 0.7rem;
      color: var(--text-secondary);
      margin-top: 0.5rem;
    }
  `]
})
export class DashboardComponent {
    stats = [
        { title: 'DASHBOARD.TOTAL_USERS', value: '12,842', trend: '+12.5%', trendIcon: 'bi-arrow-up', icon: 'bi-people-fill', gradient: 'primary' },
        { title: 'DASHBOARD.REVENUE', value: '$48,290', trend: '+8.2%', trendIcon: 'bi-arrow-up', icon: 'bi-currency-dollar', gradient: 'success' },
        { title: 'DASHBOARD.ORDERS', value: '3,156', trend: '+23.1%', trendIcon: 'bi-arrow-up', icon: 'bi-cart-fill', gradient: 'warning' },
        { title: 'DASHBOARD.GROWTH', value: '28.6%', trend: '+4.3%', trendIcon: 'bi-arrow-up', icon: 'bi-graph-up-arrow', gradient: 'info' },
    ];

    chartData = [
        { label: 'Mon', value: 65 }, { label: 'Tue', value: 85 },
        { label: 'Wed', value: 45 }, { label: 'Thu', value: 90 },
        { label: 'Fri', value: 70 }, { label: 'Sat', value: 55 },
        { label: 'Sun', value: 78 },
    ];

    quickStats = [
        { label: 'New Users', value: '142', icon: 'bi-person-plus-fill', color: 'var(--gradient-primary)' },
        { label: 'Bounce Rate', value: '24.3%', icon: 'bi-arrow-return-left', color: 'var(--gradient-danger)' },
        { label: 'Avg Session', value: '4m 32s', icon: 'bi-clock-fill', color: 'var(--gradient-success)' },
        { label: 'Page Views', value: '8,456', icon: 'bi-eye-fill', color: 'var(--gradient-warning)' },
        { label: 'Conversions', value: '3.2%', icon: 'bi-bullseye', color: 'var(--gradient-info)' },
    ];

    activities = [
        { user: 'John Doe', initials: 'JD', avatar: 'var(--gradient-primary)', action: 'Created new project', date: '2 min ago', status: 'Active', statusClass: 'success' },
        { user: 'Jane Smith', initials: 'JS', avatar: 'var(--gradient-success)', action: 'Updated profile settings', date: '15 min ago', status: 'Pending', statusClass: 'warning' },
        { user: 'Mike Johnson', initials: 'MJ', avatar: 'var(--gradient-danger)', action: 'Deleted old records', date: '1 hour ago', status: 'Completed', statusClass: 'primary' },
        { user: 'Sarah Wilson', initials: 'SW', avatar: 'var(--gradient-warning)', action: 'Exported report', date: '3 hours ago', status: 'Active', statusClass: 'success' },
        { user: 'Tom Brown', initials: 'TB', avatar: 'var(--gradient-info)', action: 'Added team member', date: '5 hours ago', status: 'Inactive', statusClass: 'secondary' },
    ];
}
