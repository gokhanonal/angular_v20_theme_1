import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbAccordionModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-navigation-page',
    standalone: true,
    imports: [CommonModule, TranslateModule, NgbAccordionModule, NgbNavModule],
    template: `
    <div class="page-header">
      <h2>{{ 'NAVIGATION.TITLE' | translate }}</h2>
    </div>

    <!-- Tabs -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'NAVIGATION.TABS' | translate }}</h6></div>
      <div class="card-body">
        <ul ngbNav #nav="ngbNav" [(activeId)]="activeTabId" class="nav-tabs mb-3">
          <li [ngbNavItem]="1">
            <button ngbNavLink><i class="bi bi-house me-1"></i>Home</button>
            <ng-template ngbNavContent>
              <p class="p-3">Home tab content. This is a fully functional tab component using <strong>ng-bootstrap NgbNav</strong>.</p>
            </ng-template>
          </li>
          <li [ngbNavItem]="2">
            <button ngbNavLink><i class="bi bi-person me-1"></i>Profile</button>
            <ng-template ngbNavContent>
              <p class="p-3">Profile tab content with user information and settings.</p>
            </ng-template>
          </li>
          <li [ngbNavItem]="3">
            <button ngbNavLink><i class="bi bi-envelope me-1"></i>Messages</button>
            <ng-template ngbNavContent>
              <p class="p-3">Messages tab content showing recent conversations.</p>
            </ng-template>
          </li>
          <li [ngbNavItem]="4" [disabled]="true">
            <button ngbNavLink>Disabled</button>
            <ng-template ngbNavContent></ng-template>
          </li>
        </ul>
        <div [ngbNavOutlet]="nav"></div>
      </div>
    </div>

    <!-- Pills -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'NAVIGATION.PILLS' | translate }}</h6></div>
      <div class="card-body">
        <ul ngbNav #pillNav="ngbNav" [(activeId)]="activePillId" class="nav-pills mb-3">
          <li [ngbNavItem]="1">
            <button ngbNavLink>Active</button>
            <ng-template ngbNavContent><p class="p-3">Active pill content area.</p></ng-template>
          </li>
          <li [ngbNavItem]="2">
            <button ngbNavLink>Link</button>
            <ng-template ngbNavContent><p class="p-3">Second pill content area.</p></ng-template>
          </li>
          <li [ngbNavItem]="3">
            <button ngbNavLink>Another</button>
            <ng-template ngbNavContent><p class="p-3">Third pill content area.</p></ng-template>
          </li>
        </ul>
        <div [ngbNavOutlet]="pillNav"></div>
      </div>
    </div>

    <!-- Vertical Pills -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">Vertical Pills</h6></div>
      <div class="card-body">
        <div class="row">
          <div class="col-3">
            <ul ngbNav #vertNav="ngbNav" [(activeId)]="activeVertId" class="nav-pills flex-column">
              <li [ngbNavItem]="1">
                <button ngbNavLink><i class="bi bi-gear me-2"></i>Settings</button>
                <ng-template ngbNavContent><h6>Settings</h6><p>Configure your application settings here.</p></ng-template>
              </li>
              <li [ngbNavItem]="2">
                <button ngbNavLink><i class="bi bi-shield me-2"></i>Security</button>
                <ng-template ngbNavContent><h6>Security</h6><p>Manage your security preferences and two-factor authentication.</p></ng-template>
              </li>
              <li [ngbNavItem]="3">
                <button ngbNavLink><i class="bi bi-bell me-2"></i>Notifications</button>
                <ng-template ngbNavContent><h6>Notifications</h6><p>Set your notification preferences for email, push, and in-app alerts.</p></ng-template>
              </li>
            </ul>
          </div>
          <div class="col-9">
            <div [ngbNavOutlet]="vertNav"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Breadcrumbs -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'NAVIGATION.BREADCRUMBS' | translate }}</h6></div>
      <div class="card-body">
        <nav>
          <ol class="breadcrumb mb-3">
            <li class="breadcrumb-item active">Home</li>
          </ol>
          <ol class="breadcrumb mb-3">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active">Library</li>
          </ol>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Library</a></li>
            <li class="breadcrumb-item active">Data</li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Accordion -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'NAVIGATION.ACCORDION' | translate }}</h6></div>
      <div class="card-body">
        <div ngbAccordion>
          <div ngbAccordionItem [collapsed]="false">
            <h2 ngbAccordionHeader>
              <button ngbAccordionButton><i class="bi bi-lightning me-2"></i>Getting Started</button>
            </h2>
            <div ngbAccordionCollapse>
              <div ngbAccordionBody>
                <ng-template>Welcome to the Angular v20 demo application! This accordion is built using ng-bootstrap's NgbAccordion component. It supports expand/collapse animations and aria attributes for accessibility.</ng-template>
              </div>
            </div>
          </div>
          <div ngbAccordionItem>
            <h2 ngbAccordionHeader>
              <button ngbAccordionButton><i class="bi bi-palette me-2"></i>Theming & Customization</button>
            </h2>
            <div ngbAccordionCollapse>
              <div ngbAccordionBody>
                <ng-template>The application supports both dark and light themes. You can toggle themes using the moon/sun icon in the header. Theme preferences are stored in localStorage for persistence across sessions.</ng-template>
              </div>
            </div>
          </div>
          <div ngbAccordionItem>
            <h2 ngbAccordionHeader>
              <button ngbAccordionButton><i class="bi bi-translate me-2"></i>Multi-language Support</button>
            </h2>
            <div ngbAccordionCollapse>
              <div ngbAccordionBody>
                <ng-template>This app includes English and Turkish translations powered by ngx-translate. You can switch languages from the header dropdown. All labels, menus, and content adapt dynamically.</ng-template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- List Groups -->
    <div class="card mb-4">
      <div class="card-header"><h6 class="mb-0">{{ 'NAVIGATION.LIST_GROUPS' | translate }}</h6></div>
      <div class="card-body">
        <div class="row g-4">
          <div class="col-md-6">
            <h6 class="mb-3">Interactive List</h6>
            <div class="list-group">
              @for (item of listItems; track item.text) {
                <a class="list-group-item list-group-item-action d-flex gap-3 py-3" [class.active]="item.active" (click)="selectItem(item)">
                  <div class="avatar avatar-sm" [style.background]="item.avatar">{{ item.initials }}</div>
                  <div class="flex-grow-1">
                    <div class="d-flex justify-content-between">
                      <h6 class="mb-0">{{ item.text }}</h6>
                      <small class="text-nowrap">{{ item.time }}</small>
                    </div>
                    <small class="opacity-75">{{ item.desc }}</small>
                  </div>
                </a>
              }
            </div>
          </div>
          <div class="col-md-6">
            <h6 class="mb-3">Numbered List</h6>
            <ol class="list-group list-group-numbered">
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto"><div class="fw-bold">Subheading</div>Content with supporting text</div>
                <span class="badge bg-primary rounded-pill">14</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto"><div class="fw-bold">Second item</div>More content below</div>
                <span class="badge bg-primary rounded-pill">6</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto"><div class="fw-bold">Third item</div>Additional information</div>
                <span class="badge bg-primary rounded-pill">3</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  `
})
export class NavigationPageComponent {
    activeTabId = 1;
    activePillId = 1;
    activeVertId = 1;

    listItems = [
        { text: 'Project Update', desc: 'New milestone reached', time: '3m ago', initials: 'PU', avatar: 'var(--gradient-primary)', active: true },
        { text: 'Design Review', desc: 'Feedback on new mockups', time: '1h ago', initials: 'DR', avatar: 'var(--gradient-success)', active: false },
        { text: 'Team Meeting', desc: 'Sprint planning session', time: '2h ago', initials: 'TM', avatar: 'var(--gradient-warning)', active: false },
        { text: 'Bug Report', desc: 'Critical issue fixed', time: '5h ago', initials: 'BR', avatar: 'var(--gradient-danger)', active: false },
    ];

    selectItem(item: any): void {
        this.listItems.forEach(i => i.active = false);
        item.active = true;
    }
}
