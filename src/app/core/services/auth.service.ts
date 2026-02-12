import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _isAuthenticated = signal<boolean>(this.checkAuth());
    isAuthenticated = this._isAuthenticated.asReadonly();

    constructor() { }

    private checkAuth(): boolean {
        return !!localStorage.getItem('access_token');
    }

    login(credentials: { email?: string; password?: string }): boolean {
        // Mock validation: admin / 12345!
        if (credentials.email === 'admin' && credentials.password === '12345!') {
            return true;
        }
        return false;
    }

    verifyOtp(code: string): boolean {
        // Mock validation: 112233
        if (code === '112233') {
            this.generateAndSaveToken();
            return true;
        }
        return false;
    }

    private generateAndSaveToken(): void {
        // Mock JWT-like token
        const payload = {
            name: 'Admin',
            surname: 'User',
            username: 'admin',
            ip: '127.0.0.1',
            login_at: new Date().toISOString()
        };

        // Simulate base64 encoding
        const encodedPayload = btoa(JSON.stringify(payload));
        const token = `mock_jwt_header.${encodedPayload}.mock_signature`;

        localStorage.setItem('access_token', token);
        localStorage.setItem('user', JSON.stringify(payload));
        this._isAuthenticated.set(true);
    }

    logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        this._isAuthenticated.set(false);
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    getCurrentUser(): any {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}
