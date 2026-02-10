import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-icons',
    standalone: true,
    imports: [CommonModule, FormsModule, TranslateModule],
    template: `
    <div class="page-header">
      <h2>{{ 'ICONS.TITLE' | translate }}</h2>
    </div>

    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0">Bootstrap Icons</h6>
        <div class="d-flex align-items-center gap-3">
          <input type="text" class="form-control form-control-sm" style="width: 250px;"
            [placeholder]="'ICONS.SEARCH' | translate" [(ngModel)]="searchTerm">
          <small class="text-secondary text-nowrap">{{ 'ICONS.SHOWING' | translate }} {{ filteredIcons().length }} {{ 'ICONS.ICONS' | translate }}</small>
        </div>
      </div>
      <div class="card-body">
        <div class="row g-3">
          @for (icon of filteredIcons(); track icon) {
            <div class="col-xl-1 col-lg-2 col-md-3 col-4">
              <div class="icon-card text-center p-3" [title]="icon">
                <i class="bi" [ngClass]="'bi-' + icon"></i>
                <small>{{ icon }}</small>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
    styles: [`
    .icon-card {
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s;

      i { font-size: 1.5rem; display: block; margin-bottom: 0.5rem; color: var(--text-primary); }
      small { font-size: 0.6rem; color: var(--text-secondary); word-break: break-all; display: block; }

      &:hover {
        border-color: #667eea;
        background: rgba(102, 126, 234, 0.05);
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
        i { color: #667eea; }
      }
    }
  `]
})
export class IconsComponent {
    searchTerm = '';

    allIcons = [
        'house', 'house-fill', 'person', 'person-fill', 'people', 'people-fill',
        'gear', 'gear-fill', 'bell', 'bell-fill', 'envelope', 'envelope-fill',
        'search', 'plus', 'dash', 'x', 'check', 'check-circle', 'check-circle-fill',
        'x-circle', 'x-circle-fill', 'exclamation-triangle', 'exclamation-triangle-fill',
        'info-circle', 'info-circle-fill', 'question-circle', 'question-circle-fill',
        'star', 'star-fill', 'heart', 'heart-fill', 'bookmark', 'bookmark-fill',
        'chat', 'chat-fill', 'calendar', 'calendar-fill', 'clock', 'clock-fill',
        'lock', 'lock-fill', 'unlock', 'unlock-fill', 'key', 'key-fill',
        'eye', 'eye-fill', 'eye-slash', 'eye-slash-fill',
        'trash', 'trash-fill', 'pencil', 'pencil-fill', 'pencil-square',
        'download', 'upload', 'cloud', 'cloud-fill', 'cloud-download', 'cloud-upload',
        'folder', 'folder-fill', 'file-earmark', 'file-earmark-fill', 'file-text', 'file-text-fill',
        'image', 'image-fill', 'camera', 'camera-fill', 'film', 'music-note',
        'cart', 'cart-fill', 'bag', 'bag-fill', 'credit-card', 'credit-card-fill',
        'graph-up', 'graph-down', 'bar-chart', 'bar-chart-fill', 'pie-chart', 'pie-chart-fill',
        'map', 'map-fill', 'pin-map', 'pin-map-fill', 'geo-alt', 'geo-alt-fill',
        'phone', 'phone-fill', 'telephone', 'telephone-fill',
        'laptop', 'pc-display', 'tablet', 'phone-landscape',
        'wifi', 'bluetooth', 'battery-full', 'battery-half',
        'sun', 'sun-fill', 'moon', 'moon-fill', 'cloud-sun', 'cloud-moon',
        'shield', 'shield-fill', 'shield-check', 'shield-lock',
        'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right',
        'chevron-up', 'chevron-down', 'chevron-left', 'chevron-right',
        'box-arrow-right', 'box-arrow-in-right', 'box-arrow-up-right',
        'three-dots', 'three-dots-vertical', 'list', 'grid', 'grid-3x3-gap',
        'flag', 'flag-fill', 'trophy', 'trophy-fill',
        'lightning', 'lightning-fill', 'fire', 'droplet', 'droplet-fill',
        'globe', 'translate', 'code', 'code-slash', 'terminal', 'terminal-fill',
        'cup-hot', 'cup-hot-fill', 'emoji-smile', 'emoji-heart-eyes',
        'hand-thumbs-up', 'hand-thumbs-down', 'hand-thumbs-up-fill',
        'link', 'link-45deg', 'paperclip', 'scissors',
        'printer', 'printer-fill', 'qr-code', 'upc-scan',
        'megaphone', 'megaphone-fill', 'newspaper', 'journal',
        'palette', 'palette-fill', 'brush', 'brush-fill', 'paint-bucket', 'vector-pen',
        'hexagon', 'hexagon-fill', 'circle', 'circle-fill', 'square', 'square-fill',
        'diamond', 'diamond-fill', 'triangle', 'triangle-fill',
        'play', 'play-fill', 'pause', 'pause-fill', 'stop', 'stop-fill',
        'skip-forward', 'skip-backward', 'volume-up', 'volume-mute',
    ];

    filteredIcons = computed(() => {
        const term = this.searchTerm.toLowerCase();
        if (!term) return this.allIcons;
        return this.allIcons.filter(icon => icon.includes(term));
    });
}
