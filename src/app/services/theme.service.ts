import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private readonly STORAGE_KEY = 'app-theme';
    currentTheme = signal<Theme>(this.getStoredTheme());

    constructor() {
        this.applyTheme(this.currentTheme());
    }

    toggleTheme(): void {
        const next: Theme = this.currentTheme() === 'light' ? 'dark' : 'light';
        this.currentTheme.set(next);
        this.applyTheme(next);
        localStorage.setItem(this.STORAGE_KEY, next);
    }

    private applyTheme(theme: Theme): void {
        document.documentElement.setAttribute('data-bs-theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }

    private getStoredTheme(): Theme {
        if (typeof localStorage === 'undefined') return 'light';
        return (localStorage.getItem(this.STORAGE_KEY) as Theme) || 'light';
    }
}
