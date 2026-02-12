import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

interface ProfileData {
  id: string;
  name: string;
  role: string;
  avatar: string;
  projects: string;
  followers: string;
  following: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  bio: string;
  skills: { name: string; class: string }[];
  timeline: { title: string; desc: string; date: string; icon: string; color: string }[];
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgbNavModule],
  template: `
    <div class="page-header">
      <h2>{{ 'PROFILE.TITLE' | translate }}</h2>
    </div>

    <div class="row g-4" *ngIf="currentProfile">
      <!-- Profile Card -->
      <div class="col-lg-4">
        <div class="card text-center">
          <div class="card-body py-5">
            <div class="avatar avatar-xl mx-auto mb-3" style="background: var(--gradient-primary)">{{ currentProfile.avatar }}</div>
            <h4 class="fw-bold mb-1">{{ currentProfile.name }}</h4>
            <p class="text-secondary mb-3">{{ currentProfile.role }}</p>
            <div class="d-flex justify-content-center gap-2 mb-4">
              @for (skill of currentProfile.skills; track skill.name) {
                <span class="badge" [ngClass]="skill.class">{{ skill.name }}</span>
              }
            </div>
            <div class="row text-center border-top pt-3">
              <div class="col"><h5 class="fw-bold mb-0">{{ currentProfile.projects }}</h5><small class="text-secondary">Projects</small></div>
              <div class="col border-start border-end"><h5 class="fw-bold mb-0">{{ currentProfile.followers }}</h5><small class="text-secondary">Followers</small></div>
              <div class="col"><h5 class="fw-bold mb-0">{{ currentProfile.following }}</h5><small class="text-secondary">Following</small></div>
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="card mt-4">
          <div class="card-body">
            <h6 class="fw-bold mb-3">Contact Information</h6>
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="avatar avatar-sm" style="background: rgba(102,126,234,0.1)"><i class="bi bi-envelope" style="color: #667eea"></i></div>
              <div><small class="text-secondary d-block">Email</small><span class="fw-medium">{{ currentProfile.email }}</span></div>
            </div>
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="avatar avatar-sm" style="background: rgba(56,239,125,0.1)"><i class="bi bi-phone" style="color: #38ef7d"></i></div>
              <div><small class="text-secondary d-block">Phone</small><span class="fw-medium">{{ currentProfile.phone }}</span></div>
            </div>
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="avatar avatar-sm" style="background: rgba(242,153,74,0.1)"><i class="bi bi-geo-alt" style="color: #f2994a"></i></div>
              <div><small class="text-secondary d-block">Location</small><span class="fw-medium">{{ currentProfile.location }}</span></div>
            </div>
            <div class="d-flex align-items-center gap-3">
              <div class="avatar avatar-sm" style="background: rgba(33,147,176,0.1)"><i class="bi bi-globe" style="color: #2193b0"></i></div>
              <div><small class="text-secondary d-block">Website</small><span class="fw-medium">{{ currentProfile.website }}</span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Details -->
      <div class="col-lg-8">
        <div class="card">
          <div class="card-body">
            <ul ngbNav #profileNav="ngbNav" [(activeId)]="activeTab" class="nav-tabs mb-4">
              <li [ngbNavItem]="1">
                <button ngbNavLink><i class="bi bi-person me-1"></i>{{ 'PROFILE.PERSONAL_INFO' | translate }}</button>
                <ng-template ngbNavContent>
                  <form>
                    <div class="row g-3">
                      <div class="col-md-6">
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" [value]="currentProfile.name">
                      </div>
                      <div class="col-md-6">
                        <label class="form-label">Role</label>
                        <input type="text" class="form-control" [value]="currentProfile.role">
                      </div>
                      <div class="col-md-6">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" [value]="currentProfile.email">
                      </div>
                      <div class="col-md-6">
                        <label class="form-label">Phone</label>
                        <input type="tel" class="form-control" [value]="currentProfile.phone">
                      </div>
                      <div class="col-12">
                        <label class="form-label">Bio</label>
                        <textarea class="form-control" rows="3">{{ currentProfile.bio }}</textarea>
                      </div>
                      <div class="col-12">
                        <button class="btn btn-gradient-primary">Save Changes</button>
                      </div>
                    </div>
                  </form>
                </ng-template>
              </li>
              <li [ngbNavItem]="2">
                <button ngbNavLink><i class="bi bi-gear me-1"></i>{{ 'PROFILE.SETTINGS' | translate }}</button>
                <ng-template ngbNavContent>
                  <h6 class="mb-3">Preferences</h6>
                  <div class="form-check form-switch mb-3">
                    <input class="form-check-input" type="checkbox" id="emailNotif" checked>
                    <label class="form-check-label" for="emailNotif">Email Notifications</label>
                  </div>
                  <div class="form-check form-switch mb-3">
                    <input class="form-check-input" type="checkbox" id="pushNotif" checked>
                    <label class="form-check-label" for="pushNotif">Push Notifications</label>
                  </div>
                  <hr>
                  <h6 class="mb-3 text-danger">Danger Zone</h6>
                  <button class="btn btn-outline-danger">Delete Account</button>
                </ng-template>
              </li>
              <li [ngbNavItem]="3">
                <button ngbNavLink><i class="bi bi-activity me-1"></i>{{ 'PROFILE.ACTIVITY' | translate }}</button>
                <ng-template ngbNavContent>
                  <div class="timeline">
                    @for (event of currentProfile.timeline; track $index) {
                      <div class="timeline-item d-flex gap-3 mb-4">
                        <div class="avatar avatar-sm" [style.background]="event.color"><i class="bi" [ngClass]="event.icon"></i></div>
                        <div>
                          <h6 class="mb-0">{{ event.title }}</h6>
                          <p class="text-secondary mb-0 small">{{ event.desc }}</p>
                          <small class="text-secondary">{{ event.date }}</small>
                        </div>
                      </div>
                    }
                  </div>
                </ng-template>
              </li>
            </ul>
            <div [ngbNavOutlet]="profileNav"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fallback if not found -->
    <div *ngIf="!currentProfile" class="text-center py-5">
      <i class="bi bi-person-x fs-1 text-secondary mb-3 d-block"></i>
      <h3>Profile Not Found</h3>
      <p class="text-muted">The requested profile does not exist.</p>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  activeTab = 1;
  currentProfile: ProfileData | null = null;

  private mockProfiles: Record<string, ProfileData> = {
    '1': {
      id: '1',
      name: 'John Doe',
      role: 'Senior Full-Stack Developer',
      avatar: 'JD',
      projects: '142',
      followers: '2.8K',
      following: '98',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      website: 'johndoe.dev',
      bio: 'Senior Full-Stack Developer with 10+ years of experience in building scalable web applications.',
      skills: [
        { name: 'Angular', class: 'bg-primary' },
        { name: 'TypeScript', class: 'bg-success' },
        { name: 'Node.js', class: 'bg-info' }
      ],
      timeline: [
        { title: 'Updated profile picture', desc: 'Changed avatar to a new photo', date: '2 hours ago', icon: 'bi-camera', color: 'var(--gradient-primary)' },
        { title: 'Completed project', desc: 'Finished the Angular v20 showcase app', date: '1 day ago', icon: 'bi-check-circle', color: 'var(--gradient-success)' }
      ]
    },
    '2': {
      id: '2',
      name: 'Jane Smith',
      role: 'UI/UX Designer',
      avatar: 'JS',
      projects: '85',
      followers: '4.2K',
      following: '156',
      email: 'jane.smith@design.co',
      phone: '+1 (555) 987-6543',
      location: 'New York, NY',
      website: 'janesmyth.design',
      bio: 'Creative UI/UX Designer passionate about crafting intuitive digital experiences and modern aesthetics.',
      skills: [
        { name: 'Figma', class: 'bg-danger' },
        { name: 'Aesthetic', class: 'bg-warning' },
        { name: 'Vue.js', class: 'bg-success' }
      ],
      timeline: [
        { title: 'New Layout designed', desc: 'Released the new Dashboard UI', date: '3 hours ago', icon: 'bi-palette', color: 'var(--gradient-danger)' },
        { title: 'Client Meeting', desc: 'Discussed Q1 goals with stakeholders', date: '2 days ago', icon: 'bi-chat-dots', color: 'var(--gradient-info)' }
      ]
    }
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && this.mockProfiles[id]) {
        this.currentProfile = this.mockProfiles[id];
      } else {
        this.currentProfile = null;
      }
    });
  }
}
