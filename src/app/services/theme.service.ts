import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'theme1' | 'theme2' | 'theme3';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private readonly STORAGE_KEY = 'app-theme';
    currentTheme = signal<Theme>(this.getStoredTheme());

    constructor() {
        this.applyTheme(this.currentTheme());
    }

    setTheme(theme: Theme): void {
        this.currentTheme.set(theme);
        this.applyTheme(theme);
        localStorage.setItem(this.STORAGE_KEY, theme);
    }

    private applyTheme(theme: Theme): void {
        const bsTheme = theme === 'theme1' ? 'light' : theme;
        document.documentElement.setAttribute('data-bs-theme', bsTheme);
        document.documentElement.setAttribute('data-theme', theme);
    }

    private getStoredTheme(): Theme {
        if (typeof localStorage === 'undefined') return 'light';
        const stored = localStorage.getItem(this.STORAGE_KEY) as Theme;
        return ['light', 'dark', 'theme1', 'theme2', 'theme3'].includes(stored) ? stored : 'light';
    }
}
