import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, TranslateModule, NgbNavModule],
    template: `
    <div class="page-header">
      <h2>{{ 'PROFILE.TITLE' | translate }}</h2>
    </div>

    <div class="row g-4">
      <!-- Profile Card -->
      <div class="col-lg-4">
        <div class="card text-center">
          <div class="card-body py-5">
            <div class="avatar avatar-xl mx-auto mb-3" style="background: var(--gradient-primary)">JD</div>
            <h4 class="fw-bold mb-1">John Doe</h4>
            <p class="text-secondary mb-3">Senior Full-Stack Developer</p>
            <div class="d-flex justify-content-center gap-2 mb-4">
              <span class="badge bg-primary">Angular</span>
              <span class="badge bg-success">TypeScript</span>
              <span class="badge bg-info">Node.js</span>
            </div>
            <div class="row text-center border-top pt-3">
              <div class="col"><h5 class="fw-bold mb-0">142</h5><small class="text-secondary">Projects</small></div>
              <div class="col border-start border-end"><h5 class="fw-bold mb-0">2.8K</h5><small class="text-secondary">Followers</small></div>
              <div class="col"><h5 class="fw-bold mb-0">98</h5><small class="text-secondary">Following</small></div>
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="card mt-4">
          <div class="card-body">
            <h6 class="fw-bold mb-3">Contact Information</h6>
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="avatar avatar-sm" style="background: rgba(102,126,234,0.1)"><i class="bi bi-envelope" style="color: #667eea"></i></div>
              <div><small class="text-secondary d-block">Email</small><span class="fw-medium">john.doe&#64;example.com</span></div>
            </div>
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="avatar avatar-sm" style="background: rgba(56,239,125,0.1)"><i class="bi bi-phone" style="color: #38ef7d"></i></div>
              <div><small class="text-secondary d-block">Phone</small><span class="fw-medium">+1 (555) 123-4567</span></div>
            </div>
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="avatar avatar-sm" style="background: rgba(242,153,74,0.1)"><i class="bi bi-geo-alt" style="color: #f2994a"></i></div>
              <div><small class="text-secondary d-block">Location</small><span class="fw-medium">San Francisco, CA</span></div>
            </div>
            <div class="d-flex align-items-center gap-3">
              <div class="avatar avatar-sm" style="background: rgba(33,147,176,0.1)"><i class="bi bi-globe" style="color: #2193b0"></i></div>
              <div><small class="text-secondary d-block">Website</small><span class="fw-medium">johndoe.dev</span></div>
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
                        <label class="form-label">First Name</label>
                        <input type="text" class="form-control" value="John">
                      </div>
                      <div class="col-md-6">
                        <label class="form-label">Last Name</label>
                        <input type="text" class="form-control" value="Doe">
                      </div>
                      <div class="col-md-6">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" value="john.doe@example.com">
                      </div>
                      <div class="col-md-6">
                        <label class="form-label">Phone</label>
                        <input type="tel" class="form-control" value="+1 (555) 123-4567">
                      </div>
                      <div class="col-12">
                        <label class="form-label">Bio</label>
                        <textarea class="form-control" rows="3">Senior Full-Stack Developer with 10+ years of experience in building scalable web applications.</textarea>
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
                  <div class="form-check form-switch mb-3">
                    <input class="form-check-input" type="checkbox" id="twoFactor">
                    <label class="form-check-label" for="twoFactor">Two-Factor Authentication</label>
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
                    @for (event of timeline; track event.date) {
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
  `
})
export class ProfileComponent {
    activeTab = 1;

    timeline = [
        { title: 'Updated profile picture', desc: 'Changed avatar to a new photo', date: '2 hours ago', icon: 'bi-camera', color: 'var(--gradient-primary)' },
        { title: 'Completed project', desc: 'Finished the Angular v20 showcase app', date: '1 day ago', icon: 'bi-check-circle', color: 'var(--gradient-success)' },
        { title: 'Joined team', desc: 'Became part of the frontend team', date: '3 days ago', icon: 'bi-people', color: 'var(--gradient-info)' },
        { title: 'Published article', desc: 'Wrote about Angular signals best practices', date: '1 week ago', icon: 'bi-journal-text', color: 'var(--gradient-warning)' },
        { title: 'Earned badge', desc: 'Received the "Top Contributor" badge', date: '2 weeks ago', icon: 'bi-award', color: 'var(--gradient-danger)' },
    ];
}
