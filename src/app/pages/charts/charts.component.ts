import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
    selector: 'app-charts',
    standalone: true,
    imports: [CommonModule, TranslateModule, NgxChartsModule],
    template: `
    <div class="page-header">
      <h2>{{ 'CHARTS.TITLE' | translate }}</h2>
    </div>

    <!-- Chart library tabs -->
    <ul class="nav nav-pills mb-4">
      <li class="nav-item">
        <a class="nav-link" [class.active]="activeTab() === 'ngx'" (click)="activeTab.set('ngx')">
          <i class="bi bi-bar-chart me-1"></i> {{ 'CHARTS.NGX_CHARTS' | translate }}
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [class.active]="activeTab() === 'apex'" (click)="activeTab.set('apex')">
          <i class="bi bi-graph-up me-1"></i> {{ 'CHARTS.APEX_CHARTS' | translate }}
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [class.active]="activeTab() === 'echarts'" (click)="activeTab.set('echarts')">
          <i class="bi bi-pie-chart me-1"></i> {{ 'CHARTS.ECHARTS' | translate }}
        </a>
      </li>
    </ul>

    <!-- ngx-charts -->
    @if (activeTab() === 'ngx') {
      <div class="row g-4 animate-fade-in">
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header"><h6 class="mb-0">{{ 'CHARTS.BAR_CHART' | translate }}</h6></div>
            <div class="card-body chart-container">
              <ngx-charts-bar-vertical
                [results]="barData"
                [xAxis]="true" [yAxis]="true"
                [showXAxisLabel]="true" [showYAxisLabel]="true"
                xAxisLabel="Month" yAxisLabel="Revenue ($)"
                [gradient]="true" [scheme]="colorScheme">
              </ngx-charts-bar-vertical>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header"><h6 class="mb-0">{{ 'CHARTS.LINE_CHART' | translate }}</h6></div>
            <div class="card-body chart-container">
              <ngx-charts-line-chart
                [results]="lineData"
                [xAxis]="true" [yAxis]="true"
                [showXAxisLabel]="true" [showYAxisLabel]="true"
                xAxisLabel="Month" yAxisLabel="Users"
                [scheme]="colorScheme" [autoScale]="true">
              </ngx-charts-line-chart>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header"><h6 class="mb-0">{{ 'CHARTS.PIE_CHART' | translate }}</h6></div>
            <div class="card-body chart-container">
              <ngx-charts-pie-chart
                [results]="pieData"
                [labels]="true" [doughnut]="false"
                [gradient]="true" [scheme]="colorScheme">
              </ngx-charts-pie-chart>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header"><h6 class="mb-0">{{ 'CHARTS.AREA_CHART' | translate }}</h6></div>
            <div class="card-body chart-container">
              <ngx-charts-area-chart
                [results]="lineData"
                [xAxis]="true" [yAxis]="true"
                [showXAxisLabel]="true" [showYAxisLabel]="true"
                xAxisLabel="Month" yAxisLabel="Sales"
                [scheme]="colorScheme" [gradient]="true">
              </ngx-charts-area-chart>
            </div>
          </div>
        </div>
      </div>
    }

    <!-- ApexCharts placeholder -->
    @if (activeTab() === 'apex') {
      <div class="row g-4 animate-fade-in">
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header"><h6 class="mb-0">{{ 'CHARTS.BAR_CHART' | translate }} (ApexCharts)</h6></div>
            <div class="card-body">
              <div class="apex-chart-placeholder">
                <div class="chart-bars-apex">
                  @for (item of apexBarData; track item.label) {
                    <div class="apex-bar-group">
                      <div class="apex-bar" [style.height.%]="item.value" [style.background]="item.color"></div>
                      <span class="apex-label">{{ item.label }}</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header"><h6 class="mb-0">{{ 'CHARTS.LINE_CHART' | translate }} (ApexCharts)</h6></div>
            <div class="card-body">
              <div class="apex-chart-placeholder">
                <svg viewBox="0 0 400 200" class="line-chart-svg">
                  <polyline fill="none" stroke="#667eea" stroke-width="2.5"
                    points="20,150 80,100 140,130 200,60 260,90 320,40 380,70"/>
                  <polyline fill="none" stroke="#38ef7d" stroke-width="2.5" stroke-dasharray="5,5"
                    points="20,160 80,120 140,110 200,90 260,80 320,60 380,50"/>
                  @for (point of linePoints; track point.x) {
                    <circle [attr.cx]="point.x" [attr.cy]="point.y" r="4" fill="#667eea"/>
                  }
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header"><h6 class="mb-0">Radial Chart (ApexCharts)</h6></div>
            <div class="card-body">
              <div class="d-flex justify-content-center gap-4 flex-wrap">
                @for (item of radialData; track item.label) {
                  <div class="radial-item text-center">
                    <div class="radial-circle" [style.background]="'conic-gradient(' + item.color + ' ' + item.value + '%, var(--border-color) 0)'">
                      <span class="radial-value">{{ item.value }}%</span>
                    </div>
                    <small class="text-secondary mt-2 d-block">{{ item.label }}</small>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header"><h6 class="mb-0">Heatmap (ApexCharts)</h6></div>
            <div class="card-body">
              <div class="heatmap-grid">
                @for (row of heatmapData; track row.label) {
                  <div class="heatmap-row">
                    <span class="heatmap-label">{{ row.label }}</span>
                    @for (cell of row.values; track $index) {
                      <div class="heatmap-cell" [style.background]="'rgba(102, 126, 234, ' + cell / 100 + ')'"
                        [title]="cell + '%'">
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    }

    <!-- ECharts placeholder -->
    @if (activeTab() === 'echarts') {
      <div class="row g-4 animate-fade-in">
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header"><h6 class="mb-0">{{ 'CHARTS.BAR_CHART' | translate }} (ECharts)</h6></div>
            <div class="card-body">
              <div class="apex-chart-placeholder">
                <div class="chart-bars-apex">
                  @for (item of echartsBarData; track item.label) {
                    <div class="apex-bar-group">
                      <div class="apex-bar" [style.height.%]="item.value" [style.background]="item.color"></div>
                      <span class="apex-label">{{ item.label }}</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header"><h6 class="mb-0">{{ 'CHARTS.PIE_CHART' | translate }} (ECharts)</h6></div>
            <div class="card-body">
              <div class="d-flex justify-content-center">
                <div class="donut-chart">
                  <svg viewBox="0 0 200 200">
                    @for (seg of donutSegments; track seg.label) {
                      <circle r="70" cx="100" cy="100" fill="transparent" [attr.stroke]="seg.color"
                        stroke-width="30" [attr.stroke-dasharray]="seg.dash" [attr.stroke-dashoffset]="seg.offset"
                        transform="rotate(-90 100 100)"/>
                    }
                  </svg>
                  <div class="donut-center">
                    <strong>Total</strong>
                    <span>1,250</span>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center gap-3 mt-3 flex-wrap">
                @for (seg of donutSegments; track seg.label) {
                  <span class="d-flex align-items-center gap-1">
                    <span class="status-dot" [style.background]="seg.color"></span>
                    <small>{{ seg.label }}</small>
                  </span>
                }
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header"><h6 class="mb-0">Scatter Plot (ECharts)</h6></div>
            <div class="card-body">
              <svg viewBox="0 0 400 250" class="scatter-svg">
                <line x1="40" y1="220" x2="390" y2="220" stroke="var(--border-color)" stroke-width="1"/>
                <line x1="40" y1="10" x2="40" y2="220" stroke="var(--border-color)" stroke-width="1"/>
                @for (point of scatterData; track $index) {
                  <circle [attr.cx]="point.x" [attr.cy]="point.y" [attr.r]="point.r" [attr.fill]="point.color" opacity="0.7"/>
                }
              </svg>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header"><h6 class="mb-0">Gauge (ECharts)</h6></div>
            <div class="card-body">
              <div class="d-flex justify-content-center gap-5 flex-wrap">
                @for (gauge of gaugeData; track gauge.label) {
                  <div class="gauge-item text-center">
                    <div class="gauge-circle" [style.background]="'conic-gradient(' + gauge.color + ' ' + (gauge.value * 2.7) + 'deg, var(--border-color) 0)'">
                      <span class="gauge-value">{{ gauge.value }}</span>
                    </div>
                    <small class="text-secondary mt-2 d-block">{{ gauge.label }}</small>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
    styles: [`
    .chart-container { height: 300px; }
    .apex-chart-placeholder { height: 250px; display: flex; align-items: flex-end; }
    .chart-bars-apex {
      display: flex; align-items: flex-end; justify-content: space-around;
      width: 100%; height: 100%; padding: 1rem 0;
    }
    .apex-bar-group { display: flex; flex-direction: column; align-items: center; flex: 1; }
    .apex-bar { width: 28px; border-radius: 4px 4px 0 0; transition: height 0.6s ease; min-height: 10px; }
    .apex-label { font-size: 0.7rem; color: var(--text-secondary); margin-top: 0.5rem; }

    .line-chart-svg { width: 100%; height: 200px; }

    .radial-circle {
      width: 100px; height: 100px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
    }
    .radial-value {
      background: var(--bg-card); width: 70px; height: 70px;
      border-radius: 50%; display: flex; align-items: center;
      justify-content: center; font-weight: 700; font-size: 1.1rem;
    }

    .heatmap-grid { display: flex; flex-direction: column; gap: 4px; }
    .heatmap-row { display: flex; align-items: center; gap: 4px; }
    .heatmap-label { width: 40px; font-size: 0.7rem; color: var(--text-secondary); }
    .heatmap-cell { width: 32px; height: 32px; border-radius: 4px; }

    .donut-chart { position: relative; width: 200px; height: 200px; }
    .donut-chart svg { width: 100%; height: 100%; }
    .donut-center {
      position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
      text-align: center; display: flex; flex-direction: column;
      font-size: 0.8rem; color: var(--text-secondary);
      span { font-size: 1.2rem; font-weight: 700; color: var(--text-primary); }
    }

    .scatter-svg { width: 100%; height: 250px; }

    .gauge-circle {
      width: 120px; height: 120px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
    }
    .gauge-value {
      background: var(--bg-card); width: 85px; height: 85px;
      border-radius: 50%; display: flex; align-items: center;
      justify-content: center; font-weight: 700; font-size: 1.5rem;
    }
  `]
})
export class ChartsComponent {
    activeTab = signal<'ngx' | 'apex' | 'echarts'>('ngx');

    colorScheme: Color = {
        name: 'custom', selectable: true, group: ScaleType.Ordinal,
        domain: ['#667eea', '#764ba2', '#38ef7d', '#f2994a', '#2193b0', '#eb3349']
    };

    barData = [
        { name: 'Jan', value: 8200 }, { name: 'Feb', value: 9300 },
        { name: 'Mar', value: 7500 }, { name: 'Apr', value: 11200 },
        { name: 'May', value: 9800 }, { name: 'Jun', value: 12500 },
    ];

    lineData = [
        {
            name: 'Users', series: [
                { name: 'Jan', value: 2100 }, { name: 'Feb', value: 3200 },
                { name: 'Mar', value: 2800 }, { name: 'Apr', value: 4100 },
                { name: 'May', value: 3600 }, { name: 'Jun', value: 5200 },
            ]
        },
        {
            name: 'Sessions', series: [
                { name: 'Jan', value: 4200 }, { name: 'Feb', value: 5100 },
                { name: 'Mar', value: 4600 }, { name: 'Apr', value: 6800 },
                { name: 'May', value: 5900 }, { name: 'Jun', value: 7400 },
            ]
        }
    ];

    pieData = [
        { name: 'Chrome', value: 45 }, { name: 'Firefox', value: 25 },
        { name: 'Safari', value: 18 }, { name: 'Edge', value: 12 },
    ];

    apexBarData = [
        { label: 'Q1', value: 65, color: '#667eea' }, { label: 'Q2', value: 85, color: '#764ba2' },
        { label: 'Q3', value: 45, color: '#38ef7d' }, { label: 'Q4', value: 90, color: '#f2994a' },
    ];

    linePoints = [
        { x: 20, y: 150 }, { x: 80, y: 100 }, { x: 140, y: 130 },
        { x: 200, y: 60 }, { x: 260, y: 90 }, { x: 320, y: 40 }, { x: 380, y: 70 }
    ];

    radialData = [
        { label: 'Sales', value: 72, color: '#667eea' },
        { label: 'Revenue', value: 58, color: '#38ef7d' },
        { label: 'Growth', value: 84, color: '#f2994a' },
    ];

    heatmapData = [
        { label: 'Mon', values: [20, 45, 72, 30, 60, 88, 50] },
        { label: 'Tue', values: [55, 30, 48, 90, 42, 65, 75] },
        { label: 'Wed', values: [80, 60, 35, 55, 70, 40, 92] },
        { label: 'Thu', values: [40, 75, 88, 45, 55, 70, 30] },
        { label: 'Fri', values: [65, 50, 60, 80, 35, 55, 45] },
    ];

    echartsBarData = [
        { label: 'Jan', value: 55, color: '#2193b0' }, { label: 'Feb', value: 75, color: '#6dd5ed' },
        { label: 'Mar', value: 40, color: '#11998e' }, { label: 'Apr', value: 88, color: '#38ef7d' },
        { label: 'May', value: 60, color: '#f2994a' }, { label: 'Jun', value: 95, color: '#f2c94c' },
    ];

    donutSegments = [
        { label: 'Desktop', value: 440, color: '#667eea', dash: '188 252', offset: '0' },
        { label: 'Mobile', value: 350, color: '#38ef7d', dash: '150 290', offset: '-188' },
        { label: 'Tablet', value: 280, color: '#f2994a', dash: '120 320', offset: '-338' },
        { label: 'Other', value: 180, color: '#eb3349', dash: '77 363', offset: '-458' },
    ];

    scatterData = Array.from({ length: 30 }, () => ({
        x: 50 + Math.random() * 330,
        y: 20 + Math.random() * 190,
        r: 3 + Math.random() * 8,
        color: ['#667eea', '#38ef7d', '#f2994a', '#eb3349'][Math.floor(Math.random() * 4)]
    }));

    gaugeData = [
        { label: 'CPU Usage', value: 72, color: '#667eea' },
        { label: 'Memory', value: 58, color: '#38ef7d' },
        { label: 'Disk I/O', value: 84, color: '#f2994a' },
    ];
}
