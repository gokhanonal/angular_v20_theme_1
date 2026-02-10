import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    OFF = 4
}

@Injectable({ providedIn: 'root' })
export class LoggerService {
    private level: LogLevel;
    private logs: { timestamp: string; level: string; message: string; data?: any }[] = [];

    constructor() {
        this.level = this.parseLevel(environment.logLevel);
    }

    private parseLevel(level: string): LogLevel {
        switch (level.toUpperCase()) {
            case 'DEBUG': return LogLevel.DEBUG;
            case 'INFO': return LogLevel.INFO;
            case 'WARN': return LogLevel.WARN;
            case 'ERROR': return LogLevel.ERROR;
            case 'OFF': return LogLevel.OFF;
            default: return LogLevel.DEBUG;
        }
    }

    private formatTimestamp(): string {
        return new Date().toISOString();
    }

    private log(level: LogLevel, levelName: string, message: string, ...data: any[]): void {
        if (level < this.level) return;
        const timestamp = this.formatTimestamp();
        const entry = { timestamp, level: levelName, message, data: data.length ? data : undefined };
        this.logs.push(entry);
        if (this.logs.length > 1000) this.logs.shift();

        const prefix = `[${timestamp}] [${levelName}]`;
        switch (level) {
            case LogLevel.DEBUG: console.debug(prefix, message, ...data); break;
            case LogLevel.INFO: console.info(prefix, message, ...data); break;
            case LogLevel.WARN: console.warn(prefix, message, ...data); break;
            case LogLevel.ERROR: console.error(prefix, message, ...data); break;
        }
    }

    debug(message: string, ...data: any[]): void { this.log(LogLevel.DEBUG, 'DEBUG', message, ...data); }
    info(message: string, ...data: any[]): void { this.log(LogLevel.INFO, 'INFO', message, ...data); }
    warn(message: string, ...data: any[]): void { this.log(LogLevel.WARN, 'WARN', message, ...data); }
    error(message: string, ...data: any[]): void { this.log(LogLevel.ERROR, 'ERROR', message, ...data); }

    getLogs() { return [...this.logs]; }
    clearLogs() { this.logs = []; }
    setLevel(level: LogLevel) { this.level = level; }
}
