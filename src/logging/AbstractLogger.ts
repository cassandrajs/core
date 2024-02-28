import { Level } from "./Level"
import { Logger } from "./Logger"

export abstract class AbstractLogger extends Logger {
    name: string

    getName(): string {
        return this.name
    }

    debug(...args: any[]): void {
        if(this.isDebugEnabled()) {
            this.handle_0ArgsCall(Level.DEBUG, ...args)
        }
    }

    error(...args: any[]): void {
        if(this.isErrorEnabled()) {
            this.handle_0ArgsCall(Level.ERROR, ...args)
        }
    }

    info(...args: any[]): void {
        if(this.isInfoEnabled()) {
            this.handle_0ArgsCall(Level.INFO, ...args)
        }
    }

    trace(...args: any[]): void {
        if(this.isTraceEnabled()) {
            this.handle_0ArgsCall(Level.TRACE, ...args)
        }
    }

    warn(...args: any[]): void {
        if(this.isWarnEnabled()) {
            this.handle_0ArgsCall(Level.WARN, ...args)
        }
    }

    private handle_0ArgsCall(level: Level, ...args: any[]) {
        this.handleNormalizedLoggingCall(level, ...args);
    }

    abstract handleNormalizedLoggingCall(level: Level, ...args: any[]): void
}