import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
            { path: 'ui-elements', loadComponent: () => import('./pages/ui-elements/ui-elements.component').then(m => m.UiElementsComponent) },
            { path: 'forms', loadComponent: () => import('./pages/forms/forms.component').then(m => m.FormsPageComponent) },
            { path: 'tables', loadComponent: () => import('./pages/tables/tables.component').then(m => m.TablesComponent) },
            { path: 'charts', loadComponent: () => import('./pages/charts/charts.component').then(m => m.ChartsComponent) },
            { path: 'modals', loadComponent: () => import('./pages/modals/modals.component').then(m => m.ModalsComponent) },
            { path: 'navigation', loadComponent: () => import('./pages/navigation/navigation.component').then(m => m.NavigationPageComponent) },
            { path: 'icons', loadComponent: () => import('./pages/icons/icons.component').then(m => m.IconsComponent) },
            { path: 'grid', loadComponent: () => import('./pages/grid/grid.component').then(m => m.GridComponent) },
            { path: 'file-upload', loadComponent: () => import('./pages/file-upload/file-upload.component').then(m => m.FileUploadComponent) },
            { path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) },
        ]
    },
    { path: 'login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) },
    { path: 'register', loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent) },
    { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
